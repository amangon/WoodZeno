"use client";

import React, { useEffect, useMemo, useState } from "react";
import "./cms.css";

function toNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export default function Cms() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    name: "",
    type: "Chairs",
    origin: "",
    color: "#111",
    density: "2500",
    pricePerUnit: "1999",
    // Using `description` as the image URL/path field for the existing API shape.
    description: "/assets/chair2.jpg",
    available: true,
  });

  const [imageSource, setImageSource] = useState("url"); // 'url' | 'google'

  const [refreshTick, setRefreshTick] = useState(0);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "/api/products",
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);

    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshTick]);

  const colorsPreview = useMemo(() => {
    // keep UI small: interpret color as single value
    return form.color ? [form.color] : [];
  }, [form.color]);

  const handleAdd = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      category: form.type,
      price: Number(form.pricePerUnit) || 0,
      originalPrice: Number(form.density) || 0,
      image: form.description || "/assets/image.jpg",
      colors: form.color
        ? form.color.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      rating: 4.5,
      badge: "New",
    };

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to add product");
      }
      await res.json();
      setForm({
        name: "",
        type: "Chairs",
        origin: "",
        color: "#111",
        density: "2500",
        pricePerUnit: "1999",
        description: "/assets/chair2.jpg",
        available: true,
      });
      setRefreshTick((t) => t + 1);
    } catch (e2) {
      setError(e2.message || String(e2));
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    if (!confirm(`Remove product id ${id}?`)) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to delete");
      }
      await res.json();
      setRefreshTick((t) => t + 1);
    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    const ok = confirm(`Edit product id ${id}?`);
    if (!ok) return;

    setLoading(true);
    setError(null);
    try {
      const payload = {
        name: form.name,
        category: form.type,
        price: Number(form.pricePerUnit) || 0,
        originalPrice: Number(form.density) || 0,
        image: form.description || "/assets/image.jpg",
        colors: form.color
          ? form.color
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        rating: 4.5,
        badge: "New",
      };

      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to update");
      }
      await res.json();
      setRefreshTick((t) => t + 1);

      setForm({
        name: "",
        type: "Chairs",
        origin: "",
        color: "#111",
        density: "2500",
        pricePerUnit: "1999",
        description: "/assets/chair2.jpg",
        available: true,
      });
    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cmsContainer">
      <h1 className="cmsTitle">
        CMS <span style={{ color: "#f43f5e" }}>Products</span>
      </h1>

      <div className="cmsGrid">
        <div className="cmsCard">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h2 className="text-2xl font-extrabold">Manage Products</h2>
            <div className="cmsActions">
              <button
                type="button"
                onClick={() => setRefreshTick((t) => t + 1)}
                className="btnRose"
                disabled={loading}
              >
                {loading ? "Loading..." : "Refresh"}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="productList">
            {products.length === 0 && !loading && (
              <div className="cmsHint">No products available.</div>
            )}

            {products.map((p) => (
              <div key={p.id ?? p._id} className="productRow">
                <div className="thumb">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt={p.name} />
                  ) : null}
                </div>

                <div className="productMeta">
                  <div className="productName">{p.name}</div>
                <div className="productSub">
                    ID: {p.id ?? ""} • Category: {p.category}
                  </div>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    <span
                      className="badgeSmall"
                      style={{ background: "#ecfccb", color: "#365314" }}
                    >
                      {p.price ? `₹ ${p.price}` : ""}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                    <button
                      type="button"
                      className="btnRose"
                      onClick={() => {
                        const pid = p.id ?? p._id;
                        const img = p.image ?? "/assets/chair2.jpg";
                        setForm({
                          name: p.name ?? "",
                          type: p.category ?? "Chairs",
                          origin: p.origin ?? "",
                          color: Array.isArray(p.colors) ? (p.colors[0] ?? "#111") : "#111",
                          density: String(p.originalPrice ?? 2500),
                          pricePerUnit: String(p.price ?? 1999),
                          description: img,
                          available: true,
                        });
                        // Heuristic: if it's a full http(s) URL, assume google-link mode.
                        setImageSource(/^https?:\/\//i.test(img) ? "google" : "url");
                        handleEdit(pid);
                      }}
                      disabled={loading}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="btnDanger"
                      onClick={() => handleRemove(p.id ?? p._id)}
                      disabled={loading}
                    >
                      Remove
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>

            <div className="cmsCard">
          <h2 className="text-2xl font-extrabold">Add Product</h2>
          <p className="cmsHint">
            UI match: same rose theme + clean cards. Image is URL/path (e.g. /assets/chair2.jpg).
          </p>

          <form onSubmit={handleAdd} className="mt-4 flex flex-col gap-4">
            <div className="field">
              <label>Name</label>
              <input
                className="input"
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="field">
                <label>Type</label>
                <input
                  className="input"
                  value={form.type}
                  onChange={(e) => setForm((s) => ({ ...s, type: e.target.value }))}
                  required
                />
              </div>
              <div className="field">
                <label>Origin</label>
                <input
                  className="input"
                  value={form.origin}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, origin: e.target.value }))
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="field">
                <label>Colors (comma separated hex or values)</label>
                <input
                  className="input"
                  value={form.color}
                  onChange={(e) => setForm((s) => ({ ...s, color: e.target.value }))}
                />
                <div className="mt-2 flex gap-2 flex-wrap">
                  {colorsPreview.map((c, i) => (
                    <span
                      key={i}
                      title={c}
                      style={{ width: 18, height: 18, borderRadius: 999, backgroundColor: c, border: "1px solid rgba(15,23,42,.15)" }}
                    />
                  ))}
                </div>
              </div>
              <div className="field">
                <label>Density</label>
                <input
                  className="input"
                  value={form.density}
                  onChange={(e) => setForm((s) => ({ ...s, density: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="field">
                <label>Price Per Unit</label>
                <input
                  className="input"
                  value={form.pricePerUnit}
                  onChange={(e) => setForm((s) => ({ ...s, pricePerUnit: e.target.value }))}
                  required
                />
              </div>
              <div className="field">
                <label>Available</label>
                <select
                  className="input"
                  value={String(form.available)}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, available: e.target.value === "true" }))
                  }
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label>Product Image</label>

              <select
                className="input"
                value={imageSource}
                onChange={(e) => setImageSource(e.target.value)}
              >
                <option value="url">Path / URL (e.g. /assets/chair2.jpg)</option>
                <option value="google">Google Image Link (paste image URL)</option>
              </select>

              <div className="mt-2">
                <input
                  className="input"
                  value={form.description}
                  placeholder={
                    imageSource === "google"
                      ? "Paste Google image direct URL (ends with .jpg/.png/webp) ..."
                      : "Enter image path or direct URL (e.g. /assets/chair2.jpg) ..."
                  }
                  onChange={(e) =>
                    setForm((s) => ({ ...s, description: e.target.value }))
                  }
                />
              </div>

              <div className="mt-2 text-xs text-slate-500">
                Stored as <span className="font-semibold">product.image</span>. Preview uses this value.
              </div>
            </div>


            <button
              type="submit"
              className="btnRose"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

