"use client";
import React, { useEffect, useState } from "react";

const StatCard = ({ icon, value, label, description, visible, delay }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;

    const duration = 1200;
    const startTime = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [value, visible]);

  return (
    <div
      className={`
        bg-white rounded-2xl border p-18 text-center group
        transition-all duration-500
        hover:scale-110 hover:shadow-xl
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
      style={{ transitionDelay: delay }}
    >
      <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full bg-rose-100 text-rose-500 transition-transform group-hover:rotate-6">
        {icon}
      </div>

      <h3 className="text-4xl font-bold mb-2 text-gray-900 group-hover:text-rose-500 transition-colors">
        {count.toLocaleString()}
        <span className="text-rose-500">+</span>
      </h3>

      <p className="font-semibold mb-2">{label}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default StatCard;
