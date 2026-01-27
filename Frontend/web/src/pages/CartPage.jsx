import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import placeholderImg from "../assets/placeholder.jpg";

const centsToMoney = (cents) => Number(cents || 0) / 100;

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, totalCents } = useCart();
  const navigate = useNavigate();

  if (!items || items.length === 0) {
    return (
      <div className="page">
        <h1>Shopping Cart</h1>
        <p>Your cart is empty</p>
        <Link to="/catalog" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Shopping Cart</h1>

      <div className="cart-items">
        {items.map((item) => {
          const plant = item.plant;

          const unitPriceCents =
            item.unitPriceCents ?? plant.priceCents ?? plant.price ?? 0;

          const unitPrice = centsToMoney(unitPriceCents);
          const qty = Number(item.quantity || 1);

          return (
            <div key={plant.id} className="cart-item">
              <img
                src={plant.imageUrl || placeholderImg}
                alt={plant.name}
                onError={(e) => {
                  e.currentTarget.src = placeholderImg;
                }}
              />

              <div className="cart-item-info">
                <h3>{plant.name}</h3>
                <p>${unitPrice.toFixed(2)}</p>
              </div>

              <div className="cart-item-actions">
                <input
                  type="number"
                  min="1"
                  max={plant.stockQty}
                  value={qty}
                  onChange={(e) =>
                    updateQuantity(plant.id, parseInt(e.target.value, 10) || 1)
                  }
                  className="input"
                />
                <button
                  onClick={() => removeFromCart(plant.id)}
                  className="btn btn-secondary"
                >
                  Remove
                </button>
              </div>

              <div className="cart-item-total">
                ${(unitPrice * qty).toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="cart-summary">
        <h2>Total: ${centsToMoney(totalCents).toFixed(2)}</h2>
        <button onClick={() => navigate("/checkout")} className="btn btn-primary">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
