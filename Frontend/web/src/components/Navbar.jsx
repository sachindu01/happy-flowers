import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

import { ShoppingCart, Flower2 } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-slate-900 flex items-center gap-2 group">
          <span className="text-emerald-500 group-hover:rotate-12 transition-transform duration-300">
            <Flower2 size={24} />
          </span>
          <span>Happy Flowers</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Home</Link>
          <Link to="/catalog" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Catalog</Link>

          <div className="h-4 w-px bg-slate-200 mx-2" />

          {user ? (
            <div className="flex items-center gap-6">
              <Link to="/cart" className="relative group p-2 rounded-full hover:bg-slate-50 transition-colors">
                <ShoppingCart className="text-slate-600 group-hover:text-emerald-600" size={20} />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white">
                    {items.length}
                  </span>
                )}
              </Link>


              {user.role === 'ADMIN' ? (
                <Link to="/admin" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">Admin</Link>
              ) : (
                <Link to="/dashboard" className="text-sm font-medium text-slate-600 hover:text-emerald-600">My Orders</Link>
              )}

              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-slate-500 hover:text-rose-500 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-emerald-600">Login</Link>
              <Link
                to="/register"
                className="bg-emerald-600 text-white text-sm font-bold px-5 py-2 rounded-full hover:bg-emerald-700 transition-all hover:shadow-md active:scale-95"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
