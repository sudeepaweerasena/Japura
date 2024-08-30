import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './stylesss.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      if (response.data.success) {
        // Save token to localStorage or context
        localStorage.setItem('token', response.data.token);
        // Redirect to the form page
        navigate('/form');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="wrapper">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Login</button>
          <p>*Click here to <span onClick={() => navigate('/register')}>register</span></p>
        </form>
      </div>
    </div>
  );
  
};

export default Login;
