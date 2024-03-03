// src/pages/Auth/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user.userId);
      window.location.href = '/client-space';

    } catch (error) {
      console.error('Login error:', error.response.data);
    }
  };


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <Link to="/auth/register">Register here</Link></p>
    </div>
  );
}

export default Login;
