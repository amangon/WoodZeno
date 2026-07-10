"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Sparkles, CheckCircle, Shield, Clock } from "lucide-react";
import DesignProcess from "./DesignProcess";

/* ---------------- Counter Hook ---------------- */
const useCountUp = (end, start) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    const duration = 1200;
    const startTime = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [end, start]);

  return count;
};

const Design = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  /* ---------------- Scroll Trigger ---------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  const counterRef = useRef(null);
  const [counterVisible, setCounterVisible] = useState(false);
  const projects = useCountUp(1200, counterVisible);
  const clients = useCountUp(500, counterVisible);
  const years = useCountUp(15, counterVisible);



useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setCounterVisible(true);
        observer.disconnect(); // run once
      }
    },
    {
      threshold: 0.15, // mobile-safe
      rootMargin: "0px 0px -100px 0px",
    },
  );

  if (counterRef.current) observer.observe(counterRef.current);

  return () => observer.disconnect();
}, []);



  return (
    <section ref={sectionRef} className="py-10 bg-white">
      <div className="container mx-auto px-4">
        {/* TOP BADGE */}
        <div className="flex justify-center mb-4">
          <span className="px-4 py-1 text-sm rounded-full bg-rose-100 text-rose-600">
            🎨 Interior Design Solutions
          </span>
        </div>

        {/* HEADING */}
        <div
          className={`
    text-center mb-10 md:mb-16
    transition-all duration-700
    ${
      visible
        ? "opacity-100 translate-y-0"
        : "opacity-100 md:opacity-0 md:translate-y-8"
    }
  `}
        >
          <h2 className="text-6xl font-bold text-center mb-4">
            Our Interior <span className="text-rose-500">Design</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We design modern, functional interiors that elevate everyday living
            through thoughtful planning and execution.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT CONTENT */}
          <div>
            <h3 className="text-3xl font-bold mb-4">
              Designed Around Your Lifestyle
            </h3>

            <p className="text-gray-600 mb-8">
              From concept to completion, our design process focuses on
              aesthetics, comfort, and long-term functionality.
            </p>

            {/* FEATURES */}
            <div
              ref={counterRef}
              className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-3 gap-6 mb-10"
            >
              {[
                {
                  icon: <Sparkles className="text-rose-500" />,
                  title: "Personalized Design",
                  desc: "Tailored layouts that reflect your taste.",
                },
                {
                  icon: <CheckCircle className="text-rose-500" />,
                  title: "Complete Service",
                  desc: "From planning to final installation.",
                },
                {
                  icon: <Shield className="text-rose-500" />,
                  title: "Premium Quality",
                  desc: "High-grade materials and finishes.",
                },
                {
                  icon: <Clock className="text-rose-500" />,
                  title: "Timely Delivery",
                  desc: "Projects completed on schedule.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-xl bg-gray-50 transition hover:scale-105 hover:shadow-md"
                >
                  {item.icon}
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* COUNTERS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {/* PROJECTS */}
              <div
                className="
      bg-white border rounded-2xl p-6 text-center
      transition-all duration-300
      hover:scale-110 hover:shadow-xl
    "
              >
                <h4 className="text-3xl font-bold text-rose-500 mb-1">
                  {projects}+
                </h4>
                <p className="text-sm text-gray-600">Projects</p>
              </div>

              {/* CLIENTS */}
              <div
                className="
      bg-white border rounded-2xl p-6 text-center
      transition-all duration-300
      hover:scale-110 hover:shadow-xl
    "
              >
                <h4 className="text-3xl font-bold text-rose-500 mb-1">
                  {clients}+
                </h4>
                <p className="text-sm text-gray-600">Clients</p>
              </div>

              {/* YEARS */}
              <div
                className="
      bg-white border rounded-2xl p-6 text-center
      transition-all duration-300
      hover:scale-110 hover:shadow-xl"
              >
                <h4 className="text-3xl font-bold text-rose-500 mb-1">
                  {years}+
                </h4>
                <p className="text-sm text-gray-600">Years Experience</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-rose-500 text-white rounded-full transition hover:scale-105 hover:bg-rose-700 hover:text-white hover:drop-shadow-xl">
                Schedule Consultation →
              </button>
              <button className="px-6 py-3 border rounded-full hover:bg-gray-100 hover:text-black">
                View Portfolio
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE GRID */}
          <div className="grid grid-cols-2 gap-6">
            <div className="row-span-2 rounded-2xl overflow-hidden shadow">
              <Image
                src="/assets/bed2.jpg"
                alt="Interior Design"
                width={600}
                height={800}
                className="object-cover w-full h-full hover:scale-110 transition"
              />
            </div>

            <div className="rounded-2xl overflow-hidden shadow">
              <Image
                src="/assets/image7.jpg"
                alt="Interior Design"
                width={600}
                height={500}
                className="object-cover w-full h-full hover:scale-110 transition"
              />
            </div>

            <div className="rounded-2xl overflow-hidden shadow">
              <Image
                src="/assets/image3.jpg"
                alt="Interior Design"
                width={600}
                height={500}
                className="object-cover w-full h-full hover:scale-110 transition"
              />
            </div>

            <div className="col-span-2 rounded-2xl overflow-hidden shadow">
              <Image
                src="/assets/image5.jpg"
                alt="Interior Design"
                width={800}
                height={400}
                className="object-cover w-full h-full hover:scale-110 transition"
              />
            </div>
          </div>
        </div>
      </div>
      <DesignProcess />
    </section>
  );
};

export default Design;
