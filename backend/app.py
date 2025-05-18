from flask import Flask, request, jsonify
import ee
import json
import datetime
import os
import urllib.request
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Initialize Earth Engine
# In production, use service account authentication
try:
    ee.Initialize()
except Exception as e:
    print(f"Error initializing Earth Engine: {e}")
    # For development, you might need to authenticate interactively
    # ee.Authenticate()
    # ee.Initialize()

@app.route('/api/analyze', methods=['POST'])
def analyze_land():
    try:
        data = request.json
        
        # Extract polygon coordinates
        polygon_coords = data.get('polygon', [])
        if not polygon_coords or len(polygon_coords) < 3:
            return jsonify({'error': 'Invalid polygon: at least 3 points required'}), 400
        
        # Convert to Earth Engine format
        ee_polygon = ee.Geometry.Polygon([[[p['longitude'], p['latitude']] for p in polygon_coords]])
        
        # Extract date ranges
        start_date1 = data.get('startDate1')
        end_date1 = data.get('endDate1')
        start_date2 = data.get('startDate2')
        end_date2 = data.get('endDate2')
        
        if not all([start_date1, end_date1, start_date2, end_date2]):
            return jsonify({'error': 'All date parameters are required'}), 400
        
        # Convert dates to YYYY-MM-DD format for Earth Engine
        try:
            start_date1 = datetime.datetime.fromisoformat(start_date1.replace('Z', '+00:00')).strftime('%Y-%m-%d')
            end_date1 = datetime.datetime.fromisoformat(end_date1.replace('Z', '+00:00')).strftime('%Y-%m-%d')
            start_date2 = datetime.datetime.fromisoformat(start_date2.replace('Z', '+00:00')).strftime('%Y-%m-%d')
            end_date2 = datetime.datetime.fromisoformat(end_date2.replace('Z', '+00:00')).strftime('%Y-%m-%d')
        except ValueError:
            return jsonify({'error': 'Invalid date format'}), 400
        
        # Get Sentinel-2 imagery for both time periods
        s2_collection1 = ee.ImageCollection('COPERNICUS/S2_SR') \
            .filterBounds(ee_polygon) \
            .filterDate(start_date1, end_date1) \
            .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)) \
            .map(lambda img: img.clip(ee_polygon))
        
        s2_collection2 = ee.ImageCollection('COPERNICUS/S2_SR') \
            .filterBounds(ee_polygon) \
            .filterDate(start_date2, end_date2) \
            .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)) \
            .map(lambda img: img.clip(ee_polygon))
        
        # Check if we have images for both periods
        count1 = s2_collection1.size().getInfo()
        count2 = s2_collection2.size().getInfo()
        
        if count1 == 0 or count2 == 0:
            return jsonify({
                'error': f'Not enough cloud-free images available for analysis. Period 1: {count1} images, Period 2: {count2} images'
            }), 400
        
        # Create composite images for each period
        composite1 = s2_collection1.median()
        composite2 = s2_collection2.median()
        
        # Calculate NDVI for both periods
        ndvi1 = composite1.normalizedDifference(['B8', 'B4']).rename('NDVI1')
        ndvi2 = composite2.normalizedDifference(['B8', 'B4']).rename('NDVI2')
        
        # Calculate NDVI difference
        ndvi_diff = ndvi2.subtract(ndvi1).rename('NDVI_diff')
        
        # Calculate mean NDVI difference across the polygon
        mean_diff = ndvi_diff.reduceRegion(
            reducer=ee.Reducer.mean(),
            geometry=ee_polygon,
            scale=10
        ).get('NDVI_diff').getInfo()
        
        # Determine if there's a significant change
        # Typically, NDVI changes of > 0.2 might indicate significant vegetation change
        threshold = -0.2  # negative indicates vegetation loss
        status = 'possible-illegal' if mean_diff < threshold else 'no-change'
        
        # Create a visualization image for the frontend
        # Red = vegetation loss, Green = vegetation gain
        vis_params = {
            'min': -0.5,
            'max': 0.5,
            'palette': ['ff0000', 'ffffff', '00ff00']
        }
        
        # Generate a thumbnail URL
        thumbnail_url = ndvi_diff.getThumbURL({
            'min': -0.5,
            'max': 0.5,
            'palette': ['ff0000', 'ffffff', '00ff00'],
            'dimensions': 512,
            'region': ee_polygon,
            'format': 'png'
        })
        
        # Prepare detailed explanation
        if status == 'possible-illegal':
            details = "Significant vegetation decrease detected. This could indicate illegal logging or land clearing."
        else:
            details = "No significant changes in vegetation detected."
        
        # Return the analysis results
        return jsonify({
            'ndviDifference': mean_diff,
            'status': status,
            'imageUrl': thumbnail_url,
            'details': details
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)