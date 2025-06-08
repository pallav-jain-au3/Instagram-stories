import React from 'react';
import './App.css';
import './main.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import ErrorBoundary from './components/ErrorBoundary';


function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Router>
          <AppRoutes />
        </Router>
      </ErrorBoundary>
    </div>
  );
}

export default App;
