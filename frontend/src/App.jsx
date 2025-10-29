import { useState, useEffect } from 'react'
import { checkHealth, fetchCities, fetchCity } from './api'
import './App.css'

function App() {
  // -------------------------
  // State Management
  // -------------------------

  // Store API health information
  const [apiHealth, setApiHealth] = useState(null)

  // Store city data returned from API
  const [cities, setCities] = useState({})

  // Track loading state for cities API call
  const [loadingCities, setLoadingCities] = useState(false)

  // Track errors when fetching cities
  const [citiesError, setCitiesError] = useState(null)

  // Keep track of the search input
  const [searchQuery, setSearchQuery] = useState('')

  // Sorting state : sortConfig is 'city'
  const [sortConfig, setSortConfig] = useState({ key: 'city', direction: 'asc' })

  useEffect(() => {
    checkApiHealth()
    loadCities()
  }, [])

  const checkApiHealth = async () => {
    try {
      const health = await checkHealth()
      setApiHealth(health)
    } catch (err) {
      setApiHealth({ status: 'unhealthy', error: err.message })
    }
  }

  const handleExactSearch = async () => {
    // If the search query is empty, exit early (no need to send a request)
    if (!searchQuery) return;

    // Show loading spinner and clear previous errors
    setLoadingCities(true);
    setCitiesError(null);

    try {
      // Fetch data for the exact city name 
      const exactCityData = await fetchCity(searchQuery);
      // Update state with a single city result
      setCities({ [searchQuery]: exactCityData.statistics });
    } catch (err) {
      // If the city was not found or request failed, show an error message
      setCitiesError(`No city found with the name "${searchQuery}"`);
      setCities({});
    } finally {
      // Hide loading spinner regardless of success or failure
      setLoadingCities(false);
    }
  }

  // Fetch city data from backend
  const loadCities = async (query = '') => {
    setLoadingCities(true);
    setCitiesError(null);

    try {
      let data;

      if (query) {
        // Fetch filtered results based on search query
        data = await fetchCities(query);
      } else {
        // Fetch all cities if query is empty
        data = await fetchCities('');
      }

      const citiesFound = data.cities || {};

      if (Object.keys(citiesFound).length === 0) {
        setCitiesError(`No cities found for "${query}"`);
      }

      setCities(citiesFound);
    } catch (err) {
      setCitiesError('Failed to load city data.');
      setCities({});
    } finally {
      setLoadingCities(false);
    }
  }


  // -------------------------
  // Event Handlers
  // -------------------------
  // Dynamic searching
  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    loadCities(query)
  }

  // Handle sort based on key
  const handleSort = (columnKey) => {
    let direction = 'asc'
    if(sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key: columnKey, direction })
  }


  const sortedCities = Object.entries(cities).sort(([cityA, statsA], [cityB, statsB]) => {
    const { key, direction } = sortConfig
    let valA = key === 'city' ? cityA : statsA[key]
    let valB = key === 'city' ? cityB : statsB[key]

    if (valA < valB) return direction === 'asc' ? -1 : 1
    if (valA > valB) return direction === 'asc' ? 1 : -1
    return 0
  })


  return (
    <div className="app">
      <header className="app-header">
        <h1>🌡️ Weather Statistics Dashboard</h1>
        <p>Temperature data for cities around the world</p>
      </header>

      <div className="container">
        {/* Example: Health Check - This demonstrates a working API call */}
        <div className="health-check">
          <h3>API Status</h3>
          {apiHealth ? (
            <div className={`health-status ${apiHealth.status === 'healthy' ? 'healthy' : 'unhealthy'}`}>
              <span className="status-dot"></span>
              {apiHealth.status === 'healthy' ? (
                <>
                  <strong>✓ Connected</strong> - Backend API is running
                </>
              ) : (
                <>
                  <strong>✗ Disconnected</strong> - Backend API is not responding
                </>
              )}
            </div>
          ) : (
            <div className="health-status checking">Checking...</div>
          )}
          <p className="health-note">
            💡 This is a working example using the <code>/api/health</code> endpoint.
            Check <code>src/api.js</code> to see how it's implemented.
          </p>
        </div>

        <div className="city-dashboard">
          <div className="city-search">
            <input
              type="text"
              placeholder="Search cities"
              value={searchQuery}
              onChange={handleSearchChange}
            /> 
              <button 
                onClick={handleExactSearch} 
                className="exact-search-button"
                disabled={!searchQuery}
              >
                Fetch Exact
              </button>
          </div>

          

          <div className="city-messages">
            {loadingCities && <p>Loading cities...</p>}
            {citiesError && <p className="error">{citiesError}</p>}
            {!loadingCities && !citiesError && Object.keys(cities).length === 0 && (
              <p>No cities found.</p>
            )}
          </div>

          {Object.keys(cities).length > 0 && (
            <div className="city-table-wrapper">
              <table className="city-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('city')}>City</th>
                    <th onClick={() => handleSort('min')}>Min</th>
                    <th onClick={() => handleSort('max')}>Max</th>
                    <th onClick={() => handleSort('mean')}>Mean</th>
                    <th onClick={() => handleSort('count')}>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedCities.map(([cityName, stats]) => (
                    <tr key={cityName}>
                      <td>{cityName}</td>
                      <td>{stats.min}</td>
                      <td>{stats.max}</td>
                      <td>{stats.mean}</td>
                      <td>{stats.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p>Total cities: {Object.keys(cities).length}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default App

