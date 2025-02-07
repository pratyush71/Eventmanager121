// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import your components here
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';  // Import the LoginPage component
import RegisterPage from './pages/RegisterPage';
import GuestHomePage from './pages/GuestHomePage';
import EventDashboard from './pages/EventDashboard';
import EventCreation from './pages/EventCreation';
import NewEvents from './pages/NewEvents';  // New Events Page Component
import PastEvents from './pages/PastEvents'; 

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          
        </header>
        <main>
          {/* Define routes for different pages */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/guest" element={<GuestHomePage />} />
          <Route path="/events" element={<EventDashboard />} />
          <Route path="/new-events" element={<NewEvents />} />
          <Route path="/past-events" element={<PastEvents />} />
          <Route path="/create-event" element={<EventCreation />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
