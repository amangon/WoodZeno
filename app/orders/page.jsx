'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

export default function OrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState('')
  const [expandedOrder, setExpandedOrder] = useState(null)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (!storedToken) {
      router.push('/login')
      return
    }
    setToken(storedToken)
    fetchOrders(storedToken)
  }, [router])

  const fetchOrders = async (authToken) => {
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      })
      const data = await res.json()
      if (data.success) {
        setOrders(data.orders)
      }
    } catch (err) {
      console.error('Error fetching orders:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered':
        return 'bg-green-500/20 text-green-400 border-green-500/50'
      case 'shipped':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50'
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
      case 'confirmed':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/50'
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/50'
    }
  }

  const getPaymentStatusColor = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400'
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400'
      default:
        return 'bg-red-500/20 text-red-400'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-cyan-400">Loading orders...</div>
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
            <Link href="/cart" className="text-slate-300 hover:text-cyan-400 transition">Cart</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-12 text-center">
            <p className="text-slate-400 mb-6">You haven't placed any orders yet</p>
            <Link href="/products" className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg transition inline-block">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl overflow-hidden">
                {/* Order Header */}
                <button
                  onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                  className="w-full p-6 flex justify-between items-center hover:bg-slate-700/20 transition"
                >
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div>
                        <p className="text-sm text-slate-400">Order ID</p>
                        <p className="text-white font-mono">{order._id.slice(-8)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Date</p>
                        <p className="text-white">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Total</p>
                        <p className="text-cyan-400 font-bold">₹{order.totalPrice.toFixed(2)}</p>
                      </div>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown 
                    className={`text-slate-400 transition ${expandedOrder === order._id ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Order Details (Expandable) */}
                {expandedOrder === order._id && (
                  <div className="border-t border-slate-700/50 p-6 bg-slate-700/10">
                    {/* Payment Status */}
                    <div className="mb-6">
                      <p className="text-sm text-slate-400 mb-2">Payment Status</p>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </div>

                    {/* Shipping Address */}
                    <div className="mb-6">
                      <p className="text-sm text-slate-400 mb-3 font-semibold">Shipping Address</p>
                      <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                        <p className="text-white font-semibold">{order.shippingAddress?.name}</p>
                        <p className="text-slate-400 text-sm mt-1">{order.shippingAddress?.address}</p>
                        <p className="text-slate-400 text-sm">
                          {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pincode}
                        </p>
                        <p className="text-slate-400 text-sm">Phone: {order.shippingAddress?.phone}</p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-6">
                      <p className="text-sm text-slate-400 mb-3 font-semibold">Items</p>
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 flex justify-between items-center">
                            <div>
                              <p className="text-white font-semibold">{item.name}</p>
                              <p className="text-slate-400 text-sm">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-cyan-400 font-bold">₹{item.price}</p>
                              <p className="text-slate-400 text-sm">₹{(item.price * item.quantity).toFixed(2)} total</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Timeline */}
                    <div className="mb-6">
                      <p className="text-sm text-slate-400 mb-3 font-semibold">Order Timeline</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex gap-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="text-white font-semibold">Order Placed</p>
                            <p className="text-slate-400">{new Date(order.createdAt).toLocaleString()}</p>
                          </div>
                        </div>
                        {['confirmed', 'shipped', 'delivered'].includes(order.status) && (
                          <div className="flex gap-3">
                            <div className={`w-2 h-2 ${order.status !== 'pending' ? 'bg-blue-400' : 'bg-slate-600'} rounded-full mt-2 flex-shrink-0`}></div>
                            <div>
                              <p className="text-white font-semibold">Order Confirmed</p>
                              <p className="text-slate-400">{new Date(order.updatedAt).toLocaleString()}</p>
                            </div>
                          </div>
                        )}
                        {['shipped', 'delivered'].includes(order.status) && (
                          <div className="flex gap-3">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="text-white font-semibold">Order Shipped</p>
                              <p className="text-slate-400">In Transit</p>
                            </div>
                          </div>
                        )}
                        {order.status === 'delivered' && (
                          <div className="flex gap-3">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="text-white font-semibold">Delivered</p>
                              <p className="text-slate-400">Order completed</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price Summary */}
                    <div className="border-t border-slate-600 pt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-400">Subtotal</span>
                        <span className="text-white">₹{order.totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-400">Shipping</span>
                        <span className="text-green-400">Free</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t border-slate-600 pt-4">
                        <span className="text-white">Total</span>
                        <span className="text-cyan-400">₹{order.totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}