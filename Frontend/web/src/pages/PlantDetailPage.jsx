import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/api";
import { useCart } from "../contexts/CartContext";
import placeholderImg from "../assets/placeholder.jpg";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card, { CardContent } from "../components/ui/Card";
import { getFullImageUrl } from "../utils/imageUtils";

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
        const res = await api.get(`/plants/${id}`);
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

  if (loading) return (
    <div className="flex items-center justify-center p-20 text-slate-500 font-medium">
      <span className="animate-pulse text-lg tracking-widest uppercase">Loading Details...</span>
    </div>
  );

  if (!plant) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
      <h2 className="text-3xl font-black text-slate-900">Plant not found</h2>
      <Button variant="secondary" onClick={() => navigate('/catalog')}>Return to Catalog</Button>
    </div>
  );

  const priceCents = plant?.priceCents;
  const priceText =
    typeof priceCents === "number"
      ? new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(priceCents / 100)
      : "Price unavailable";

  const stockQty = plant?.stockQty ?? 0;
  const inStock = stockQty > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Image Section */}
        <div className="relative group">
          <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/10 border border-slate-100">
            <img
              src={getFullImageUrl(plant?.imageUrl)}
              alt={plant?.name ?? "Plant"}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = placeholderImg;
              }}
            />
          </div>
          {!inStock && (
            <div className="absolute inset-4 bg-white/60 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/40">
              <span className="text-2xl font-black text-slate-900 uppercase tracking-widest">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="space-y-8 py-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {plant?.category ?? "General"}
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${inStock ? 'bg-slate-100 text-slate-600' : 'bg-rose-100 text-rose-600'}`}>
                {inStock ? `${stockQty} available` : "Out of stock"}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
              {plant?.name ?? "Unnamed plant"}
            </h1>
            <p className="text-3xl font-black text-emerald-600">{priceText}</p>
          </div>

          <Card className="bg-slate-50 border-none shadow-none">
            <CardContent className="p-6">
              <p className="text-slate-600 text-lg leading-relaxed">
                {plant?.description || "No description available for this beautiful plant yet. Contact us for more details about its care and features."}
              </p>
            </CardContent>
          </Card>

          {inStock && (
            <div className="space-y-6 pt-4 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row items-end gap-4">
                <div className="w-full sm:w-32">
                  <Input
                    type="number"
                    label="Quantity"
                    min="1"
                    max={stockQty}
                    value={quantity}
                    onChange={(e) => {
                      const v = parseInt(e.target.value, 10) || 1;
                      setQuantity(Math.max(1, Math.min(stockQty, v)));
                    }}
                  />
                </div>
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="w-full flex-1 h-[50px] text-lg"
                >
                  Add to Cart
                </Button>
              </div>
              <p className="text-xs text-slate-400 font-medium">Standard island-wide delivery in 3-5 business days.</p>
            </div>
          )}

          {!inStock && (
            <div className="pt-4 border-t border-slate-100">
              <Button variant="secondary" className="w-full" size="lg" disabled>
                Currently Unavailable
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantDetailPage;
