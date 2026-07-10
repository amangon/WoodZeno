"use client";

import React, { useState } from "react";
import Footer from "../Components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    // Fast: frontend-only success for now.
    // If you want Postman-backed contact API too, I can add it similarly to products.
    await new Promise((r) => setTimeout(r, 500));
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <>
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-end gap-4 mb-6">
            <a
              href="/cms"
              className="px-4 py-2 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 transition"
            >
              CMS
            </a>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-6">
            Contact <span className="text-rose-500">Us</span>
          </h1>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
            Send your requirements and we’ll get back to you.
          </p>

          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white border rounded-2xl p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <label className="block">
                <span className="text-sm text-gray-600">Name</span>
                <input
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="mt-2 w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-rose-400"
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm text-gray-600">Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  className="mt-2 w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-rose-400"
                  required
                />
              </label>
            </div>

            <label className="block mt-5">
              <span className="text-sm text-gray-600">Message</span>
              <textarea
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                rows={6}
                className="mt-2 w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-rose-400"
                required
              />
            </label>

            <button
              disabled={status === "sending"}
              className="mt-8 w-full bg-rose-500 text-white py-3 rounded-full font-semibold hover:bg-rose-600 transition disabled:opacity-60"
              type="submit"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "sent" && (
              <p className="mt-4 text-center text-emerald-600">
                Message sent successfully.
              </p>
            )}
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

