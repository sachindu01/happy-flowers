import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">Happy Flowers</Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/catalog">Catalog</Link>

          {user ? (
            <>
              <Link to="/cart" className="cart-link">
                Cart {items.length > 0 && `(${items.length})`}
              </Link>

              {user.role === 'ADMIN' ? (
                <Link to="/admin">Admin Dashboard</Link>
              ) : (
                <Link to="/dashboard">My Orders</Link>
              )}

              <button onClick={handleLogout} className="btn-link">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
