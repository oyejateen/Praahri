
# **Praahri App** – Smart Land Surveillance Using Satellite Imagery

## 👥 Team Members
**Team Zuck**  
- Jatin Narayan  
- Kishori Arora  
- Chhaya Ameta

## ❓ Problem Statement / Objective
Illegal land occupation and unauthorized development on vacant or government-owned plots is a growing concern. Manual inspection is costly and inefficient.  
**Praahri** aims to provide an intelligent, scalable solution to:
- Map land/plots using GPS location
- Periodically check those locations using satellite images (e.g., every 15 days)
- Detect unusual land use or changes automatically
- Generate alerts for authorities or stakeholders

## Watch Demo
[Take me to Demo Video](https://drive.google.com/file/d/1jEacMsLLSW7yvtL9eGQk5aaJ4yJunCRF/view?usp=sharing)

https://github.com/user-attachments/assets/15b3dcff-fef5-445a-8719-0b3fcef11790



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

## 🧰 Tools & Technologies Used
- **React Native** (via Expo) – Mobile app development  
- **Google Maps API** – For map visualization and location services  
- **Google Earth Engine** – Satellite image access and NDVI analysis  
- **JavaScript + Node.js** – Core logic and environment  
- **Remote Sensing Algorithms** – NDVI, Change Detection, Cloud Masking  
- **Landsat/Sentinel Data** – Satellite imagery  
- **Git & GitHub** – Version control

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

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Google Earth Engine for satellite imagery
- NASA for Landsat data
- ESA for Sentinel data
- OpenStreetMap contributors
