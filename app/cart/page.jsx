'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Plus, Minus } from 'lucide-react'
import Link from 'next/link'

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState('')
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  })
  const [checkingOut, setCheckingOut] = useState(false)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (!storedToken) {
      router.push('/login')
      return
    }
    setToken(storedToken)
    fetchCart(storedToken)
  }, [router])

  const fetchCart = async (authToken) => {
    try {
      const res = await fetch(`${API_URL}/api/cart`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      })
      const data = await res.json()
      if (data.success) {
        setCartItems(data.cart)
        setTotal(data.total)
      }
    } catch (err) {
      console.error('Error fetching cart:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId)
      return
    }

    try {
      const res = await fetch(`${API_URL}/api/cart/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity })
      })
      const data = await res.json()
      if (data.success) {
        setCartItems(data.cart)
        setTotal(data.total)
      }
    } catch (err) {
      alert('Error updating cart')
    }
  }

  const removeFromCart = async (productId) => {
    try {
      const res = await fetch(`${API_URL}/api/cart/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        setCartItems(data.cart)
        setTotal(data.total)
      }
    } catch (err) {
      alert('Error removing from cart')
    }
  }

  const handleCheckout = async (e) => {
    e.preventDefault()
    
    if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.pincode) {
      alert('Please fill all shipping details')
      return
    }

    setCheckingOut(true)
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ shippingAddress: shippingInfo })
      })
      const data = await res.json()
      if (data.success) {
        alert('Order placed successfully!')
        router.push('/orders')
      }
    } catch (err) {
      alert('Error placing order: ' + err.message)
    } finally {
      setCheckingOut(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-cyan-400">Loading cart...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            WoodZeno
          </Link>
          <div className="flex gap-4">
            <Link href="/products" className="text-slate-300 hover:text-cyan-400 transition">Products</Link>
            <Link href="/orders" className="text-slate-300 hover:text-cyan-400 transition">Orders</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cartItems.length === 0 ? (
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-12 text-center">
                <p className="text-slate-400 mb-6">Your cart is empty</p>
                <Link href="/products" className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg transition inline-block">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.productId} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 flex gap-6">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                      <p className="text-cyan-400 text-xl font-bold mt-2">₹{item.price}</p>
                      
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2 bg-slate-700/50 border border-slate-600 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="p-2 hover:bg-slate-600 transition"
                          >
                            <Minus size={18} className="text-slate-300" />
                          </button>
                          <span className="px-4 text-white font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="p-2 hover:bg-slate-600 transition"
                          >
                            <Plus size={18} className="text-slate-300" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-2 rounded-lg transition"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-slate-400 text-sm">Subtotal</p>
                      <p className="text-white text-xl font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkout */}
          <div className="h-fit">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Checkout</h2>

              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={shippingInfo.name}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400"
                    placeholder="9876543210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Address</label>
                  <input
                    type="text"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">City</label>
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400"
                      placeholder="Delhi"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">State</label>
                    <input
                      type="text"
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                      className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400"
                      placeholder="Delhi"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Pincode</label>
                  <input
                    type="text"
                    value={shippingInfo.pincode}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, pincode: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400"
                    placeholder="110001"
                  />
                </div>

                {cartItems.length > 0 && (
                  <>
                    <div className="border-t border-slate-600 pt-4 mt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-slate-300">Subtotal</span>
                        <span className="text-white font-semibold">₹{total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-slate-300">Shipping</span>
                        <span className="text-green-400">Free</span>
                      </div>
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span className="text-white">Total</span>
                        <span className="text-cyan-400">₹{total.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={checkingOut}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 mt-6"
                    >
                      {checkingOut ? 'Processing...' : 'Place Order'}
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}