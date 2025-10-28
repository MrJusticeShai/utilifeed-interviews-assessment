import { useState, useEffect } from 'react'
import { checkHealth, fetchCities } from './api'
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

  // Fetch city data from backend
  const loadCities = async (query = '') => {
    setLoadingCities(true)  // Set loading state before fetch
    setCitiesError(null)    // Clear previous errors

    try {
      const data = await fetchCities(query) // Call /api/cities?search=query
      setCities(data.cities || {})          // Update cities state
    } catch (err) {
      setCitiesError('Failed to load city data. Please try again.') // Error message
      setCities({})                         // Clear previous data on error
    } finally {
      setLoadingCities(false)               // Done loading
    }
  }

  // -------------------------
  // Event Handlers
  // -------------------------

  // Called whenever the search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)       // Update input state
    loadCities(query)           // Fetch filtered city data
  }




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
                    <th>City</th>
                    <th>Min</th>
                    <th>Max</th>
                    <th>Mean</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(cities).map(([cityName, stats]) => (
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

