import { Link } from 'react-router-dom'

export default function GlassCard({
  product,
  onWishlistToggle,
  onRemove,
  onAddToCart,
  showWishlist = true,
  showRemove = false,
  showAddToCart = false
}) {
  return (
    <div className="relative p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
      {/* Wishlist Heart */}
      {showWishlist && (
        <button
          className={`absolute top-4 right-4 text-xl ${
            onWishlistToggle?.isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
          }`}
          onClick={() => onWishlistToggle?.toggle(product.id)}
        >
          {onWishlistToggle?.isWishlisted ? '❤️' : '🤍'}
        </button>
      )}

      {/* Remove Button */}
      {showRemove && (
        <button
          className="absolute top-4 right-4 text-red-500 text-xl"
          onClick={() => onRemove(product.id)}
        >
          ❌
        </button>
      )}

      {/* Product Image + Title */}
      <Link to={`/products/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover rounded-lg"
        />

        <h2 className="text-lg font-semibold mt-4 text-gray-900">{product.title}</h2>

        <p className="text-gray-700 font-medium mt-2 text-lg">£{product.price}</p>
      </Link>

      {/* Add to Cart Button */}
      {showAddToCart && (
        <button
          className="mt-4 w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-black transition"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      )}
    </div>
  )
}
