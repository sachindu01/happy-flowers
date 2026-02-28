import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

import { ShoppingCart, Flower2, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/');
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-slate-900 flex items-center gap-2 group" onClick={closeMobile}>
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

        {/* Mobile: cart icon + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          {user && (
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-slate-50 transition-colors">
              <ShoppingCart className="text-slate-600" size={20} />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white">
                  {items.length}
                </span>
              )}
            </Link>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 flex flex-col gap-3 shadow-md">
          <Link to="/" onClick={closeMobile} className="text-sm font-medium text-slate-600 hover:text-emerald-600 py-2">Home</Link>
          <Link to="/catalog" onClick={closeMobile} className="text-sm font-medium text-slate-600 hover:text-emerald-600 py-2">Catalog</Link>

          <div className="h-px bg-slate-100 my-1" />

          {user ? (
            <>
              {user.role === 'ADMIN' ? (
                <Link to="/admin" onClick={closeMobile} className="text-sm font-semibold text-emerald-600 py-2">Admin</Link>
              ) : (
                <Link to="/dashboard" onClick={closeMobile} className="text-sm font-medium text-slate-600 hover:text-emerald-600 py-2">My Orders</Link>
              )}
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-rose-500 text-left py-2 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMobile} className="text-sm font-medium text-slate-600 hover:text-emerald-600 py-2">Login</Link>
              <Link
                to="/register"
                onClick={closeMobile}
                className="bg-emerald-600 text-white text-sm font-bold px-5 py-2 rounded-full text-center hover:bg-emerald-700 transition-all"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
