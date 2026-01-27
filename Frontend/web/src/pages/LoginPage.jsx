import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const res = await api.post('/api/auth/login', { email, password });
    login(res.data.accessToken);

    const from = location.state?.from?.pathname || '/';
    navigate(from, { replace: true });
  } catch (err) {
    setError(err.response?.data?.message || 'Login failed');
  }
};


  return (
    <div className="page">
      <div className="auth-form">
        <h1>Login</h1>
        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
          <button type="submit" className="btn btn-primary">Login</button>
        </form>

        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
