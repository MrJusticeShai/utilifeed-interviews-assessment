const API_BASE_URL = 'http://127.0.0.1:5000';

/**
 * TODO: Implement this function to fetch all cities with their temperature statistics
 * 
 * This should call GET /api/cities (with optional ?search=query parameter)
 * 
 * @param {string} searchQuery - Optional search query to filter cities
 * @returns {Promise<Object>} Response with cities data in the format:
 * {
 *   cities: { "CityName": { min, max, mean, count }, ... },
 *   total_cities: number
 * }
 * 
 * Hint: Use the fetch API to make the HTTP request
 * Hint: Don't forget to handle errors appropriately
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
 * TODO: Implement this function to fetch statistics for a specific city
 * 
 * This should call GET /api/cities/{cityName}
 * 
 * @param {string} cityName - Name of the city
 * @returns {Promise<Object>} Response with city statistics in the format:
 * {
 *   city: "CityName",
 *   statistics: { min, max, mean, count }
 * }
 * 
 * Hint: Use encodeURIComponent for the city name in the URL
 * Hint: Handle 404 errors for cities that don't exist
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

