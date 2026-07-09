"use client";

import React, { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setEmail("");
  };

  return (
    <section
      className="
        relative py-32
        bg-[url('/assets/image2.jpg')]
        bg-cover bg-center
      "
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative container mx-auto px-4">
        {/* HEADER */}
        <div className="text-center text-white max-w-3xl mx-auto mb-16">
          <h2 className="text-6xl md:text-6xl text-center font-bold mb-4">
            Stay <span className="text-rose-500">Inspired</span>
          </h2>
          <p className="text-gray-200">
            Get curated interior ideas, furniture highlights, and design
            insights crafted to elevate modern living spaces.
          </p>
        </div>

        {/* GLASS CARD */}
        <div
          className="
            max-w-4xl mx-auto
            rounded-3xl
            px-8 md:px-16 py-14
            text-center
            backdrop-blur-xl
            bg-white
            border border-white/30
            shadow-2xl
          "
        >
          {/* ICON */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-rose-100 flex items-center justify-center">
            <Mail className="text-rose-500" size={28} />
          </div>

          {/* TITLE */}
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
            Join Our Design Circle
          </h3>

          {/* DESCRIPTION */}
          <p className="text-gray-600 mb-10 max-w-xl mx-auto">
            Be the first to discover new collections, thoughtful design stories,
            and exclusive member-only offers—delivered occasionally, never
            overwhelming.
          </p>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="
                flex-1 px-5 py-4 rounded-full
                bg-white/80
                border border-gray-200
                focus:outline-none
                focus:ring-2 focus:ring-rose-400
              "
            />

            <button
              type="submit"
              className="
                flex items-center justify-center gap-2
                px-8 py-4 rounded-full
                bg-rose-500 text-white
                transition-all duration-300
                hover:scale-105 hover:drop-shadow-xl
              "
            >
              Subscribe
              <ArrowRight size={18} />
            </button>
          </form>

          {/* TRUST NOTE */}
          <p className="text-xs text-gray-500 mt-6">
            No spam. Unsubscribe anytime. Your privacy always comes first.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
