import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EventDashboard = () => {
  const events = [
    { id: 1, name: "Music Concert", date: "2025-03-15", category: "Music", description: "A grand music event with live performances." },
    { id: 2, name: "Tech Conference", date: "2025-04-10", category: "Technology", description: "A conference on the latest tech innovations." },
    { id: 3, name: "Sports Meet", date: "2025-02-10", category: "Sports", description: "A local sports competition for everyone." },
    { id: 4, name: "Art Exhibition", date: "2024-12-15", category: "Art", description: "An exhibition of contemporary art." },
  ];

  const navigate = useNavigate();

  const [newEvents, setNewEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const upcoming = events.filter(event => new Date(event.date) > currentDate);
    const past = events.filter(event => new Date(event.date) <= currentDate);

    setNewEvents(upcoming);
    setPastEvents(past);
  }, [events]);

  const styles = {
    container: {
      padding: '50px 20px',
      backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGV2ZW50fGVufDB8fDB8fHww")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
    },
    heading: {
      fontSize: '4rem',
      marginBottom: '40px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      textShadow: '4px 4px 6px rgba(0, 0, 0, 0.6)',
    },
    eventBoxes: {
      display: 'flex',
      justifyContent: 'center',
      gap: '30px',
      flexWrap: 'wrap',
      paddingTop: '20px',
    },
    eventBox: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent dark background for the event box
      padding: '30px 20px',
      width: '300px',
      height: '320px',
      borderRadius: '15px',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
      cursor: 'pointer',
      display: 'flex',
      opacity: '0.85',
      flexDirection: 'column',
      justifyContent: 'space-between',
      textAlign: 'center',
      position: 'relative',
      transition: 'all 0.3s ease-in-out', // Smooth transition for visual effects
      textDecoration: 'none',
    },
    eventTitle: {
      fontSize: '1.7rem',
      fontWeight: '700',
      marginBottom: '15px',
      color: '#ecf0f1', // Lighter color for title
      textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
    },
    eventDescription: {
      fontSize: '1.2rem',
      lineHeight: '1.6',
      opacity: '0.85',
      color: '#bdc3c7', // Lighter text color
    },
    eventCount: {
      fontSize: '1.4rem',
      fontWeight: 'bold',
      color: '#2980b9', // Lively blue for the event count
      marginTop: '15px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Event Dashboard</h1>

      <div style={styles.eventBoxes}>
        {/* New Events Section */}
        <div
          style={styles.eventBox}
          onClick={() => navigate('/new-events')}
        >
          <h2 style={styles.eventTitle}>New Events</h2>
          <p style={styles.eventDescription}>{newEvents.length} Upcoming Events</p>
          <p style={styles.eventCount}>View Details</p>
        </div>

        {/* Past Events Section */}
        <div
          style={styles.eventBox}
          onClick={() => navigate('/past-events')}
        >
          <h2 style={styles.eventTitle}>Past Events</h2>
          <p style={styles.eventDescription}>{pastEvents.length} Past Events</p>
          <p style={styles.eventCount}>View Details</p>
        </div>
      </div>
    </div>
  );
};

export default EventDashboard;
