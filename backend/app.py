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
import re

app = Flask(__name__)
CORS(app)  # Enable CORS for local development


DATA_FILE_PATH = '../measurements.txt'

def compute_city_weather_statistics(temperatures):
    # Handle the edge case where there are no temperature readings
    if not temperatures:
        return {"min": None, "max": None, "mean": None,  "count": 0}
    
    # Compute the average temperature
    mean_temperature = sum(temperatures)/len(temperatures)

    # Return the statistics dictionary
    return {
       "min": min(temperatures), 
       "max": max(temperatures), 
       "mean": round(mean_temperature, 1), 
       "count": len(temperatures)
    }

def parse_and_validate_record(line, line_number):
    # Trim and skip blank lines
    line = line.strip()
    if not line:
        return None
    
    # Must contain exactly one semicolon
    parts = line.split(';')
    if len(parts) != 2:
        print(f" Warning: Invalid format on line {line_number}: '{line}' (must contain one ';')")
        return None
    city_name, temp_str = parts
    city_name = city_name.strip()
    temp_str = temp_str.strip()

    # Attempt to validate temperature
    try:
        temperature = float(temp_str)
    except ValueError:
        print(f" Warning: Invalid temperature on line {line_number}: '{temp_str}'")
        return None
    return city_name, temperature

def load_city_data_from_file(file_path):
    city_data = {}

    try:
        with open(file_path, 'r') as file:
            for line_num, line in enumerate(file, 1):
                result = parse_and_validate_record(line, line_num)
                if not result:
                    continue
                city_name, temperature = result
                city_data.setdefault(city_name, []).append(temperature)
    except FileNotFoundError:
        print(f" CRITICAL ERROR: Data file not found at path: {file_path}")
        return {}
    city_stats = {}
    for city, temps in city_data.items():
        stats = compute_city_weather_statistics(temps)
        city_stats[city] = stats
    return city_stats


@app.route('/api/cities', methods=['GET'])
def get_cities():
    """
    Get temperature statistics for all cities.
    
    Query parameters:
        search (str): Optional search query to filter cities by name
    
    Returns:
        JSON response with city statistics in the format:
        {
            "cities": {
                "CityName": {"min": float, "max": float, "mean": float, "count": int},
                ...
            },
            "total_cities": int
        }
    
    """

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

def test_file_loading():
    stats = load_city_data_from_file(DATA_FILE_PATH)
    if stats:
        print(f"SUCCESS! {len(stats)} cities were successfully loaded and processed.")
        print("First 3 cities (for verification):")
        
        # Print the first three items for manual verification
        count = 0
        for city, data in stats.items():
            if count < 3:
                # Use str() for cleaner output formatting
                print(f"  - {city}: {data}") 
                count += 1
            else:
                break
    else:
        print("FAILURE! No valid data was loaded. Check the file path and content.")

@app.route('/api/health', methods=['GET'])
def health_check():
    """Simple health check endpoint."""
    return jsonify({"status": "healthy", "service": "weather-api"})

if __name__ == '__main__':
    test_file_loading()
    app.run(debug=True, port=5000)

