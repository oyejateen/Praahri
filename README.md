# Praahri - Advanced Land Monitoring System

## Overview
Praahri is a cutting-edge mobile application designed for monitoring and analyzing land changes using satellite imagery and advanced remote sensing techniques. The app leverages Google Earth Engine's capabilities combined with NDVI (Normalized Difference Vegetation Index) analysis to detect potential land use and vegetation changes.

## Features

### 1. Interactive Land Selection
- Draw custom polygons on map interface
- Edit and modify selected areas
- Save multiple land areas for monitoring
- Intuitive touch-based drawing system

### 2. Advanced Analysis
- NDVI (Normalized Difference Vegetation Index) calculation
- Temporal change detection between two time periods
- Satellite imagery comparison
- Automated activity detection

### 3. Historical Tracking
- Maintain history of all analyses
- Track changes over time
- Compare multiple time periods
- Export and share analysis results

### 4. Remote Sensing Technology
- Integration with Google Earth Engine
- Multi-spectral image analysis
- Cloud-free composite imagery
- High-resolution satellite data processing

## Technical Implementation

### Remote Sensing Methodology
The app utilizes several key remote sensing techniques:
- **NDVI Analysis**: Calculates vegetation health using NIR and Red bands
- **Change Detection**: Implements temporal analysis algorithms
- **Spectral Indices**: Uses multiple spectral bands for comprehensive analysis
- **Cloud Masking**: Ensures clear imagery for accurate results

### Architecture
- React Native for cross-platform mobile development
- Google Maps API for visualization
- Earth Engine API for remote sensing calculations
- Real-time data processing and analysis

## Installation

1. Clone the repository:
```bash
git clone https://github.com/oyejateen/Praahri.git
cd Praahri
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a .env file with:
```
GOOGLE_MAPS_API_KEY=your_api_key_here
```

4. Run the application:
```bash
npm start
```

## Environment Setup
- Node.js >= 14.0.0
- React Native >= 0.71.0
- Expo SDK >= 48.0.0
- Google Maps API Key
- Earth Engine API access

## Technical Requirements
- iOS 13.0 or later
- Android 6.0 or later
- Internet connectivity for satellite data
- GPS capability for location services

## Contributing
Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Google Earth Engine for satellite imagery
- NASA for Landsat data
- ESA for Sentinel data
- OpenStreetMap contributors

## Contact
For any queries or support, please contact:
- Email: [your-email]
- GitHub: [@oyejateen](https://github.com/oyejateen)

## Future Roadmap
- Machine learning integration for automated change detection
- Advanced pattern recognition for illegal activity prediction
- Integration with government land monitoring systems
- Enhanced reporting and documentation features
