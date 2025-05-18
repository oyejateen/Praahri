# Land Monitoring Backend

This is the backend service for the Land Monitoring application, which uses Google Earth Engine to analyze satellite imagery and detect vegetation changes over time.

## Setup Instructions

### Prerequisites

1. Python 3.7 or higher
2. Google Earth Engine account and API access
3. Earth Engine Python API credentials

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Set up Earth Engine authentication:

```bash
earthengine authenticate
```

### Configuration

Create a `.env` file with the following variables:

```
FLASK_APP=app.py
FLASK_ENV=development
GEE_SERVICE_ACCOUNT=your-service-account@project.iam.gserviceaccount.com
GEE_KEY_FILE=path/to/keyfile.json
```

For production, set `FLASK_ENV=production` and ensure your service account has the necessary permissions.

### Running the Server

Development:

```bash
flask run
```

Production:

```bash
gunicorn app:app
```

## API Endpoints

### POST /api/analyze

Analyzes land changes between two time periods using NDVI (Normalized Difference Vegetation Index).

#### Request Body

```json
{
  "polygon": [
    {"latitude": 37.7749, "longitude": -122.4194},
    {"latitude": 37.7750, "longitude": -122.4180},
    {"latitude": 37.7738, "longitude": -122.4182},
    {"latitude": 37.7738, "longitude": -122.4195}
  ],
  "startDate1": "2022-01-01T00:00:00Z",
  "endDate1": "2022-01-31T23:59:59Z",
  "startDate2": "2022-06-01T00:00:00Z",
  "endDate2": "2022-06-30T23:59:59Z"
}
```

#### Response

```json
{
  "ndviDifference": -0.125,
  "status": "no-change",
  "imageUrl": "https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/thumbnails/...",
  "details": "No significant changes in vegetation detected."
}
```

## Scheduler Setup

### Periodic Monitoring

For automated periodic checks, set up a cron job or scheduler:

```bash
0 0 * * 1 python /path/to/scheduled_check.py
```

This runs a weekly check on Mondays at midnight.

## Environment Variables

- `FLASK_APP`: Main Flask application file
- `FLASK_ENV`: Environment (development, production)
- `GEE_SERVICE_ACCOUNT`: Google Earth Engine service account
- `GEE_KEY_FILE`: Path to service account key file

## Deployment

The application can be deployed on any platform that supports Python Flask applications, such as:

- Google Cloud Run
- Heroku
- AWS Elastic Beanstalk

Make sure to set up the proper environment variables and authentication for production deployment.