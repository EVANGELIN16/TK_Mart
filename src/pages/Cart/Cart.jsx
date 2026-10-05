import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, increaseQty, decreaseQty } from '../../store/cartSlice'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items = useSelector((state) => state.cart.items)

  const total = items.reduce((sum, item) => sum + Number(item.price) * item.qty, 0)

  return (
    <div className="p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* LEFT SIDE — CART ITEMS */}
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Shopping Basket</h1>

        {items.length === 0 && (
          <p className="text-gray-600 text-lg bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            Your cart is empty.
          </p>
        )}

        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-6 p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
          >
            {/* Product Image */}
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-32 h-32 object-cover rounded-lg"
            />

            {/* Product Info */}
            <div className="flex-1 space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>

              <p className="text-gray-800 font-medium text-lg">£{item.price}</p>

              <p className="text-gray-500 text-sm">In stock • Fast delivery</p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-4 mt-3">
                <button
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                  onClick={() => dispatch(decreaseQty(item.id))}
                >
                  -
                </button>

                <span className="text-xl font-semibold text-gray-900">{item.qty}</span>

                <button
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                  onClick={() => dispatch(increaseQty(item.id))}
                >
                  +
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-6 mt-4 text-sm">
                <button
                  className="text-red-600 font-medium hover:underline"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Delete
                </button>

                <button className="text-gray-800 font-medium hover:underline">
                  Save for later
                </button>

                <button className="text-gray-800 font-medium hover:underline">Share</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE — SUBTOTAL BOX */}
      {items.length > 0 && (
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm h-fit">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Subtotal ({items.length} items)</h2>

          <p className="text-3xl font-bold text-gray-900 mb-6">£{total.toFixed(2)}</p>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-black transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  )
}
