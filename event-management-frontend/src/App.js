import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { io } from "socket.io-client";

// Connect to WebSocket server

// Import your components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GuestHomePage from './pages/GuestHomePage';
import EventDashboard from './pages/EventDashboard';
import EventCreation from './pages/EventCreation';
import NewEvents from './pages/NewEvents';
import PastEvents from './pages/PastEvents';

const socket = io("http://localhost:5000");
function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Listen for real-time event creation
    socket.on("eventCreated", (newEvent) => {
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    });

    return () => {
      socket.off("eventCreated");
    };
  }, []);

  return (
    <Router>
      <div style={{
        padding: '50px 20px',
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#333',
        backgroundImage: 'linear-gradient(135deg, #6fa3ef, #7b9fbb)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <header style={{ marginBottom: '30px', fontSize: '2rem', fontWeight: 'bold', color: '#2c3e50' }}>
          Event Management Platform
        </header>
        <main style={{
          width: '100%',
          maxWidth: '900px',
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/guest" element={<GuestHomePage />} />
            <Route path="/events" element={<EventDashboard events={events} />} />
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
