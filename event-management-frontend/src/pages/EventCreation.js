import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventCreation = () => {
  const navigate = useNavigate();

  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    category: 'Music', // Default category
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle event creation logic here (e.g., send data to backend or display)
    console.log('Event Created:', formData);

    // Redirect back to dashboard or another page
    navigate('/event-dashboard');
  };

  return (
    <div style={{ padding: '50px 20px', minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#333', backgroundImage: 'linear-gradient(135deg, #6fa3ef, #7b9fbb)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '30px', fontWeight: 'bold', color: '#2c3e50', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)' }}>Create a New Event</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', backgroundColor: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="name" style={{ fontSize: '1.1rem', marginBottom: '8px', fontWeight: '500', color: '#333' }}>Event Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '12px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#f8f8f8', outline: 'none', transition: 'all 0.3s ease' }}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="description" style={{ fontSize: '1.1rem', marginBottom: '8px', fontWeight: '500', color: '#333' }}>Event Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: '100%', padding: '12px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#f8f8f8', outline: 'none', height: '150px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="date" style={{ fontSize: '1.1rem', marginBottom: '8px', fontWeight: '500', color: '#333' }}>Event Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={{ width: '100%', padding: '12px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#f8f8f8', outline: 'none', transition: 'all 0.3s ease' }}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="time" style={{ fontSize: '1.1rem', marginBottom: '8px', fontWeight: '500', color: '#333' }}>Event Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            style={{ width: '100%', padding: '12px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#f8f8f8', outline: 'none', transition: 'all 0.3s ease' }}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="category" style={{ fontSize: '1.1rem', marginBottom: '8px', fontWeight: '500', color: '#333' }}>Event Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{ width: '100%', padding: '12px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#f8f8f8', outline: 'none' }}
          >
            <option value="Music">Music</option>
            <option value="Technology">Technology</option>
            <option value="Sports">Sports</option>
            <option value="Art">Art</option>
          </select>
        </div>

        <button type="submit" style={{ padding: '14px 28px', fontSize: '1.2rem', backgroundColor: '#2980b9', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Create Event</button>
      </form>
    </div>
  );
};

export default EventCreation;
