"""
Weather City Statistics API 

This Flask application exposes REST endpoints for processing and retrieving
temperature statistics from a text file containing city temperature readings.

Each line in the data file follows the format:
    CityName;Temperature

Example:
    Belgrade;14.3
    Dar es Salaam;35.5
    Palembang;27.9

The API provides:
    - /api/cities: Returns all city statistics or filters by a search query.
    - /api/cities/<city_name>: Returns statistics for a specific city.
    - /api/health: Health check endpoint.

Run:
    $ python app.py

"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for local development


DATA_FILE_PATH = '../measurement.txt'

def compute_city_weather_statistics(temperatures):
    if not temperatures:
        return {"min": None, "max": None, "mean": None,  "count": 0}
    mean_temperature = sum(temperatures)/len(temperatures)
    return {
       "min": min(temperatures), 
       "max": max(temperatures), 
       "mean": round(mean_temperature, 1), 
       "count": len(temperatures)
    }
    

# @app.route('/api/cities', methods=['GET'])
# def get_cities():
#     """
#     Get temperature statistics for all cities.
#     
#     Query parameters:
#         search (str): Optional search query to filter cities by name
#     
#     Returns:
#         JSON response with city statistics in the format:
#         {
#             "cities": {
#                 "CityName": {"min": float, "max": float, "mean": float, "count": int},
#                 ...
#             },
#             "total_cities": int
#         }
#     
#     Hints:
#     - The data file is at: '../measurements.txt' (relative to this file)
#     - Each line format: "CityName;Temperature"
#     - You need to calculate min, max, mean (rounded to 1 decimal) for each city
#     - Handle invalid/malformed rows gracefully
#     - Support optional ?search=query parameter to filter cities
#     """
#     pass
#
# @app.route('/api/cities/<city_name>', methods=['GET'])
# def get_city(city_name):
#     """
#     Get temperature statistics for a specific city.
#     
#     Args:
#         city_name (str): Name of the city
#     
#     Returns:
#         JSON response with city statistics
#         Return 404 if city not found
#     
#     Example response:
#     {
#         "city": "Hamburg",
#         "statistics": {"min": -10.5, "max": 35.2, "mean": 12.4, "count": 842}
#     }
#     """
#     pass

@app.route('/api/health', methods=['GET'])
def health_check():
    """Simple health check endpoint."""
    return jsonify({"status": "healthy", "service": "weather-api"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)

