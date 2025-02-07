// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css'; // Import the new CSS for styling

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Logic for handling login (API calls)
    console.log('Login:', email, password);
    // Redirect on successful login
    navigate('/guest');
  };

  return (
    <div className="container">
      <div className="form-container login-page">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input type="submit" value="Login" />
        </form>
        <div className="auth-links">
          <p>Don't have an account? <a href="/register">Register</a></p>
          <button onClick={() => navigate('/guest')}>Login as Guest</button>
        </div>
      </div>
      
    </div>
  );
};

export default LoginPage;
