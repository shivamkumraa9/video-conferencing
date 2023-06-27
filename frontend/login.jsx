import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send the login data to the backend using Axios
    axios.post('/api/login', formData)
      .then((response) => {
        // Store the authentication token in local storage
        localStorage.setItem('token', response.data.token);
        history.push('/dashboard'); // Redirect to the dashboard page
      })
      .catch((error) => {
        setError('Invalid email or password');
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </label>

        {error && <p>{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;