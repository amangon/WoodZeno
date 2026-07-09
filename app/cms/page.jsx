return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

    {/* Header */}
    <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-white">
            WoodZeno CMS
          </h1>

          <p className="text-slate-400 text-sm mt-1">
            Manage Products & Orders
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
        >
          Logout
        </button>

      </div>
    </header>

    <div className="max-w-7xl mx-auto p-6">

      {/* Dashboard Cards */}

      <div className="grid md:grid-cols-3 gap-5 mb-8">

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-slate-400 text-sm">
            Total Products
          </p>

          <h2 className="text-4xl font-bold text-cyan-400 mt-3">
            {products.length}
          </h2>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-slate-400 text-sm">
            Total Orders
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-3">
            {orders.length}
          </h2>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-slate-400 text-sm">
            Logged In
          </p>

          <h2 className="text-2xl font-bold text-white mt-3">
            Admin
          </h2>
        </div>

      </div>

      {/* Tabs */}

      <div className="flex gap-4 mb-8">

        <button
          onClick={() => setActiveTab("products")}
          className={`px-6 py-3 rounded-lg transition ${
            activeTab === "products"
              ? "bg-cyan-500 text-white"
              : "bg-slate-700 text-slate-300"
          }`}
        >
          Products
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className={`px-6 py-3 rounded-lg transition ${
            activeTab === "orders"
              ? "bg-cyan-500 text-white"
              : "bg-slate-700 text-slate-300"
          }`}
        >
          Orders
        </button>

      </div>
      {activeTab === "products" && (
  <div className="grid lg:grid-cols-3 gap-8">

    {/* Product Form */}

    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 h-fit">

      <h2 className="text-2xl font-bold text-white mb-6">
        {editingId ? "Edit Product" : "Add Product"}
      </h2>

      <form onSubmit={handleAddProduct} className="space-y-4">

        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 outline-none"
          required
        />

        <textarea
          rows="4"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              description: e.target.value,
            })
          }
          className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 outline-none resize-none"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              price: e.target.value,
            })
          }
          className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 outline-none"
          required
        />

        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              stock: e.target.value,
            })
          }
          className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 outline-none"
        />

        <select
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              category: e.target.value,
            })
          }
          className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 outline-none"
        >
          <option>Hardwood</option>
          <option>Softwood</option>
          <option>Engineered</option>
          <option>Exotic</option>
        </select>

        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              image: e.target.value,
            })
          }
          className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg text-white font-semibold transition"
        >
          {loading
            ? "Please Wait..."
            : editingId
            ? "Update Product"
            : "Add Product"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);

              setNewProduct({
                name: "",
                description: "",
                price: "",
                category: "Hardwood",
                stock: "",
                image: "",
              });
            }}
            className="w-full bg-slate-700 hover:bg-slate-600 py-3 rounded-lg text-white"
          >
            Cancel Edit
          </button>
        )}

      </form>

    </div>
        {/* Products List */}

    <div className="lg:col-span-2">

      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          Products ({products.length})
        </h2>

        {products.length === 0 ? (

          <div className="text-center py-16 text-slate-400">
            No Products Found
          </div>

        ) : (

          <div className="space-y-5">

            {products.map((product) => (

              <div
                key={product._id}
                className="bg-slate-700 rounded-xl p-5 flex justify-between items-start gap-5"
              >

                <div className="flex gap-5">

                  <img
                    src={product.image || "/placeholder.png"}
                    alt={product.name}
                    className="w-24 h-24 rounded-lg object-cover border border-slate-600"
                  />

                  <div>

                    <h3 className="text-xl font-bold text-white">
                      {product.name}
                    </h3>

                    <p className="text-slate-400 mt-2">
                      {product.description}
                    </p>

                    <div className="flex gap-5 mt-4">

                      <span className="text-cyan-400 font-bold">
                        ₹{product.price}
                      </span>

                      <span className="text-green-400">
                        Stock : {product.stock}
                      </span>

                      <span className="text-orange-400">
                        {product.category}
                      </span>

                    </div>

                  </div>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-blue-500 hover:bg-blue-600 p-3 rounded-lg text-white"
                  >
                    <Edit2 size={18} />
                  </button>

                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="bg-red-500 hover:bg-red-600 p-3 rounded-lg text-white"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  </div>
)}{activeTab === "orders" && (
  <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">

    <h2 className="text-2xl font-bold text-white mb-6">
      Orders ({orders.length})
    </h2>

    {orders.length === 0 ? (

      <div className="text-center py-16 text-slate-400">
        No Orders Found
      </div>

    ) : (

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="text-left py-3 text-slate-300">Customer</th>

              <th className="text-left py-3 text-slate-300">Amount</th>

              <th className="text-left py-3 text-slate-300">Status</th>

              <th className="text-left py-3 text-slate-300">Date</th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order._id}
                className="border-b border-slate-700"
              >

                <td className="py-4 text-white">
                  {order.shippingAddress?.name || "Customer"}
                </td>

                <td className="py-4 text-cyan-400">
                  ₹{order.totalPrice}
                </td>

                <td className="py-4">

                  <span className="px-3 py-1 rounded bg-green-500 text-white text-sm">
                    {order.status}
                  </span>

                </td>

                <td className="py-4 text-slate-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    )}

  </div>
)}

    </div>
  </div>
);
