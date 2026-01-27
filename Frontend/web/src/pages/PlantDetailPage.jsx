import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/api";
import { useCart } from "../contexts/CartContext";
import placeholderImg from "../assets/placeholder.jpg";


const PlantDetailPage = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const res = await api.get(`/api/plants/${id}`);
        setPlant(res.data);
      } catch (e) {
        console.error("Error fetching plant:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPlant();
  }, [id]);

  const handleAddToCart = () => {
    if (!plant) return;
    addToCart(plant, quantity);
    alert("Added to cart!");
    navigate("/cart");
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!plant) return <div className="page">Plant not found</div>;

  const priceCents = plant?.priceCents;
  const priceText =
    typeof priceCents === "number"
      ? new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(priceCents / 100)
      : "Price unavailable";

  const stockQty = plant?.stockQty ?? 0;

  return (
    <div className="page">
      <div className="plant-detail">
        <div className="plant-detail-image">
          <img
  src={plant?.imageUrl || placeholderImg}
  alt={plant?.name ?? "Plant"}
  onError={(e) => {
    e.currentTarget.src = placeholderImg;
  }}
/>

        </div>

        <div className="plant-detail-info">
          <h1>{plant?.name ?? "Unnamed plant"}</h1>
          <p className="category">Category: {plant?.category ?? "Uncategorized"}</p>
          <p className="price">{priceText}</p>
          <p className="description">{plant?.description ?? ""}</p>

          <p className="stock">{stockQty > 0 ? `${stockQty} available` : "Out of stock"}</p>

          {stockQty > 0 && (
            <div className="add-to-cart">
              <input
                type="number"
                min="1"
                max={stockQty}
                value={quantity}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10) || 1;
                  setQuantity(Math.max(1, Math.min(stockQty, v)));
                }}
                className="input"
              />
              <button onClick={handleAddToCart} className="btn btn-primary">
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantDetailPage;
