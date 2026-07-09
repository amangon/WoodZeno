"use client";

import React, { useEffect, useRef, useState } from "react";

const steps = [
  {
    step: "01",
    title: "Consultation",
    description:
      "Understanding your requirements and lifestyle through detailed discussions and site analysis.",
    bg: "bg-blue-50",
    text: "text-blue-600",
    line: "bg-blue-500",
    glow: "group-hover:shadow-blue-400/60",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Creating detailed layouts, mood boards, and 3D visualizations to bring your ideas to life.",
    bg: "bg-green-50",
    text: "text-green-600",
    line: "bg-green-500",
    glow: "group-hover:shadow-green-400/60",
  },
  {
    step: "03",
    title: "Selection",
    description:
      "Choosing the right furniture, materials, and finishes that align with your style and budget.",
    bg: "bg-purple-50",
    text: "text-purple-600",
    line: "bg-purple-500",
    glow: "group-hover:shadow-purple-400/60",
  },
  {
    step: "04",
    title: "Installation",
    description:
      "Professional execution, setup, and final styling to complete your dream space transformation.",
    bg: "bg-orange-50",
    text: "text-orange-600",
    line: "bg-orange-500",
    glow: "group-hover:shadow-orange-400/60",
  },
];

const DesignProcess = () => {
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
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className={`
                group bg-white rounded-2xl border p-10 text-center
                transition-all duration-200
                hover:scale-105 hover:shadow-xl
                ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }
              `}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {/* STEP NUMBER */}
              <div
                className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center font-bold text-xl ${item.bg} ${item.text}`}
              >
                {item.step}
              </div>

              <h3 className="text-lg font-semibold mb-3">{item.title}</h3>

              <p className="text-sm text-gray-600 mb-6">{item.description}</p>

              {/* ACCENT LINE */}
              <div
                className={`
                  w-12 h-1 mx-auto rounded-full
                  ${item.line}
                  transition-all duration-200
                  group-hover:w-16
                  group-hover:shadow-lg
                  ${item.glow}
                `}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignProcess;
