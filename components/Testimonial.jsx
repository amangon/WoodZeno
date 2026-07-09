"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

/* ---------------- DATA ---------------- */
const testimonials = [
  {
    name: "David Rodriguez",
    role: "Architect",
    location: "Dehradun, UK",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=200&q=80",
    message:
      "I've worked with many furniture companies, but this one stands out. The design consultation was thorough and the final result was exactly what I envisioned.",
  },
  {
    name: "Ananya Verma",
    role: "Home Owner",
    location: "Bangalore, India",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    message:
      "The quality and attention to detail were exceptional. The team understood our needs and delivered a beautiful, functional space.",
  },
  {
    name: "Rohit Mehta",
    role: "Business Owner",
    location: "Delhi, India",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    message:
      "Professional from start to finish. The furniture design elevated our workspace and improved overall comfort.",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState("next");
  const [isAnimating, setIsAnimating] = useState(false);

  /* ---------------- AUTOPLAY ---------------- */
  useEffect(() => {
    if (hovered || isAnimating) return;

    const interval = setInterval(() => {
      setDirection("next");
      setIsAnimating(true);

      setTimeout(() => {
        setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [hovered, isAnimating]);

  const prev = () => {
    if (isAnimating) return;
    setDirection("prev");
    setIsAnimating(true);

    setTimeout(() => {
      setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
      setIsAnimating(false);
    }, 300);
  };

  const next = () => {
    if (isAnimating) return;
    setDirection("next");
    setIsAnimating(true);

    setTimeout(() => {
      setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* HEADING */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-6xl font-bold mb-4">
            What Our <span className="text-rose-500">Clients Say</span>
          </h2>
          <p className="text-gray-600">
            Real feedback from homeowners and professionals who trusted us to
            design and furnish their spaces.
          </p>
        </div>

        {/* RATING SUMMARY */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
          {[
            { value: "50K+", label: "Happy Customers" },
            { value: "4.7 / 5", label: "Average Rating" },
            { value: "95%", label: "Customer Satisfaction" },
          ].map((item, i) => (
            <div
              key={i}
              className="text-center border rounded-2xl p-6 hover:scale-110 transition duration-200 hover:shadow-xl"
            >
              <h3 className="text-3xl font-bold text-rose-500">{item.value}</h3>
              <p className="text-sm text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>

        {/* CAROUSEL */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div
            className={`
              bg-white rounded-3xl shadow-lg px-10 py-14 text-center relative
              transition-all duration-200 ease-out
              ${
                isAnimating
                  ? direction === "next"
                    ? "opacity-0 translate-x-8"
                    : "opacity-0 -translate-x-8"
                  : "opacity-100 translate-x-0"
              }
            `}
          >
            {/* QUOTE ICON */}
            <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-rose-100 flex items-center justify-center">
              <Quote className="text-rose-500" size={28} />
            </div>

            {/* MESSAGE */}
            <p className="text-xl leading-relaxed text-gray-800 max-w-3xl mx-auto mb-8">
              “{testimonials[current].message}”
            </p>

            {/* STARS */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="fill-yellow-400 text-yellow-500"
                />
              ))}
            </div>

            {/* USER */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <Image
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>

              <div>
                <p className="font-semibold text-lg">
                  {testimonials[current].name}
                </p>
                <p className="text-sm text-gray-600">
                  {testimonials[current].role}
                </p>
                <p className="text-xs text-gray-500">
                  {testimonials[current].location}
                </p>
              </div>
            </div>

            {/* NAV BUTTONS */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition"
            >
              <ChevronRight />
            </button>
          </div>

          {/* DOTS */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full transition ${
                  current === index ? "bg-rose-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
