'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Edit2, Plus } from 'lucide-react'

export default function CMSPage() {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState('products')
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState('')
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Hardwood',
    stock: '',
    image: ''
  })

  const [editingId, setEditingId] = useState(null)

 useEffect(() => {
  const storedToken = localStorage.getItem("token");

  if (!storedToken) {
    router.replace("/auth/login");
    return;
  }

  setToken(storedToken);
  fetchProducts(storedToken);
  fetchOrders(storedToken);
}, []);

  const fetchProducts = async (authToken) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      })
      const data = await res.json()
      if (data.success) setProducts(data.products)
    } catch (err) {
      console.error('Error fetching products:', err)
    }
  }

  const fetchOrders = async (authToken) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/admin/all`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      })
      const data = await res.json()
      if (data.success) setOrders(data.orders)
    } catch (err) {
      console.error('Error fetching orders:', err)
    }
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    if (!newProduct.name || !newProduct.description || !newProduct.price) {
      alert('Please fill required fields')
      return
    }

    setLoading(true)
    try {
      const endpoint = editingId ? `/api/products/${editingId}` : '/api/products'
      const method = editingId ? 'PUT' : 'POST'

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock) || 0
        })
      })

      const data = await res.json()
      if (data.success) {
        setNewProduct({ name: '', description: '', price: '', category: 'Hardwood', stock: '', image: '' })
        setEditingId(null)
        fetchProducts(token)
        alert(editingId ? 'Product updated!' : 'Product added!')
      }
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        fetchProducts(token)
        alert('Product deleted!')
      }
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  const handleEditProduct = (product) => {
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      image: product.image || ''
    })
    setEditingId(product._id)
  }

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  document.cookie = "token=; Max-Age=0; path=/";

  router.replace("/auth/login");
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            WoodZeno Admin CMS
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg transition border border-red-500/50"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'products'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'bg-slate-700/50 text-slate-400 border border-slate-600/50'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'orders'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'bg-slate-700/50 text-slate-400 border border-slate-600/50'
            }`}
          >
            Orders
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add/Edit Product Form */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Plus size={20} />
                  {editingId ? 'Edit' : 'Add'} Product
                </h2>

                <form onSubmit={handleAddProduct} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400"
                    required
                  />
                  <textarea
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400 resize-none"
                    rows="3"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400"
                    required
                  />
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400"
                  >
                    <option>Hardwood</option>
                    <option>Softwood</option>
                    <option>Engineered</option>
                    <option>Exotic</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400"
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : (editingId ? 'Update' : 'Add')} Product
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null)
                        setNewProduct({ name: '', description: '', price: '', category: 'Hardwood', stock: '', image: '' })
                      }}
                      className="w-full bg-slate-700/50 hover:bg-slate-700 text-slate-300 font-semibold py-2 rounded-lg transition"
                    >
                      Cancel Edit
                    </button>
                  )}
                </form>
              </div>
            </div>

            {/* Products List */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Products ({products.length})</h2>
                
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {products.length === 0 ? (
                    <p className="text-slate-400">No products yet</p>
                  ) : (
                    products.map(product => (
                      <div key={product._id} className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-white">{product.name}</h3>
                            <p className="text-sm text-slate-400 mt-1">{product.description}</p>
                            <div className="flex gap-4 mt-2 text-sm">
                              <span className="text-cyan-400">₹{product.price}</span>
                              <span className="text-slate-400">{product.category}</span>
                              <span className="text-slate-400">Stock: {product.stock}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 p-2 rounded-lg transition"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product._id)}
                              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-2 rounded-lg transition"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Orders ({orders.length})</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">Order ID</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">Customer</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">Total</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-slate-400">
                        No orders yet
                      </td>
                    </tr>
                  ) : (
                    orders.map(order => (
                      <tr key={order._id} className="border-b border-slate-700 hover:bg-slate-700/20">
                        <td className="py-3 px-4 text-slate-300 font-mono text-xs">{order._id.slice(-8)}</td>
                        <td className="py-3 px-4 text-slate-300">{order.shippingAddress?.name || 'N/A'}</td>
                        <td className="py-3 px-4 text-cyan-400 font-semibold">₹{order.totalPrice}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                            order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                            order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-400 text-xs">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}