"use client";
import { Globe, Users, Award, Star } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import StatCard from "./StatCard";

const stats = [
  {
    icon: <Globe size={28} />,
    value: 35,
    label: "Countries Served",
    description: "Delivering furniture across the globe with reliability.",
  },
  {
    icon: <Users size={28} />,
    value: 60000,
    label: "Happy Customers",
    description: "Trusted by thousands for comfort and craftsmanship.",
  },
  {
    icon: <Award size={28} />,
    value: 12,
    label: "Years of Experience",
    description: "Decades of expertise in modern furniture design.",
  },
];

const trustStats = [
  { value: "95%", label: "Customer Satisfaction" },
  { value: "24/7", label: "Customer Support" },
  { value: "1200+", label: "Unique Designs" },
  { value: "Free", label: "Global Shipping" },
];

const OurGrowth = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-linear-to-b from-rose-50 via-white to-white"
    >
      <div className="container mx-auto px-4">
        {/* HEADING */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-6xl font-bold text-center mb-4">
            Our <span className="text-rose-500">Growth</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Growth built on trust, quality craftsmanship, and customer
            satisfaction worldwide.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {stats.map((item, index) => (
            <StatCard
              key={index}
              {...item}
              visible={visible}
              delay={`${index * 120}ms`}
            />
          ))}
        </div>

        {/* TRUST SECTION */}
        <div className="mt-20 bg-rose-50 rounded-3xl p-10 md:p-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-4">
              Built on Trust & Quality
            </h3>
            <p className="text-gray-600 mb-6 max-w-xl">
              Every piece we create reflects durability, care, and modern
              living—earning trust from customers worldwide.
            </p>

            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="fill-rose-400 text-rose-400"
                />
              ))}
              <span className="text-sm text-gray-600 ml-2">
                4.7/5 Customer Rating
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {trustStats.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center transition hover:scale-105 hover:shadow-lg"
              >
                <h4 className="text-2xl font-bold text-rose-500 mb-1">
                  {item.value}
                </h4>
                <p className="text-sm text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurGrowth;
