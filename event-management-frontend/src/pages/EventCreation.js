import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EventCreation = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    category: "Music",
  });

  const [error, setError] = useState(null); // Store API error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend Validation
    if (!formData.name || !formData.description || !formData.date || !formData.time) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/events/create-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    
      const text = await response.text(); // Convert to text first
      console.log("Raw Response:", text);
    
      const data = JSON.parse(text); // Try parsing JSON manually
      if (!response.ok) throw new Error(data.message || "Something went wrong.");
    
      alert("Event created successfully!");
      navigate("/event-dashboard");
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message);
    }
    
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Create a New Event</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        {error && <p style={styles.error}>{error}</p>} {/* Show error messages */}

        <InputField label="Event Name:" type="text" name="name" value={formData.name} handleChange={handleChange} />
        <TextareaField label="Event Description:" name="description" value={formData.description} handleChange={handleChange} />
        <InputField label="Event Date:" type="date" name="date" value={formData.date} handleChange={handleChange} />
        <InputField label="Event Time:" type="time" name="time" value={formData.time} handleChange={handleChange} />

        <div style={styles.field}>
          <label style={styles.label}>Event Category:</label>
          <select name="category" value={formData.category} onChange={handleChange} style={styles.input}>
            <option value="Music">Music</option>
            <option value="Technology">Technology</option>
            <option value="Sports">Sports</option>
            <option value="Art">Art</option>
          </select>
        </div>

        <button type="submit" style={styles.button}>Create Event</button>
      </form>
    </div>
  );
};

// Reusable Components for Inputs
const InputField = ({ label, type, name, value, handleChange }) => (
  <div style={styles.field}>
    <label style={styles.label}>{label}</label>
    <input type={type} name={name} value={value} onChange={handleChange} style={styles.input} required />
  </div>
);

const TextareaField = ({ label, name, value, handleChange }) => (
  <div style={styles.field}>
    <label style={styles.label}>{label}</label>
    <textarea name={name} value={value} onChange={handleChange} style={{ ...styles.input, height: "120px" }} required />
  </div>
);

// Styles
const styles = {
  container: { padding: "50px 20px", minHeight: "100vh", backgroundColor: "#f9fafb", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#333" },
  heading: { fontSize: "2.5rem", marginBottom: "30px", fontWeight: "bold", color: "#2c3e50" },
  form: { display: "flex", flexDirection: "column", width: "100%", maxWidth: "600px", backgroundColor: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" },
  field: { marginBottom: "20px" },
  label: { fontSize: "1.1rem", marginBottom: "8px", fontWeight: "500", color: "#333" },
  input: { width: "100%", padding: "12px", fontSize: "1rem", borderRadius: "8px", border: "1px solid #ddd", backgroundColor: "#f8f8f8", outline: "none" },
  button: { padding: "14px 28px", fontSize: "1.2rem", backgroundColor: "#2980b9", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
  error: { color: "red", fontSize: "1rem", marginBottom: "15px" },
}; 

export default EventCreation;
