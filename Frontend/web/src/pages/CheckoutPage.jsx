import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useCart } from "../contexts/CartContext";

const centsToMoney = (cents) => Number(cents || 0) / 100;

const CheckoutPage = () => {
  const { items, totalCents, clearCart } = useCart(); // ✅ use totalCents
  const navigate = useNavigate();

  const [fulfillmentMethod, setFulfillmentMethod] = useState("DELIVERY");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [address, setAddress] = useState({ street: "", city: "", state: "", zip: "" });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const orderData = {
        items: items.map((item) => {
          const unitPriceCents =
            item.unitPriceCents ?? item.plant.priceCents ?? item.plant.price ?? 0;

          return {
            plantId: item.plant.id,
            quantity: item.quantity,
            unitPriceCents, // ✅ send cents (recommended)
          };
        }),
        fulfillmentMethod,
        paymentMethod,
        ...(fulfillmentMethod === "DELIVERY" && { deliveryAddress: address }),
      };

      await api.post("/api/orders", orderData);
      clearCart();
      alert("Order placed successfully!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="page">
        <h1>Checkout</h1>
        <p>Your cart is empty</p>
        <Link to="/catalog" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Checkout</h1>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="checkout-form">
        <section>
          <h2>Order Summary</h2>

          {items.map((item) => {
            const unitPriceCents =
              item.unitPriceCents ?? item.plant.priceCents ?? item.plant.price ?? 0;

            const lineTotal = centsToMoney(unitPriceCents) * Number(item.quantity || 1);

            return (
              <div key={item.plant.id} className="checkout-item">
                <span>{item.plant.name} x {item.quantity}</span>
                <span>${lineTotal.toFixed(2)}</span>
              </div>
            );
          })}

          <div className="checkout-total">
            <strong>Total: ${centsToMoney(totalCents).toFixed(2)}</strong>
          </div>
        </section>

        <section>
          <h2>Fulfillment Method</h2>
          <label>
            <input
              type="radio"
              value="DELIVERY"
              checked={fulfillmentMethod === "DELIVERY"}
              onChange={(e) => setFulfillmentMethod(e.target.value)}
            />
            Delivery
          </label>
          <label>
            <input
              type="radio"
              value="PICKUP"
              checked={fulfillmentMethod === "PICKUP"}
              onChange={(e) => setFulfillmentMethod(e.target.value)}
            />
            Pickup
          </label>
        </section>

        {fulfillmentMethod === "DELIVERY" && (
          <section>
            <h2>Delivery Address</h2>
            <input
              type="text"
              placeholder="Street"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
              required
              className="input"
            />
            <input
              type="text"
              placeholder="City"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              required
              className="input"
            />
            <input
              type="text"
              placeholder="State"
              value={address.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
              required
              className="input"
            />
            <input
              type="text"
              placeholder="ZIP Code"
              value={address.zip}
              onChange={(e) => setAddress({ ...address, zip: e.target.value })}
              required
              className="input"
            />
          </section>
        )}

        <section>
          <h2>Payment Method</h2>
          <label>
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              value="CARD"
              checked={paymentMethod === "CARD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Card Payment
          </label>
        </section>

        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
