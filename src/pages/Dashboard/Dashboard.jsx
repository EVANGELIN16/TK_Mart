import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/productSlice";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = [...new Set(items.map((p) => p.category))];
  const recentProducts = items.slice(0, 6);
  const lowStock = items.filter((p) => p.stock < 20).slice(0, 6);

  return (
    <div className="p-10 space-y-12">

      {/* Title */}
      <h1 className="text-5xl font-bold text-gray-900">
        TK Mart Dashboard
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Total Products</h2>
          <p className="text-4xl font-bold text-gray-900 mt-2">{items.length}</p>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
          <p className="text-4xl font-bold text-gray-900 mt-2">{categories.length}</p>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Inventory Value</h2>
          <p className="text-4xl font-bold text-gray-900 mt-2">
            £{items.reduce((sum, p) => sum + Number(p.price), 0)}
          </p>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link
          to="/products"
          className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Products</h2>
          <p className="text-gray-600">View and manage all products.</p>
        </Link>

        <Link
          to="/wishlist"
          className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Wishlist</h2>
          <p className="text-gray-600">See what customers love.</p>
        </Link>

        <Link
          to="/cart"
          className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Cart</h2>
          <p className="text-gray-600">Review items added to cart.</p>
        </Link>
      </div>

      {/* Recent Products */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Products</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentProducts.map((p) => (
            <div
              key={p.id}
              className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <img
                src={p.thumbnail}
                alt={p.title}
                className="w-full h-40 object-cover rounded-lg"
              />

              <h3 className="text-lg font-semibold text-gray-900 mt-3">{p.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{p.description}</p>

              <p className="text-gray-800 font-bold mt-2">£{p.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Low Stock Alerts */}
      <div>
        <h2 className="text-3xl font-bold text-red-600 mb-4">Low Stock Alerts</h2>

        {lowStock.length === 0 ? (
          <p className="text-gray-600">All products have healthy stock.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {lowStock.map((p) => (
              <div
                key={p.id}
                className="p-6 bg-white border border-red-200 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="w-full h-40 object-cover rounded-lg"
                />

                <h3 className="text-lg font-semibold text-red-700 mt-3">{p.title}</h3>
                <p className="text-red-600 font-bold mt-2">Stock: {p.stock}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Categories Overview */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Categories Overview</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat}
              className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center text-gray-900 hover:shadow-md transition"
            >
              {cat}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
