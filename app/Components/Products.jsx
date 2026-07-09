/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingBag, Star, StarHalf, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ---------------- COMPONENT ---------------- */
const Products = () => {
  /* ---------------- STATE ---------------- */
  const [wishlist, setWishlist] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");

  /* ---------------- DATA ---------------- */
  const ProductsCollection = [
    {
      id: 1,
      name: "Comfort Dining Chair",
      category: "Chairs",
      price: 1999,
      originalPrice: 2499,
      image: "/assets/chair2.jpg",
      colors: ["#111", "#555", "#2563eb"],
      rating: 4.5,
      badge: "New",
    },
    {
      id: 2,
      name: "Premium Ortho Bed",
      category: "Bed",
      price: 4799,
      originalPrice: 5499,
      image: "/assets/bed.jpg",
      colors: ["#f5f5f4", "#d1d5db"],
      rating: 4,
      badge: "Best Sale",
    },
    {
      id: 3,
      name: "Luxury Office Chair",
      category: "Chairs",
      price: 2599,
      originalPrice: 3999,
      image: "/assets/chair.jpg",
      colors: ["#92400e", "#111", "#d1d5db"],
      rating: 4.5,
      badge: "Trending",
    },
    {
      id: 4,
      name: "Delightful Lamp",
      category: "Lamp",
      price: 1099,
      originalPrice: 2099,
      image: "/assets/lamp2.jpg",
      colors: ["#111", "#d1d5db"],
      rating: 5,
      badge: "New",
    },
    {
      id: 5,
      name: "Classic Comfy Sofa",
      category: "Sofa",
      price: 5499,
      originalPrice: 7999,
      image: "/assets/sofa.jpg",
      colors: ["#78350f", "#111", "#059669"],
      rating: 4,
      badge: "Limited",
    },
    {
      id: 6,
      name: "Office Desk",
      category: "Desk",
      price: 3199,
      originalPrice: 3999,
      image: "/assets/desk.jpg",
      colors: ["#111", "#374151"],
      rating: 4.5,
      badge: "Best Sale",
    },
  ];

  /* ---------------- EFFECTS ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

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
  const filteredProducts = ProductsCollection.filter((p) => {
    const categoryMatch =
      categoryFilter === "All" || p.category === categoryFilter;

    const priceMatch =
      priceFilter === "All" ||
      (priceFilter === "Below 2000" && p.price < 2000) ||
      (priceFilter === "Above 2000" && p.price >= 2000);

    return categoryMatch && priceMatch;
  });

  /* ---------------- SCROLL HANDLER ---------------- */
  const scrollToProducts = () => {
    const section = document.getElementById("products");
    section?.scrollIntoView({ behavior: "smooth" });
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl border p-5 flex flex-col"
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
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow"
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

                <button className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100">
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

      {/* CTA */}
      <div className="flex justify-center mt-16">
        <button
          onClick={scrollToProducts}
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
