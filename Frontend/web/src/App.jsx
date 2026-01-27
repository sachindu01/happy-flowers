import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import PlantDetailPage from './pages/PlantDetailPage';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

import UserDashboard from './pages/UserDashboard';

import AdminDashboard from './pages/AdminDashboard';
import AdminPlantsPage from './pages/AdminPlantsPage';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/plants/:id" element={<PlantDetailPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute adminOnly>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/plants"
          element={
            <PrivateRoute adminOnly>
              <AdminPlantsPage />
            </PrivateRoute>
          }
        />

        {/* TODO: Add /admin/orders page later */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
