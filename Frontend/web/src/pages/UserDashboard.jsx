import React, { useEffect, useState } from 'react';
import { api } from '../api/api';

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/api/orders/me');
        setOrders(res.data);
      } catch (e) {
        console.error('Error fetching orders:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span className={`status status-${order.orderStatus.toLowerCase()}`}>
                  {order.orderStatus}
                </span>
              </div>

              <p>Total: ${order.totalAmount.toFixed(2)}</p>
              <p>Fulfillment: {order.fulfillmentMethod}</p>
              <p>Payment: {order.paymentMethod}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>

              <div className="order-items">
                <h4>Items:</h4>
                {order.items.map((item, idx) => (
                  <div key={idx}>
                    {item.plantName} x {item.quantity} - ${item.price.toFixed(2)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
