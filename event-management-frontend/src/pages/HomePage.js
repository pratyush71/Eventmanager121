import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import '../App.css';  // Correct path to App.css

function HomePage() {
  return (
    <div className="home-container">
      <h1 className="home-heading">Welcome to the Event Management App</h1>
      
      <div className="home-links">
        {/* Existing Links */}
        <Link to="/login" className="home-link login-link">
          Login
        </Link>
        
        <Link to="/events" className="home-link events-link">
          View Events
        </Link>
        
        {/* New Create Event Link */}
        <Link to="/create-event" className="home-link create-event-link">
          Create Event
        </Link>
      </div>
      
      <Footer />
    </div>
  );
}

export default HomePage;
