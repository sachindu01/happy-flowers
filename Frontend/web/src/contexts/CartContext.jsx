import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

const getUnitPriceCents = (item) => {
  const plant = item.plant;

  // Priority: item.unitPriceCents -> plant.priceCents -> plant.price
  if (typeof item.unitPriceCents === "number") return item.unitPriceCents;
  if (typeof plant?.priceCents === "number") return plant.priceCents;

  // If your backend plant.price is ALREADY cents, keep this:
  if (typeof plant?.price === "number") return plant.price;

  return 0;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addToCart = (plant, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.plant.id === plant.id);

      // store unitPriceCents once (stable total even if plant object changes)
      const unitPriceCents =
        typeof plant?.priceCents === "number"
          ? plant.priceCents
          : typeof plant?.price === "number"
          ? plant.price
          : 0;

      if (existing) {
        return prev.map((i) =>
          i.plant.id === plant.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }

      return [...prev, { plant, quantity, unitPriceCents }];
    });
  };

  const removeFromCart = (plantId) => {
    setItems((prev) => prev.filter((i) => i.plant.id !== plantId));
  };

  const updateQuantity = (plantId, quantity) => {
    const q = Number(quantity);
    if (q <= 0) return removeFromCart(plantId);

    setItems((prev) =>
      prev.map((i) => (i.plant.id === plantId ? { ...i, quantity: q } : i))
    );
  };

  const clearCart = () => setItems([]);

  const totalCents = useMemo(() => {
    return items.reduce((sum, item) => {
      const unit = getUnitPriceCents(item);
      return sum + unit * Number(item.quantity || 1);
    }, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalCents,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
