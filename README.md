# Full Stack Weather Data Analysis Challenge

## Introduction

Welcome to the Full Stack Weather Data Analysis Challenge! This technical test is designed for intermediate full-stack developers to demonstrate their proficiency in both backend and frontend development, as well as their ability to think about system design at scale.

You will be working with a dataset of 100,000 weather measurements from cities around the world. Your task is to build a complete full-stack application that processes this data on the backend and presents it through a user-friendly interface on the frontend.

## Time Expectation

This test is designed to be completed in **1-2 hours MAX**. You don't need to implement every possible feature or test every edge case. Focus on:
- Writing clean, maintainable code
- Demonstrating good architectural decisions
- Showing proficiency in both frontend and backend development
- Explaining your thought process

Feel free to use comments to explain what else you would add given more time.

## Getting Started

### Running the Reference Implementation

This repository includes a working reference implementation to help you understand the expected functionality.

NOTE: The basic backbone of the code provided is enough for you to finish the test, you dont need any additional libraries or frameworks. Or even additional files.

However, you can modify the code to your liking. And if you want to start from scratch, you can do so. 


#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

The backend API will be available at `http://localhost:5000`

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Data Format

The `measurements.txt` file contains temperature measurements in the following format:
```
Belgrade;14.3
Hamburg;12.0
Palembang;27.9
Timbuktu;37.8
```

Each line contains a city name and temperature (in Celsius), separated by a semicolon.

Note: Yes, reading from a file sucks for performance. But for this test, dont worry about that. 

## The Challenge

### Part 1: Backend Development (30-40 minutes)

Build or extend the Python REST API to include the following features:

#### Required Endpoints

**1. GET /api/cities**
- Returns temperature statistics for all cities
- Supports optional `?search=query` parameter to filter cities
- Returns min, max, mean temperature, and measurement count for each city

**2. GET /api/cities/{city_name}**
- Returns detailed statistics for a specific city
- Returns 404 if city not found

**3. Additional endpoint of your choice**
- Examples: 
  - Statistics summary (total measurements, temperature ranges, etc.)
  - Top N hottest/coldest cities
  - Temperature distribution
  - Your creative idea!

#### Requirements
- Clean, well-organized code with proper separation of concerns
- Error handling for invalid data rows (invalid temperatures, missing values, etc.)
- Efficient data processing (consider memory usage with large files)
- RESTful API design principles
- Proper HTTP status codes
- CORS enabled for local development

#### Evaluation Criteria
- **Code Quality**: Is the code readable, maintainable, and well-structured?
- **Error Handling**: How does it handle edge cases and invalid data?
- **API Design**: Does it follow REST principles and return appropriate responses?
- **Efficiency**: Is the data processing optimized for performance?
- **Documentation**: Are functions/endpoints documented?

### Part 2: Frontend Development (30-40 minutes)

Build or extend the React application to provide an excellent user experience:

#### Required Features

**1. City List Display**
- Fetch and display all cities with their temperature statistics
- Show min, max, and mean temperatures clearly
- Visually appealing layout (grid, cards, or table)

**2. Search Functionality**
- Allow users to search/filter cities by name
- Update results dynamically or on submit
- Clear indication when no results are found

**3. Loading & Error States**
- Show loading spinner/indicator while fetching data
- Display helpful error messages if the API is unavailable
- Handle empty states gracefully

**4. One Additional Feature**
- Examples:
  - Sort cities by temperature (hottest/coldest)
  - Temperature range visualization (charts, bars, colors)
  - Pagination for large result sets
  - City detail view (modal or separate page)
  - Temperature unit toggle (Celsius/Fahrenheit)
  - Your creative idea!

#### Requirements
- Component-based architecture
- Proper state management (useState, useContext, or external library)
- Responsive design (mobile-friendly)
- Clean, modern UI/UX
- Proper error boundaries or error handling
- Code reusability

#### Evaluation Criteria
- **Component Structure**: Are components well-organized and reusable?
- **User Experience**: Is the interface intuitive and responsive?
- **State Management**: Is state managed effectively?
- **Code Quality**: Is the code clean and maintainable?
- **Styling**: Is the UI polished and professional?

### Part 3: System Design & Architecture (10-20 minutes)

Answer the following questions in comments, a separate document, or be prepared to discuss them:

#### 1. Scalability
The original dataset this is based on contains **1 billion rows**. How would you modify your solution to handle this scale?

Consider:
- **Backend**: Data processing strategies, database choices, caching, pagination
- **Frontend**: Virtualization, infinite scroll, loading strategies
- **Infrastructure**: Load balancing, horizontal scaling, CDN

#### 2. Performance Optimization
What specific optimizations would you add to improve performance?

Consider:
- **Backend**: Caching strategies, database indexes, query optimization, async processing
- **Frontend**: Memoization, code splitting, lazy loading, debouncing
- **Network**: Compression, HTTP/2, request batching

#### 3. Production Deployment
How would you deploy this full-stack application to production?

Consider:
- **Infrastructure**: Cloud providers, containerization (Docker), orchestration
- **CI/CD**: Automated testing, deployment pipelines
- **Monitoring**: Logging, error tracking, performance monitoring
- **Security**: HTTPS, authentication, rate limiting, input validation

#### 4. Data Quality
The dataset may contain errors (invalid temperatures, missing values, duplicates). How would you handle this in a production system?

Consider:
- **Validation**: Input validation, data sanitization
- **Logging**: Error tracking and reporting
- **Monitoring**: Data quality metrics, anomaly detection
- **Recovery**: Retry mechanisms, fallback strategies

## Submission Guidelines

### What to Submit

1. **Source Code**: Your complete implementation (backend + frontend)
2. **README Updates**: Any changes to setup instructions
3. **System Design Answers**: Your responses to Part 3 questions
4. **Comments**: Explain any important decisions or trade-offs you made

### Running Your Solution

Make sure to include clear instructions on how to:
1. Install dependencies
2. Run the backend server
3. Run the frontend application
4. Test the key features

## Evaluation Rubric

Your submission will be evaluated on:

### Technical Skills (40%)
- Code quality and organization
- API design and implementation
- Frontend component architecture
- Error handling and edge cases

### Problem Solving (30%)
- Efficiency of data processing
- Creative solutions to challenges
- System design thinking
- Performance considerations

### User Experience (20%)
- UI/UX design and usability
- Responsiveness and accessibility
- Loading and error states
- Visual polish

### Communication (10%)
- Code documentation
- Clear explanations in comments
- System design answers
- README quality

## Tips for Success

1. **Start Simple**: Get the basic functionality working first, then add enhancements
2. **Focus on Quality**: Clean, working code is better than incomplete fancy features
3. **Document Decisions**: Use comments to explain your reasoning
4. **Test Your Work**: Make sure everything runs without errors
5. **Manage Time**: Don't get stuck on one part; move on and come back if needed
6. **Ask Questions**: If anything is unclear, please ask!

## Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

## Questions?

Feel free to ask for clarification on any part of this challenge. Good luck, and have fun! 🚀
