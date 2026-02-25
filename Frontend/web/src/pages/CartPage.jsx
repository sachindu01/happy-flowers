import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import placeholderImg from "../assets/placeholder.jpg";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card, { CardContent } from "../components/ui/Card";
import { getFullImageUrl } from "../utils/imageUtils";

const centsToMoney = (cents) => Number(cents || 0) / 100;

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, totalCents } = useCart();
  const navigate = useNavigate();

  if (!items || items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="text-6xl text-slate-200">🛒</div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900">Your cart is empty</h1>
          <p className="text-slate-500">Looks like you haven't added any plants yet.</p>
        </div>
        <Button onClick={() => navigate('/catalog')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
      <header>
        <h1 className="text-4xl font-black text-slate-900">Shopping Cart</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => {
            const plant = item.plant;
            const unitPriceCents = item.unitPriceCents ?? plant.priceCents ?? plant.price ?? 0;
            const unitPrice = centsToMoney(unitPriceCents);
            const qty = Number(item.quantity || 1);

            return (
              <Card key={plant.id} className="group transition-all hover:border-emerald-100">
                <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                    <img
                      src={getFullImageUrl(plant.imageUrl)}
                      alt={plant.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = placeholderImg;
                      }}
                    />
                  </div>

                  <div className="flex-1 space-y-1 text-center sm:text-left">
                    <h3 className="text-xl font-bold text-slate-900">{plant.name}</h3>
                    <p className="text-emerald-600 font-bold">${unitPrice.toFixed(2)} / unit</p>
                    <button
                      onClick={() => removeFromCart(plant.id)}
                      className="text-sm font-semibold text-rose-500 hover:text-rose-600 transition-colors pt-2"
                    >
                      Remove item
                    </button>
                  </div>

                  <div className="flex flex-col items-center sm:items-end gap-3 w-full sm:w-auto">
                    <div className="w-24">
                      <Input
                        type="number"
                        min="1"
                        max={plant.stockQty}
                        value={qty}
                        onChange={(e) =>
                          updateQuantity(plant.id, parseInt(e.target.value, 10) || 1)
                        }
                      />
                    </div>
                    <p className="text-xl font-black text-slate-900">
                      ${(unitPrice * qty).toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24 bg-slate-900 text-white border-none shadow-xl shadow-emerald-900/20">
            <CardContent className="p-8 space-y-8">
              <h2 className="text-2xl font-bold border-b border-white/10 pb-4">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>${centsToMoney(totalCents).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Delivery</span>
                  <span className="text-emerald-400 font-bold italic">FREE</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-3xl font-black text-emerald-400">
                    ${centsToMoney(totalCents).toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => navigate("/checkout")}
                className="w-full h-[60px] text-lg bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-black shadow-lg shadow-emerald-500/20"
              >
                Proceed to Checkout
              </Button>

              <p className="text-[11px] text-center text-slate-400 uppercase tracking-widest font-bold">
                Secure SSL Encryption Enabled
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
