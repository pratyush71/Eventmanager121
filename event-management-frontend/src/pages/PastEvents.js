// src/pages/PastEvents.js
import React, { useState } from "react";
import "./PastEvents.css"; // Import CSS for styling

const eventsData = [
  // Music Events
  { id: 1, name: "Lollapalooza India 2024", venue: "Mahalakshmi Race Course", date: "2024-01-01", category: "Music", description: "The Jonas Brothers made their India debut at this festival..." },
  { id: 2, name: "Ed Sheeran and Diljit Dosanjh Collaboration", venue: "Various", date: "2024-01-01", category: "Music", description: "A groundbreaking performance that set new records..." },
  { id: 3, name: "Maroon 5 Live in Mumbai", venue: "Mahalaxmi Race Course", date: "2024-01-02", category: "Music", description: "The band filled Mumbai's Mahalaxmi Race Course..." },
  { id: 4, name: "Coldplay’s Music Of The Spheres World Tour", venue: "Ahmedabad", date: "2024-01-03", category: "Music", description: "Fans from over 500 cities traveled to Ahmedabad..." },
  { id: 5, name: "Avenged Sevenfold at Bandland 2024", venue: "Bandland", date: "2024-01-04", category: "Music", description: "An epic rock performance by Avenged Sevenfold..." },

  // Sports Events
  { id: 6, name: "Pro Kabaddi League 2024", venue: "Multiple venues across India", date: "2024-09-01", category: "Sports", description: "India’s premier kabaddi tournament featuring top players..." },
  { id: 7, name: "Indian Premier League (IPL) 2024", venue: "Various stadiums across India", date: "2024-03-01", category: "Sports", description: "India’s most popular cricket league with thrilling matches..." },
  { id: 8, name: "Hockey Pro League 2024", venue: "Various venues across India", date: "2024-01-01", category: "Sports", description: "India competes in the prestigious Hockey Pro League..." },
  { id: 9, name: "Hero Indian Open Golf Championship 2025", venue: "DLF Golf & Country Club, Gurugram", date: "2025-02-01", category: "Sports", description: "Prestigious international golf tournament..." },
  { id: 10, name: "Kabaddi World Cup 2024", venue: "Patiala, Punjab", date: "2024-11-01", category: "Sports", description: "Global championship for Kabaddi with India as the defending champion..." },

  // Motivational and Personal Growth Events
  { id: 11, name: "TEDx Talks", venue: "Various Cities", date: "2024-01-01", category: "Motivational", description: "Innovative ideas and personal stories shared by inspiring speakers..." },
  { id: 12, name: "Tony Robbins Unleash The Power Within – Virtual Event", venue: "Virtual", date: "2025-01-01", category: "Motivational", description: "Unlocking potential and achieving personal breakthroughs with Tony Robbins..." },
  { id: 13, name: "World Economic Forum (WEF) 2024", venue: "Davos, Switzerland", date: "2024-01-01", category: "Motivational", description: "Leaders discussing global issues like climate change and economic growth..." },
  { id: 14, name: "Mindvalley’s Lifebook Online Mastery Program", venue: "Online", date: "2024-01-01", category: "Motivational", description: "A transformative course to design your ideal life..." },
  { id: 15, name: "International Women's Day Panel Discussion 2025", venue: "Virtual & Various Locations", date: "2025-03-08", category: "Motivational", description: "Empowering talks on women’s rights, equality, and leadership..." },

  // Technology & Innovation Events
  { id: 16, name: "TechCrunch Disrupt 2024", venue: "San Francisco, USA", date: "2024-10-01", category: "Technology", description: "Startups pitch innovative products at this global technology conference..." },
  { id: 17, name: "CES 2025", venue: "Las Vegas, USA", date: "2025-01-01", category: "Technology", description: "The latest advancements in tech, including AI, robotics, and smart gadgets..." },
  { id: 18, name: "Google I/O 2025", venue: "Mountain View, California, USA", date: "2025-05-01", category: "Technology", description: "Google’s annual developer conference for new products and technologies..." },

  // Food & Culinary Festivals
  { id: 19, name: "International Food Festival 2024", venue: "New Delhi, India", date: "2024-11-01", category: "Food", description: "Celebration of food from around the world with cooking demos and tastings..." },
  { id: 20, name: "Goa Food & Cultural Festival", venue: "Candolim, Goa", date: "2024-12-01", category: "Food", description: "Indulge in Goan, Indian, and international cuisines along with cultural performances..." },

  // Fashion Events
  { id: 21, name: "Lakmé Fashion Week Summer/Resort 2025", venue: "Mumbai, India", date: "2025-03-01", category: "Fashion", description: "India’s top fashion week showcasing latest trends in fashion and lifestyle..." },
  { id: 22, name: "India Couture Week 2024", venue: "New Delhi, India", date: "2024-07-01", category: "Fashion", description: "Exclusive couture fashion event showcasing opulent collections..." },

  // Adventure and Travel Events
  { id: 23, name: "India Travel Mart 2024", venue: "New Delhi, India", date: "2024-08-01", category: "Travel", description: "Travel trade show highlighting global tourism and adventure travel..." },
  { id: 24, name: "World Travel Market (WTM) 2024", venue: "London, UK", date: "2024-11-01", category: "Travel", description: "Global event for the travel industry discussing trends and business opportunities..." },
  { id: 25, name: "Ladakh Marathon 2024", venue: "Leh, Ladakh", date: "2024-09-01", category: "Travel", description: "Challenging and scenic marathon in the high-altitude desert region of Ladakh..." },

  // International Sports Events
  { id: 26, name: "FIFA Women's World Cup 2023", venue: "Australia & New Zealand", date: "2023-07-20", category: "International Sports", description: "32 national teams competing for the FIFA Women’s World Cup..." },
  { id: 27, name: "Wimbledon 2024", venue: "All England Club, London, UK", date: "2024-06-24", category: "International Sports", description: "Prestigious tennis Grand Slam with top international players..." },
  { id: 28, name: "UEFA Euro 2024", venue: "Germany", date: "2024-06-14", category: "International Sports", description: "16th edition of the UEFA European Championship..." },

  // International Cultural Events
  { id: 29, name: "Edinburgh Festival Fringe 2024", venue: "Edinburgh, Scotland", date: "2024-08-02", category: "International Culture", description: "World’s largest arts festival featuring thousands of performances..." },
  { id: 30, name: "Venice Biennale 2024", venue: "Venice, Italy", date: "2024-05-01", category: "International Culture", description: "Renowned contemporary art exhibition showcasing national pavilions..." },

  // International Fashion Events
  { id: 31, name: "Paris Fashion Week 2024 (Spring/Summer)", venue: "Paris, France", date: "2024-09-25", category: "International Fashion", description: "Top designers showcase their Spring/Summer collections..." },
  { id: 32, name: "New York Fashion Week 2024", venue: "New York City, USA", date: "2024-02-08", category: "International Fashion", description: "Leading designers setting trends for the upcoming season..." },

  // International Motivational and Business Events
  { id: 33, name: "World Economic Forum (WEF) 2024", venue: "Davos, Switzerland", date: "2024-01-23", category: "International Motivational", description: "Global summit for leaders to discuss major world issues..." },
  { id: 34, name: "TedGlobal 2024", venue: "Edinburgh, Scotland", date: "2024-07-01", category: "International Motivational", description: "Sharing groundbreaking ideas on technology, education, and design..." },

  // Technology & Innovation
  { id: 35, name: "CES 2025", venue: "Las Vegas, USA", date: "2025-01-07", category: "International Technology", description: "The Consumer Electronics Show featuring the latest innovations..." },
  { id: 36, name: "Web Summit 2024", venue: "Lisbon, Portugal", date: "2024-11-04", category: "International Technology", description: "Largest technology conference discussing future trends..." },
];

const PastEvents = () => {
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
    <div className="past-events">
      <h1>Past Events</h1>

      {/* Filter Section */}
      <div className="filters">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Motivational">Motivational</option>
          <option value="Technology">Technology</option>
          <option value="Food">Food</option>
          <option value="Fashion">Fashion</option>
          <option value="Travel">Travel</option>
          <option value="International Sports">International Sports</option>
          <option value="International Culture">International Culture</option>
        </select>

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

      <div className="event-list">
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-card">
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <p>
              <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Venue:</strong> {event.venue}
            </p>
            <p>
              <strong>Category:</strong> {event.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastEvents;
