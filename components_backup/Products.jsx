"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { ShoppingBag, Star, StarHalf, Heart, Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ---------------- COMPONENT ---------------- */
const Products = () => {
  /* ---------------- STATE ---------------- */
  const [wishlist, setWishlist] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  /* ---------------- EFFECTS ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "/api/products",
          { cache: "no-store" }
        );
        const data = await res.json();
        if (active) setProducts(Array.isArray(data) ? data : []);

      } catch {
        if (active) setProducts([]);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);


  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  /* ---------------- CART HELPERS ---------------- */
  const getCartQty = (id) => cart.find((x) => x.id === id)?.qty ?? 0;

  const upsertCart = (id, qtyDelta) => {
    setCart((prev) => {
      const cur = prev.find((x) => x.id === id);
      if (!cur) return [...prev, { id, qty: Math.max(1, qtyDelta) }];

      const nextQty = cur.qty + qtyDelta;
      if (nextQty <= 0) return prev.filter((x) => x.id !== id);

      return prev.map((x) => (x.id === id ? { ...x, qty: nextQty } : x));
    });
  };

  const cartLines = useMemo(() => {
    return cart
      .map((c) => {
        const p = products.find((pp) => pp.id === c.id);
        if (!p) return null;
        return { ...p, qty: c.qty, lineTotal: (p.price ?? 0) * c.qty };
      })
      .filter(Boolean);
  }, [cart, products]);

  const cartSubtotal = useMemo(() => {
    return cartLines.reduce((s, l) => s + (l?.lineTotal ?? 0), 0);
  }, [cartLines]);

  /* ---------------- HELPERS ---------------- */
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "New":
        return "bg-emerald-600";
      case "Best Sale":
        return "bg-amber-600";
      case "Trending":
        return "bg-indigo-600";
      case "Limited":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;

    return (
      <>
        {[...Array(full)].map((_, i) => (
          <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
        ))}
        {half && (
          <StarHalf size={14} className="fill-yellow-400 text-yellow-400" />
        )}
      </>
    );
  };

  const calculateSave = (price, original) =>
    Math.round(((original - price) / original) * 100);

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredProducts = products.filter((p) => {
    const categoryMatch =
      categoryFilter === "All" || p.category === categoryFilter;

    const priceMatch =
      priceFilter === "All" ||
      (priceFilter === "Below 2000" && p.price < 2000) ||
      (priceFilter === "Above 2000" && p.price >= 2000);

    return categoryMatch && priceMatch;
  });


  /* ---------------- SCROLL HANDLER ---------------- */
  const [selectedId, setSelectedId] = useState(null);

  const openCart = () => {
    setCartOpen(true);
    // focus pulse already handled in scrollToProducts
  };

  const addToCartAndOpen = (product) => {
    if (!product) return;
    upsertCart(product.id, 1);
    scrollToProducts(product.id);
    openCart();
  };

  const scrollToProducts = (id) => {
    if (typeof id !== "undefined") setSelectedId(id);

    const section = document.getElementById("products");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });

    if (typeof id !== "undefined") {
      // small pulse for “real feel”
      setTimeout(() => setSelectedId((cur) => (cur === id ? null : cur)), 1600);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <section id="products" className="container mx-auto px-4 py-16">
      <h2 className="text-6xl font-bold text-center mb-3">
        Our <span className="text-rose-500">Products</span>
      </h2>

      <p className="text-md mb-10 text-center line-clamp-2 max-w-2xl mx-auto">
        Explore furniture designed with a balance of comfort, quality, and
        contemporary design—made to fit seamlessly into modern homes.
      </p>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        <select
          className="border rounded-lg px-4 py-2"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Chairs">Chairs</option>
          <option value="Bed">Bed</option>
          <option value="Lamp">Lamp</option>
          <option value="Sofa">Sofa</option>
          <option value="Desk">Desk</option>
        </select>

        <select
          className="border rounded-lg px-4 py-2"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="All">All Prices</option>
          <option value="Below 2000">Below ₹2000</option>
          <option value="Above 2000">Above ₹2000</option>
        </select>
      </div>

      {/* GRID */}
      {loading ? (
        <div className="text-center text-gray-600 py-16">Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
          <div
            key={product.id}
            role="button"
            tabIndex={0}
            onClick={() => scrollToProducts(product.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") scrollToProducts(product.id);
            }}
            className={`bg-white rounded-xl border p-5 flex flex-col transition-all ${
              selectedId === product.id ? "ring-2 ring-rose-500 scale-[1.01]" : ""
            }`}
          >
            {/* IMAGE */}
              <div className="relative h-80 rounded-lg overflow-hidden group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <Badge
                className={`absolute top-3 left-3 text-white ${getBadgeColor(
                  product.badge
                )}`}
              >
                {product.badge}
              </Badge>

              <button
                onClick={(ev) => {
                  ev.stopPropagation();
                  toggleWishlist(product.id);
                }}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart
                  size={16}
                  className={
                    wishlist.includes(product.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-500"
                  }
                />
              </button>
            </div>

            {/* CONTENT */}
            <div className="mt-4 space-y-3 flex-1">
              <span className="text-xs uppercase tracking-wide text-gray-500">
                {product.category}
              </span>

              <div className="flex items-center gap-2 text-sm">
                <div className="flex gap-1">{renderStars(product.rating)}</div>
                <span className="text-gray-500">({product.rating})</span>
              </div>

              <h3 className="text-lg font-semibold">{product.name}</h3>

              <div className="flex gap-2">
                {product.colors.map((c, i) => (
                  <span
                    key={i}
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <div className="text-xl font-bold">₹ {product.price}</div>
                  <div className="text-sm text-gray-400 line-through">
                    ₹ {product.originalPrice}
                  </div>
                </div>

                <button
                  className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    addToCartAndOpen(product);
                  }}
                  aria-label="Add to cart"
                  title="Add to cart"
                >
                  <ShoppingBag size={18} />
                </button>
              </div>

              <Badge className="bg-green-100 text-green-700">
                Save {calculateSave(product.price, product.originalPrice)}%
              </Badge>

              <div className="flex justify-between text-xs text-gray-500">
                <span className="text-green-600">● Free Shipping</span>
                <span className="text-blue-600">● 30-Day Return</span>
              </div>
            </div>
          </div>
          ))}
        </div>
      )}

      {/* CART DRAWER */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40"
          onClick={() => setCartOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl p-5"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Cart"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-extrabold">Your Cart</h3>
                <p className="text-sm text-gray-500">
                  {cartLines.length ? `${cartLines.length} items` : "Cart is empty"}
                </p>
              </div>
              <button
                className="px-3 py-1 rounded-md border hover:bg-gray-50 text-sm"
                onClick={() => setCartOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="mt-4 space-y-3 overflow-auto max-h-[70vh] pr-1">
              {cartLines.length === 0 ? (
                <div className="text-sm text-gray-500">
                  Add products to see order UI here.
                </div>
              ) : (
                cartLines.map((l) => (
                  <div
                    key={l.id}
                    className="flex items-center gap-3 rounded-xl border p-3"
                  >
                    <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-gray-50">
                      <Image
                        src={l.image}
                        alt={l.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate">{l.name}</div>
                      <div className="text-xs text-gray-500">{l.category}</div>
                      <div className="text-sm font-bold">₹ {l.lineTotal}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-gray-50"
                        onClick={() => upsertCart(l.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <div className="w-8 text-center font-semibold">{l.qty}</div>
                      <button
                        className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-gray-50"
                        onClick={() => upsertCart(l.id, 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">Subtotal</div>
                <div className="text-lg font-extrabold">₹ {cartSubtotal}</div>
              </div>

              <button
                className="mt-4 w-full px-4 py-3 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 transition disabled:opacity-60"
                disabled={cartLines.length === 0}
                onClick={() => {
                  // No checkout page exists currently; keep it realistic by scrolling to products.
                  setCartOpen(false);
                  const first = cartLines[0];
                  scrollToProducts(first?.id);
                }}
              >
                Proceed to Checkout
              </button>

              <div className="mt-2 text-xs text-gray-500">
                Checkout flow not implemented yet. This drawer matches Amazon-like order feel.
              </div>
            </div>
          </div>
        </div>
      )}
      {/* CTA */}
      <div className="flex justify-center mt-16">
        <button
          onClick={() => scrollToProducts()}
          className="px-8 py-3 rounded-full bg-rose-500 text-white
                     hover:bg-rose-700 hover:scale-105
                     hover:shadow-md hover:shadow-rose-500/60
                     transition-all cursor-pointer"
        >
          View All Products
        </button>
      </div>
    </section>
  );
};

export default Products;
