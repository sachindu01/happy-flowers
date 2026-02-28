import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useCart } from "../contexts/CartContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card, { CardContent, CardHeader, CardFooter } from "../components/ui/Card";

const centsToMoney = (cents) => Number(cents || 0) / 100;
const formatLKR = (amount) => `LKR ${amount.toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const CheckoutPage = () => {
  const { items, totalCents, clearCart } = useCart();
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
            unitPriceCents,
          };
        }),
        fulfillmentMethod,
        paymentMethod,
        ...(fulfillmentMethod === "DELIVERY" && { deliveryAddress: address }),
      };

      await api.post("/orders", orderData);
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
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <h1 className="text-3xl font-black text-slate-900">Checkout</h1>
        <p className="text-slate-500">Your cart is empty</p>
        <Button onClick={() => navigate('/catalog')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
      <header className="space-y-2">
        <h1 className="text-4xl font-black text-slate-900">Checkout</h1>
        <p className="text-slate-500 font-medium">Complete your order details below.</p>
      </header>

      {error && (
        <div className="bg-rose-50 border border-rose-100 text-rose-600 px-6 py-4 rounded-xl font-bold flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        <div className="lg:col-span-2 space-y-8">
          {/* Fulfillment Section */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-slate-900">1. Fulfillment Method</h2>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className={`
                flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer
                ${fulfillmentMethod === 'DELIVERY'
                  ? 'border-emerald-500 bg-emerald-50/50'
                  : 'border-slate-100 bg-slate-50 hover:border-slate-200'}
              `}>
                <input
                  type="radio"
                  value="DELIVERY"
                  checked={fulfillmentMethod === "DELIVERY"}
                  onChange={(e) => setFulfillmentMethod(e.target.value)}
                  className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 border-slate-300"
                />
                <div className="space-y-0.5">
                  <span className="block font-bold text-slate-900">Home Delivery</span>
                  <span className="block text-xs text-slate-500">Safe island-wide shipping</span>
                </div>
              </label>

              <label className={`
                flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer
                ${fulfillmentMethod === 'PICKUP'
                  ? 'border-emerald-500 bg-emerald-50/50'
                  : 'border-slate-100 bg-slate-50 hover:border-slate-200'}
              `}>
                <input
                  type="radio"
                  value="PICKUP"
                  checked={fulfillmentMethod === "PICKUP"}
                  onChange={(e) => setFulfillmentMethod(e.target.value)}
                  className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 border-slate-300"
                />
                <div className="space-y-0.5">
                  <span className="block font-bold text-slate-900">Self Pickup</span>
                  <span className="block text-xs text-slate-500">Pick at our Colombo nursery</span>
                </div>
              </label>
            </CardContent>
          </Card>

          {/* Address Section */}
          {fulfillmentMethod === "DELIVERY" && (
            <Card className="animate-in slide-in-from-top-4 duration-300">
              <CardHeader>
                <h2 className="text-xl font-bold text-slate-900">2. Delivery Address</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Street Address"
                  placeholder="123 Plant Road"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    placeholder="Colombo"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    required
                  />
                  <Input
                    label="State / Province"
                    placeholder="Western"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    required
                  />
                </div>
                <Input
                  label="ZIP / Postal Code"
                  placeholder="00100"
                  value={address.zip}
                  onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                  required
                />
              </CardContent>
            </Card>
          )}

          {/* Payment Section */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-slate-900">{fulfillmentMethod === "DELIVERY" ? '3' : '2'}. Payment Method</h2>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className={`
                flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer
                ${paymentMethod === 'COD'
                  ? 'border-emerald-500 bg-emerald-50/50'
                  : 'border-slate-100 bg-slate-50 hover:border-slate-200'}
              `}>
                <input
                  type="radio"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 border-slate-300"
                />
                <div className="space-y-0.5">
                  <span className="block font-bold text-slate-900">Cash on Delivery</span>
                  <span className="block text-xs text-slate-500">Pay when you receive</span>
                </div>
              </label>

              <label className={`
                flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer
                ${paymentMethod === 'CARD'
                  ? 'border-emerald-500 bg-emerald-50/50'
                  : 'border-slate-100 bg-slate-50 hover:border-slate-200'}
              `}>
                <input
                  type="radio"
                  value="CARD"
                  checked={paymentMethod === "CARD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 border-slate-300"
                />
                <div className="space-y-0.5">
                  <span className="block font-bold text-slate-900">Card Payment</span>
                  <span className="block text-xs text-slate-500">Online checkout (External)</span>
                </div>
              </label>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 bg-white shadow-xl shadow-slate-200/60 overflow-hidden border-2 border-slate-50">
            <CardHeader className="bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900">Order Summary</h2>
            </CardHeader>
            <CardContent className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
              {items.map((item) => {
                const unitPriceCents = item.unitPriceCents ?? item.plant.priceCents ?? item.plant.price ?? 0;
                const lineTotal = centsToMoney(unitPriceCents) * Number(item.quantity || 1);

                return (
                  <div key={item.plant.id} className="flex justify-between items-start gap-4 text-sm py-2 border-b border-slate-50 last:border-0 font-medium">
                    <div className="space-y-1 flex-1">
                      <p className="text-slate-900 font-bold">{item.plant.name}</p>
                      <p className="text-slate-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-slate-900 font-black">{formatLKR(lineTotal)}</span>
                  </div>
                );
              })}
            </CardContent>
            <CardFooter className="bg-slate-900 text-white p-6 space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Grand Total</span>
                <span className="text-3xl font-black text-emerald-400">{formatLKR(centsToMoney(totalCents))}</span>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-[60px] text-lg bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-black shadow-lg shadow-emerald-500/20"
              >
                {loading ? "Processing..." : "Confirm & Place Order"}
              </Button>
              <div className="flex items-center justify-center gap-2 opacity-50 text-[10px] font-bold uppercase tracking-widest">
                <span>🛡️</span> 100% Secure Checkout
              </div>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
