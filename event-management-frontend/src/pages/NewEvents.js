// src/pages/NewEvents.js
import React, { useState } from "react";
import "./NewEvents.css"; // Import CSS for styling

const eventsData = [
  { id: 1, name: "Tiesto LIVE in Mumbai", venue: "Hall No. 6, Nesco Center", date: "2025-02-14", category: "Music", price: 2499, interested: 10000 },
  { id: 2, name: "Tiesto LIVE in Gurugram", venue: "Gurugram", date: "2025-02-13", category: "Music", price: 2499, interested: 8000 },
  { id: 3, name: "Tiesto LIVE in Bengaluru", venue: "Bengaluru", date: "2025-02-16", category: "Music", price: 2499, interested: 7000 },
  { id: 4, name: "Arijit Singh India Tour | Mumbai", venue: "Jio World Garden", date: "2025-03-23", category: "Music", price: 13500, interested: 12000 },
  { id: 5, name: "Millionaire India Tour | Yo Yo Honey Singh Live | Mumbai", venue: "Nesco Pvt Ltd", date: "2025-02-22", category: "Music", price: 3500, interested: 5000 },
  { id: 6, name: "RuPay Zomaland by Zomato | Season 5 | Mumbai", venue: "Jio World Garden", date: "2025-02-15", category: "Festival", price: 799, interested: 4000 },
  { id: 7, name: "Frolic Fields 2025", venue: "JVPD Ground - Arvog Leisure", date: "2025-02-08", category: "Kids Festival", price: 499, interested: 2000 },
  { id: 8, name: "Comedy Night Fundraiser Ft. Sahil Shah", venue: "Cat Café Studio", date: "2025-02-14", category: "Comedy", price: 1000, interested: 800 },
  { id: 9, name: "Ministry of Jokes", venue: "Ministry of Games, Juhu", date: "2025-01-24", category: "Comedy", price: 249, interested: 600 },
  { id: 10, name: "Paint & Swap with Your Date and Cats!", venue: "Cat Café Studio", date: "2025-02-15", category: "Workshops", price: 499, interested: 300 },
  // New Events
  { id: 11, name: "Lollapalooza India 2025", venue: "Mumbai, India", date: "2025-03-08", category: "Festival", price: 5000, interested: 15000 },
  { id: 12, name: "Kelly Clarkson's 'Studio Sessions' Las Vegas Residency", venue: "The Colosseum at Caesar's Palace, Las Vegas, USA", date: "2025-07-04", category: "Music", price: 10000, interested: 12000 },
  { id: 13, name: "Bonnie Raitt 2025 Tour", venue: "Various locations across North America", date: "2025-03-01", category: "Music", price: 3000, interested: 8000 },
  { id: 14, name: "Morrissey Spring 2025 Tour", venue: "Various locations across North America", date: "2025-04-01", category: "Music", price: 2500, interested: 7000 },
  { id: 15, name: "BAFTA EE Rising Star Party", venue: "Pavyllon, Four Seasons, London, UK", date: "2025-02-06", category: "Awards", price: 0, interested: 500 },
  { id: 16, name: "Robbie Williams Live 2025 Tour", venue: "Various cities across Europe", date: "2025-05-31", category: "Music", price: 4000, interested: 10000 },
  { id: 17, name: "MUSEXPO 2025", venue: "Los Angeles, USA", date: "2025-03-16", category: "Conference", price: 2000, interested: 3000 },
  { id: 18, name: "Future of Everything Festival 2025", venue: "New York City, USA", date: "2025-05-28", category: "Conference", price: 1500, interested: 2500 },
  { id: 19, name: "C2 Montréal 2025", venue: "Montréal, Canada", date: "2025-05-20", category: "Conference", price: 1800, interested: 2000 },
  { id: 20, name: "Web Summit 2025", venue: "Lisbon, Portugal", date: "2025-11-03", category: "Conference", price: 2200, interested: 5000 },
  { id: 21, name: "World Experience Summit 2025", venue: "London, UK", date: "2025-04-29", category: "Conference", price: 1700, interested: 1500 },
  { id: 22, name: "Supernatural Official Convention 2025", venue: "Novi, Michigan, USA", date: "2025-07-11", category: "Fan Convention", price: 500, interested: 1000 },
  { id: 23, name: "19th Annual Summer FUN Convention", venue: "Orlando, Florida, USA", date: "2025-07-10", category: "Collectibles", price: 300, interested: 800 },
  { id: 24, name: "DW Global Media Forum 2025", venue: "Bonn, Germany", date: "2025-07-07", category: "Conference", price: 1200, interested: 1000 },
  { id: 25, name: "The Children’s Media Conference 2025", venue: "Sheffield, UK", date: "2025-07-08", category: "Conference", price: 900, interested: 700 },
  { id: 26, name: "Copenhagen TV Festival 2025", venue: "Copenhagen, Denmark", date: "2025-08-26", category: "Festival", price: 800, interested: 600 },
  { id: 27, name: "India Photo Expo 2025", venue: "New Delhi, India", date: "2025-03-21", category: "Exhibition", price: 400, interested: 500 },
  { id: 28, name: "Marketing Cafe 2025", venue: "Sandton, South Africa", date: "2025-03-11", category: "Conference", price: 600, interested: 400 },
  { id: 29, name: "BABYMONSTER 1st World Tour [HELLO MONSTERS]", venue: "Kia Forum, Inglewood, USA", date: "2025-03-02", category: "Music", price: 3500, interested: 9000 },
  { id: 30, name: "Dua Lipa's Radical Optimism Tour", venue: "Various cities across the USA", date: "2025-09-05", category: "Music", price: 4500, interested: 11000 },
  { id: 31, name: "Jonas Brothers 20th Anniversary Tour", venue: "Various cities", date: "2025-01-01", category: "Music", price: 3000, interested: 10000 },
  { id: 32, name: "CMA Awards 2025", venue: "Bridgestone Arena, Nashville, USA", date: "2025-11-12", category: "Awards", price: 0, interested: 5000 },
  { id: 33, name: "Las Vegas Grand Prix 2025", venue: "Las Vegas, USA", date: "2025-11-19", category: "Sports", price: 5000, interested: 15000 },
  { id: 34, name: "Macy's Thanksgiving Day Parade 2025", venue: "New York City, USA", date: "2025-11-27", category: "Festival", price: 0, interested: 20000 },
  { id: 35, name: "Fan Expo San Francisco 2025", venue: "Moscone Center West, San Francisco, USA", date: "2025-11-28", category: "Fan Convention", price: 300, interested: 3000 },
];

const NewEvents = () => {
  const [category, setCategory] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");

  const filteredEvents = eventsData.filter((event) => {
    const eventDate = new Date(event.date);
    const eventMonth = eventDate.getMonth() + 1; // Get month number (1-12)

    return (
      (category === "" || event.category === category) &&
      (startMonth === "" || eventMonth >= parseInt(startMonth)) &&
      (endMonth === "" || eventMonth <= parseInt(endMonth))
    );
  });

  return (
    <div className="new-events">
      <h1>Upcoming Events</h1>

      {/* Filter Section */}
      <div className="filters">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Music">Music</option>
          <option value="Festival">Festival</option>
          <option value="Kids Festival">Kids Festival</option>
          <option value="Comedy">Comedy</option>
          <option value="Workshops">Workshops</option>
          <option value="Awards">Awards</option>
          <option value="Conference">Conference</option>
          <option value="Fan Convention">Fan Convention</option>
          <option value="Collectibles">Collectibles</option>
          <option value="Exhibition">Exhibition</option>
          <option value="Sports">Sports</option>
        </select>

        {/* Month Range Filter */}
        <select value={startMonth} onChange={(e) => setStartMonth(e.target.value)}>
          <option value="">Start Month</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{new Date(2025, i).toLocaleString('default', { month: 'long' })}</option>
          ))}
        </select>

        <select value={endMonth} onChange={(e) => setEndMonth(e.target.value)}>
          <option value="">End Month</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{new Date(2025, i).toLocaleString('default', { month: 'long' })}</option>
          ))}
        </select>
      </div>

      {/* Display Filtered Events */}
      <div className="events-list">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className="event-card">
              <h2>{event.name}</h2>
              <p><strong>Venue:</strong> {event.venue}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Price:</strong> {event.price === 0 ? "Free" : `INR ${event.price}`}</p>
              <p><strong>{event.interested} interested</strong></p>
              <button className="buy-btn">Buy Now</button>
            </div>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default NewEvents;