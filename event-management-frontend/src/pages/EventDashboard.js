import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EventDashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [newEvents, setNewEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/events"); // Replace with your API URL
      const allEvents = response.data;

      setEvents(allEvents);
      const currentDate = new Date();
      setNewEvents(allEvents.filter(event => new Date(event.date) > currentDate));
      setPastEvents(allEvents.filter(event => new Date(event.date) <= currentDate));
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Event Dashboard</h1>

      <button style={styles.createEventBtn} onClick={() => navigate("/create-event")}>
        + Create New Event
      </button>

      <div style={styles.eventBoxes}>
        <EventBox title="New Events" count={newEvents.length} onClick={() => navigate("/new-events")} />
        <EventBox title="Past Events" count={pastEvents.length} onClick={() => navigate("/past-events")} />
      </div>

      <h2 style={styles.subHeading}>All Events</h2>
      <div style={styles.eventGrid}>
        {events.map((event) => (
          <EventCard key={event._id} event={event} onClick={() => navigate(`/events/${event._id}`)} />
        ))}
      </div>
    </div>
  );
};

// 🔹 Reusable Event Box Component
const EventBox = ({ title, count, onClick }) => (
  <div style={styles.eventBox} onClick={onClick}>
    <h2 style={styles.eventTitle}>{title}</h2>
    <p style={styles.eventDescription}>{count} Events</p>
    <p style={styles.eventCount}>View Details →</p>
  </div>
);

// 🔹 Event Card Component
const EventCard = ({ event, onClick }) => (
  <div style={styles.eventCard} onClick={onClick}>
    <h3 style={styles.eventCardTitle}>{event.name}</h3>
    <p style={styles.eventCardDate}>{new Date(event.date).toDateString()}</p>
    <p style={styles.eventCardDescription}>{event.description}</p>
  </div>
);

// 🔹 Styles
const styles = {
  container: {
    padding: "50px 20px",
    background: "linear-gradient(to right, #6fa3ef, #7b9fbb)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
  },
  heading: { fontSize: "3rem", fontWeight: "bold", marginBottom: "20px" },
  createEventBtn: {
    backgroundColor: "#27ae60",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.2rem",
    cursor: "pointer",
    marginBottom: "20px",
    transition: "background 0.3s",
  },
  eventBoxes: { display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" },
  eventBox: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: "30px",
    width: "280px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.3s",
  },
  eventTitle: { fontSize: "1.5rem", fontWeight: "700", marginBottom: "15px", color: "#ecf0f1" },
  eventDescription: { fontSize: "1.2rem", opacity: "0.85", color: "#bdc3c7" },
  eventCount: { fontSize: "1.4rem", fontWeight: "bold", color: "#2980b9", marginTop: "10px" },
  subHeading: { fontSize: "2rem", fontWeight: "bold", marginTop: "40px" },
  eventGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "20px",
    width: "80%",
  },
  eventCard: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.3s",
  },
  eventCardTitle: { fontSize: "1.5rem", fontWeight: "bold", color: "#ecf0f1" },
  eventCardDate: { fontSize: "1.2rem", color: "#bdc3c7", marginBottom: "10px" },
  eventCardDescription: { fontSize: "1rem", opacity: "0.85", color: "#bdc3c7" },
};

export default EventDashboard;
