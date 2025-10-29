import React, { useState } from 'react';
import axios from 'axios';

const loginContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  padding: '20px',
  boxSizing: 'border-box'
};

const loginBoxStyle = {
  background: '#1a2230',
  padding: '40px',
  borderRadius: '10px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
  textAlign: 'center',
  width: '100%',
  maxWidth: '400px'
};

const titleStyle = {
  color: '#4CAF50', // Kenyan Green
  marginBottom: '10px'
};

const subtitleStyle = {
  color: '#ccc',
  marginBottom: '30px',
  fontSize: '0.9em'
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  margin: '10px 0',
  borderRadius: '5px',
  border: '1px solid #333',
  background: '#2c3e50',
  color: '#fff',
  boxSizing: 'border-box'
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  background: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  marginTop: '20px'
};

const errorStyle = {
  color: '#ff4d4d',
  marginTop: '15px'
};

const footerStyle = {
  position: 'absolute',
  bottom: '20px',
  color: '#666'
}


function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // --- IMPORTANT ---
    // The backend URL needs to be set correctly in production
    // We will handle this with environment variables in Render
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

    try {
      // We send the credentials, but the backend will use the secure API token
      const response = await axios.post(`${backendUrl}/api/login`, { email, password });
      onLoginSuccess(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={loginContainerStyle}>
      <div style={loginBoxStyle}>
        <h1 style={titleStyle}>shonfxkenya</h1>
        <p style={subtitleStyle}>Enter your Deriv credentials to begin</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Deriv Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="password"
            placeholder="Deriv Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
          <button type="submit" style={buttonStyle} disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
        {error && <p style={errorStyle}>{error}</p>}
      </div>
       <p style={footerStyle}>Empowered by shon son of kazee</p>
    </div>
  );
}

export default Login;