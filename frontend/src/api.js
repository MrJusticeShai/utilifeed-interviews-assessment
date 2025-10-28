const API_BASE_URL = 'http://localhost:5001';

/**
 * A function to fetch all cities with their temperature statistics
 * 
 * This calls GET /api/cities (with optional ?search=query parameter)
 * 
 * @param {string} searchQuery - Optional search query to filter cities
 * @returns {Promise<Object>} Response with cities data in the format:
 * {
 *   cities: { "CityName": { min, max, mean, count }, ... },
 *   total_cities: number
 * }
 * 
 * Used the fetch API to make the HTTP request
 * Handled errors appropriately
 */
export async function fetchCities(searchQuery = '') {
  try {
    const response = await fetch(`${API_BASE_URL}/api/cities${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error checking API health:', error);
    throw error;
  }
}

/**
 *  A function to fetch statistics for a specific city

 * 
 * This calls GET /api/cities/{cityName}
 * 
 * @param {string} cityName - Name of the city
 * @returns {Promise<Object>} Response with city statistics in the format:
 * {
 *   city: "CityName",
 *   statistics: { min, max, mean, count }
 * }
 * 
 * Used encodeURIComponent for the city name in the URL
 * Handled 404 errors for cities that don't exist
 */
export async function fetchCity(cityName) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/cities/${encodeURIComponent(cityName)}`);

    if (response.status === 404) {
      console.warn(`City "${cityName}" not found.`);
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching city "${cityName}":`, error);
    throw error;
  }
}

/**
 * Check API health
 * @returns {Promise<Object>} Health check response
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking health:', error);
    throw error;
  }
}

