import { useSelector } from 'react-redux'
import { useState } from 'react'
export default function Checkout() {
  const [orderComplete, setOrderComplete] = useState(false)
  const cartItems = useSelector((state) => state.cart.items)

  const total = cartItems.reduce((sum, item) => sum + Number(item.price) * item.qty, 0)
  const handleOrder = (e) => {
    e.preventDefault()
    setOrderComplete(true)
  }
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      {orderComplete && (
        <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-xl">
          <h2 className="text-xl font-bold text-green-800 mb-2">Order simulation complete!</h2>

          <p className="text-green-700">
            This is a demo e-commerce project. No real payment or order has been processed.
          </p>
        </div>
      )}

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-5">Delivery Details</h2>

            <form className="space-y-4" onSubmit={handleOrder}>
              <div>
                <label htmlFor="fullName" className="block mb-2 font-medium">
                  Full Name
                </label>

                <input
                  id="fullName"
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

              <div>
                <label htmlFor="address" className="block mb-2 font-medium">
                  Address
                </label>

                <input
                  id="address"
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

              <div>
                <label htmlFor="postcode" className="block mb-2 font-medium">
                  Postcode
                </label>

                <input
                  id="postcode"
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold"
              >
                Place Order
              </button>
            </form>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-5">Order Summary</h2>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.title} × {item.qty}
                  </span>

                  <span>£{(Number(item.price) * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t mt-6 pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>£{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
