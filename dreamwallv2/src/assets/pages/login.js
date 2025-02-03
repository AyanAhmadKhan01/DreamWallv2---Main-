import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const response = await fetch(process.env.REACT_APP_USER_DATA, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
      });
  
      if (response.ok) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    };
  
    checkLoginStatus();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    const response = await fetch(process.env.REACT_APP_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',  
    });

    const data = await response.json();
    setLoading(false);  

    if (response.ok && data.token) {
      setMessage('Login successful!');
      window.location.reload();
      navigate('/dashboard');
    } else {
      setMessage(data.message || 'An error occurred');
    }
  };

  return (
    <div>
      <div className="login-section">
      <h1>Login</h1>
      <div className="login-subsection">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          id='username'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          id='password'
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         <br />
        <Link to={'/signup'}><h3>Register</h3></Link>
        <button type="submit" id='login-btn' disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
       
      </form>
     
      
      {message && <p>{message}</p>} 
    </div>
    </div>
    </div>
  );
};

export default Login;
