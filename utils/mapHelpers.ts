import { Point, Polygon, Bounds } from '../types';
import { GOOGLE_MAPS_API_KEY } from '@env';

// Check if a point is inside a polygon
export const isPointInPolygon = (point: Point, polygon: Point[]): boolean => {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].latitude;
    const yi = polygon[i].longitude;
    const xj = polygon[j].latitude;
    const yj = polygon[j].longitude;
    
    const intersect = ((yi > point.longitude) !== (yj > point.longitude)) &&
      (point.latitude < (xj - xi) * (point.longitude - yi) / (yj - yi) + xi);
    
    if (intersect) inside = !inside;
  }
  
  return inside;
};

// Calculate the center point of a polygon
export const getPolygonCenter = (polygon: Point[]): Point => {
  if (!polygon.length) {
    return { latitude: 0, longitude: 0 };
  }
  
  const latSum = polygon.reduce((sum, point) => sum + point.latitude, 0);
  const lngSum = polygon.reduce((sum, point) => sum + point.longitude, 0);
  
  return {
    latitude: latSum / polygon.length,
    longitude: lngSum / polygon.length,
  };
};

// Calculate the bounding box of a polygon
export const getPolygonBounds = (points: Point[]): Bounds => {
  const latitudes = points.map(p => p.latitude);
  const longitudes = points.map(p => p.longitude);
  
  return {
    north: Math.max(...latitudes),
    south: Math.min(...latitudes),
    east: Math.max(...longitudes),
    west: Math.min(...longitudes),
  };
};

export const getSatelliteImageUrl = (polygon: Polygon): string => {
  const bounds = getPolygonBounds(polygon.points);
  const center = {
    latitude: (bounds.north + bounds.south) / 2,
    longitude: (bounds.east + bounds.west) / 2,
  };
  
  // Calculate zoom level based on bounds
  const latDiff = bounds.north - bounds.south;
  const lngDiff = bounds.east - bounds.west;
  const maxDiff = Math.max(latDiff, lngDiff);
  const zoom = Math.floor(Math.log2(360 / maxDiff)) + 1;
  
  // Construct the path for the polygon
  const path = polygon.points.map((p: Point) => `${p.latitude},${p.longitude}`).join('|');
  
  return `https://maps.googleapis.com/maps/api/staticmap?center=${center.latitude},${center.longitude}&zoom=${zoom}&size=600x400&maptype=satellite&path=color:0xFF0000|weight:2|fillcolor:0xFF000033|${path}&key=${GOOGLE_MAPS_API_KEY}`;
};