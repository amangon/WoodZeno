'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, ArrowLeft, Star } from 'lucide-react'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)

    // Load products
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading products:', err)
        setLoading(false)
      })
  }, [])

  const handleAddToCart = (product) => {
    if (!token) {
      alert('Please login first!')
      return
    }
    alert(`${product.name} added to cart!`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-cyan-400 text-xl">Loading products...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            🪵 WoodZeno
          </h1>
          <nav className="flex gap-6 items-center">
            <Link href="/" className="text-slate-300 hover:text-cyan-400 transition">Home</Link>
            <Link href="/cart" className="text-slate-300 hover:text-cyan-400 transition">Cart</Link>
            <Link href="/login" className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition">Login</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Link href="/" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8">
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        {/* Title */}
        <h2 className="text-4xl font-bold text-white mb-2">All Products</h2>
        <p className="text-slate-400 mb-8">Browse our complete collection of premium wood products</p>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="group bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl overflow-hidden hover:border-cyan-400/50 transition duration-300">
              {/* Product Image */}
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 h-48 flex items-center justify-center overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <span className="text-xs bg-slate-700 text-slate-300 px-3 py-1 rounded-full">
                    Stock: {product.stock}
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>

                {/* Description */}
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-slate-400 text-xs">({product.reviews} reviews)</span>
                </div>

                {/* Price & Add to Cart */}
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-cyan-400">₹{product.price}</div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 p-3 rounded-lg transition border border-cyan-500/50"
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No products found</p>
          </div>
        )}
      </div>
    </div>
  )
}