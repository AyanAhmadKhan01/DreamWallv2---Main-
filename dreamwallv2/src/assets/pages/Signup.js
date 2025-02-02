import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';



function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const checkLoginStatus = async () => {
      const response = await fetch(process.env.USER_DATA, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
      });
  
      if (response.ok) {
        navigate('/dashboard');
      } 
    };
  
    checkLoginStatus();
  }, [navigate]);


  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(process.env.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }
      navigate('/login');
      alert('Registration successful!');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-section">
      <h1>Register</h1>
      <div className="register-subsection">
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          /> <br/>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          /> <br/>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          /> <br/>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Link to="/login"><h5>Login?</h5></Link>
          <br />
          <button type="submit" id="submit-btn">Register</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
