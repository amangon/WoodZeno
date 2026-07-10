"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Choose from "../Components/Choose";
import Design from "../Components/Design";
import Footer from "../Components/Footer";
import NewsletterSection from "../Components/Newsletter";
import Poster from "../Components/Poster";
import Products from "../Components/Products";
import Testimonial from "../Components/Testimonial";

export default function HomePage() {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href="/auth/login";
  };

  return (
    <>

      <nav className="w-full bg-white shadow-md sticky top-0 z-50">

        <div className="max-w-7xl mx-auto flex justify-between items-center p-5">

          <h1 className="text-3xl font-bold">
            WoodZeno
          </h1>

          <div className="flex gap-4">

            <Link href="/">Home</Link>

            <Link href="/products">Products</Link>

            <Link href="/about">About</Link>

            <Link href="/contact">Contact</Link>

            {loggedIn ? (
              <>
                <Link
                  href="/cms"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  CMS
                </Link>

                <button
                  onClick={logout}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  Login
                </Link>

                <Link
                  href="/auth/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Register
                </Link>
              </>
            )}

          </div>

        </div>

      </nav>

      <Poster />
      <Products />
      <Choose />
      <Design />
      <Testimonial />
      <NewsletterSection />
      <Footer />

    </>
  );
}
