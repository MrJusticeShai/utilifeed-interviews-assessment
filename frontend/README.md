# Weather Dashboard - Frontend

A React-based web application starter for visualizing weather temperature statistics for cities around the world.

**Note**: This is a starter implementation. The API integration functions need to be implemented as part of the technical test.

## Prerequisites

- Node.js 16 or higher
- npm or yarn

## Setup

1. Clone the repository
```bash
git clone git@github.com:MrJusticeShai/utilifeed-interviews-assessment.git
```

2. Navigate to the frontend directory:
```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
```

## Running the Application

4. Start the development server:
```bash
npm run dev
```

The application will start on `http://localhost:3000`

**Note:** 
- The backend API must be running on `http://localhost:5001`
- The API functions in `src/api.js` need to be implemented first
- The UI is provided but will show errors until the API is implemented

> For some reason, http://localhost:5000 didn't want to work locally, so I switched to `http://localhost:5001`

## Building for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Features to Implement

Your task is to build a user interface that includes:

- **City List Display**: Show temperature statistics for all cities
- **Search Functionality**: Add input to filter cities by name
- **Loading States**: Visual feedback while data is being fetched
- **Error Handling**: Display error messages when the API is unavailable
- **Responsive Design**: Make it work on desktop and mobile devices
- **Additional Feature** (optional): Add something creative (sorting, charts, etc.)

## Architecture

### Components

- **App.jsx**: Main application component (starter code provided)
  - ✅ State management (useState hooks)
  - ✅ Health check example (working API integration example)
  - ⚠️ Data fetching logic (useEffect + loadCities function)
  - ⚠️ UI implementation needed (currently shows TODO message)
  - ⚠️ Search functionality UI needed
  - ⚠️ City display layout needed

### API Integration

- **api.js**: API client module with functions:
  - `fetchCities(searchQuery)`: ⚠️ TODO - Needs to be implemented
  - `fetchCity(cityName)`: ⚠️ TODO - Needs to be implemented
  - `checkHealth()`: ✅ Already implemented as an example

### Styling

- **App.css**: Basic styles provided
  - ✅ Header and container styles
  - ✅ Basic message/error styles
  - ✅ Health check indicator styles (example)
  - ⚠️ Custom component styles needed (search, cards/list, etc.)
  - Feel free to be creative with the design!

## Technology Stack

- **React 18**: UI library
- **Vite**: Build tool and development server
- **CSS**: Styling (no external UI libraries for simplicity)

## API Endpoints Used

- `GET /api/cities`: Fetch all cities
- `GET /api/cities?search={query}`: Search for cities
- `GET /api/cities/{city_name}`: Get specific city (not currently used in UI)

## Development Notes

- The application uses React hooks (useState, useEffect) for state management
- A working health check example is provided to demonstrate API integration
- Check the health check implementation in `App.jsx` and `api.js` for reference
- The main UI components need to be built (cities display, search, etc.)
- Error boundaries could be added for better error handling
- Loading state management is already set up

## Your Task

### Required
1. **Implement API Functions** (`src/api.js`):
   - `fetchCities()` - Call GET /api/cities
   - `fetchCity()` - Call GET /api/cities/{city_name} (optional)

2. **Implement UI** (`src/App.jsx`):
   - Display the cities data (use `Object.entries(cities)` to iterate)
   - Show each city's min, max, mean temperatures
   - Add a search input (use the `searchQuery` state)
   - Display loading/error states properly
   - Handle empty results

3. **Style the Application** (`src/App.css`):
   - Create a visually appealing layout
   - Make it responsive for mobile
   - Add your creative touch!

### Optional Enhancements
- Sorting (by temperature, city name, etc.)
- Pagination or infinite scroll
- Temperature unit toggle (°C/°F)
- Data visualization (charts, graphs)
- City detail view

The application will show a TODO message until the UI is implemented.

