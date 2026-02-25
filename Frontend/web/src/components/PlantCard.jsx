import React from "react";
import { useNavigate } from "react-router-dom";
import placeholderImg from "../assets/placeholder.jpg";
import Card, { CardContent } from "./ui/Card";
import { getFullImageUrl } from "../utils/imageUtils";

const PlantCard = ({ plant }) => {
  const navigate = useNavigate();

  const priceCents = plant?.priceCents;
  const priceText =
    typeof priceCents === "number"
      ? new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(priceCents / 100)
      : "Price unavailable";

  const stockQty = plant?.stockQty ?? 0;
  const inStock = stockQty > 0;

  return (
    <Card
      className="cursor-pointer group flex flex-col h-full"
      onClick={() => navigate(`/plants/${plant.id}`)}
    >
      <div className="relative aspect-[1/1] overflow-hidden bg-slate-100">
        <img
          src={getFullImageUrl(plant?.imageUrl)}
          alt={plant?.name ?? "Plant"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = placeholderImg;
          }}
        />
        {!inStock && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-white/10 text-white border border-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur shadow-sm text-emerald-700 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest">
            {plant?.category ?? "General"}
          </span>
        </div>
      </div>

      <CardContent className="p-4 flex-1 flex flex-col">
        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
          {plant?.name ?? "Unnamed plant"}
        </h3>

        <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-lg font-black text-slate-900">{priceText}</p>
            <p className={`text-[10px] font-bold uppercase tracking-tighter ${inStock ? 'text-emerald-600' : 'text-rose-500'}`}>
              {inStock ? `● ${stockQty} in stock` : '● Sold out'}
            </p>
          </div>
          <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 text-xs">
            →
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlantCard;
