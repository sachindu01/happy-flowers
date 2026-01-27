import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="page">
      <h1>Admin Dashboard</h1>
      <div className="admin-links">
        <Link to="/admin/plants" className="btn btn-primary">Manage Plants</Link>
        <Link to="/admin/orders" className="btn btn-primary">Manage Orders</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
