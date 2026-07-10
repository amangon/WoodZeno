import React from "react";

const Poster = () => {
  return (
    <section
      className="
        bg-cover bg-center bg-[url('/assets/image8.jpg')]
        h-80 sm:h-95 md:h-180
        flex items-start
        pt-20 sm:pt-24 md:pt-32
      "
    >
      <div className="container mx-auto px-4">
        <div className="text-center space-y-3 md:space-y-3">
          <h2 className="text-sm sm:text-sm md:text-2xl text-white uppercase tracking-widest">
            MODERN COLLECTIONS
          </h2>

          <h1 className="font-extrabold text-white text-4xl sm:text-5xl md:text-8xl leading-none">
            COMFORT
          </h1>

          <p className="text-[10px] sm:text-sm md:text-[16px] text-teal-100 max-w-xl mx-auto">
            Furniture designed to bring warmth, balance, and everyday comfort
            into your living spaces.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Poster;
