'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LogIn, ShoppingCart } from 'lucide-react'

// Import old components (correct path)
import Poster from "@/components/Poster"
import Products from "@/components/Products"
import Testimonial from "@/components/Testimonial"
import Choose from "@/components/Choose"
import Design from "@/components/Design"
import NewsletterSection from "@/components/Newsletter"
import Footer from "@/components/Footer"

export default function HomePage() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    alert('Logged out!')
  }

  return (
    <>
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">🪵 WoodZeno</h1>
          
          <div className="flex gap-6 items-center">
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>
            <Link href="/products" className="text-gray-600 hover:text-blue-600 font-medium">Products</Link>
            
            {token ? (
              <>
                <Link href="/cms" className="text-gray-600 hover:text-blue-600 font-medium">CMS</Link>
                <Link href="/orders" className="text-gray-600 hover:text-blue-600 font-medium">Orders</Link>
                <Link href="/cart" className="relative">
                  <ShoppingCart className="text-blue-600" size={24} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium flex items-center gap-2"
              >
                <LogIn size={20} />
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* OLD UI COMPONENTS */}
      <Poster />
      <Products />
      <Choose />
      {/* <Design /> */}
      <Testimonial />
      <NewsletterSection />
      <Footer />
    </>
  )
}