# Weather API - Backend

A Flask-based REST API for processing weather measurement data and providing temperature statistics for cities around the world.

**Note**: This is the implementation. The main endpoints are implemented as part of the technical test.

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

## Setup

1. Clone the repository
```bash
git clone git@github.com:MrJusticeShai/utilifeed-interviews-assessment.git
```

2. Navigate to the backend directory:
```bash
cd backend
```

3. Create a virtual environment (recommended):
```bash
python -m venv venv
```

4. Activate the virtual environment:
   - On Linux/Mac:
     ```bash
     source venv/bin/activate
     ```
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```

5. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Server

Start the Flask development server:
```bash
python app.py
```

The server will start on `http://localhost:5001`

## API Endpoints

### ⚠️ TODO: Implement These Endpoints

The following endpoints are commented out in `app.py` and need to be implemented:

#### GET /api/cities
Get temperature statistics for all cities.

**Query Parameters:**
- `search` (optional): Filter cities by name (case-insensitive)

**Expected Response Format:**
```json
{
  "cities": {
    "Hamburg": {
      "min": -10.5,
      "max": 35.2,
      "mean": 12.4,
      "count": 842
    },
    "Belgrade": {
      "min": -8.3,
      "max": 38.1,
      "mean": 15.2,
      "count": 756
    }
  },
  "total_cities": 2
}
```

#### GET /api/cities/<city_name>
Get temperature statistics for a specific city.

**Expected Response Format:**
```json
{
  "city": "Hamburg",
  "statistics": {
    "min": -10.5,
    "max": 35.2,
    "mean": 12.4,
    "count": 842
  }
}
```

**Error Response (404):**
```json
{
  "error": "City 'XYZ' not found"
}
```

### ✅ Implemented Example

#### GET /api/health
Health check endpoint (already implemented as an example).

**Example Request:**
```bash
curl http://localhost:5000/api/health
```

**Example Response:**
```json
{
  "status": "healthy",
  "service": "weather-api"
}
```

## Data Processing

The API should read from `measurements.txt` file which contains weather measurements in the format:
```
CityName;Temperature
```

For example:
```
Hamburg;12.0
Belgrade;14.3
Palembang;27.9
Hamburg;-5.2
```

### Your Task

You need to implement the logic to:
1. **Read the file**: Open and read the measurements file
2. **Parse each line**: Split by semicolon to get city name and temperature
3. **Aggregate data**: Group temperatures by city
4. **Calculate statistics** for each city:
   - **min**: Minimum temperature recorded
   - **max**: Maximum temperature recorded
   - **mean**: Average temperature (rounded to 1 decimal place)
   - **count**: Number of measurements

### Data Structure Suggestion

Consider using a dictionary to store temperatures for each city, then calculate stats:
```python
{
  "Hamburg": [12.0, -5.2, 18.3, ...],
  "Belgrade": [14.3, 22.1, ...],
  ...
}
```

## Error Handling

Your implementation should handle:
- Invalid temperature formats (e.g., "abc" instead of a number)
- Missing city names or temperatures (e.g., "Hamburg;" or ";12.0")
- Malformed data rows (e.g., lines without semicolons)
- File not found errors
- Cities that don't exist (404 for specific city endpoint)

Consider:
- Skipping invalid rows instead of crashing
- Logging or tracking errors for debugging
- Returning appropriate HTTP status codes (200, 404, 500)

