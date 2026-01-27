import React from "react";
import { useNavigate } from "react-router-dom";
import placeholderImg from "../assets/placeholder.jpg";

const PlantCard = ({ plant }) => {
  const navigate = useNavigate();

  const priceCents = plant?.priceCents;
  const priceText =
    typeof priceCents === "number"
      ? new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(priceCents / 100)
      : "Price unavailable";

  const stockQty = plant?.stockQty ?? 0;
  const stockText = stockQty > 0 ? `In Stock (${stockQty})` : "Out of Stock";

  return (
    <div className="plant-card" onClick={() => navigate(`/plants/${plant.id}`)}>
      <div className="plant-image">
        <img
  src={plant?.imageUrl || placeholderImg}
  alt={plant?.name ?? "Plant"}
  onError={(e) => {
    e.currentTarget.src = placeholderImg; // if imageUrl is broken
  }}
/>

      </div>

      <div className="plant-info">
        <h3>{plant?.name ?? "Unnamed plant"}</h3>
        <p className="category">{plant?.category ?? "Uncategorized"}</p>
        <p className="price">{priceText}</p>
        <p className="stock">{stockText}</p>
      </div>
    </div>
  );
};

export default PlantCard;
