import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../store/cartSlice'
import { toggleWishlist } from '../../store/wishlistSlice'
import { Link, useNavigate } from 'react-router-dom'

export default function ProductCard({ product }) {
  const dispatch = useDispatch()
  const wishlist = useSelector((state) => state.wishlist.items)
  const navigate = useNavigate()

  const isWishlisted = wishlist.includes(product.id)

  return (
    <div className="relative p-6 rounded-2xl backdrop-blur-xl bg-white/50 border border-white/40 shadow-lg hover:shadow-xl transition">
      {/* Wishlist Heart */}
      <button
        className={`absolute top-4 right-4 text-2xl ${
          isWishlisted ? 'text-red-400' : 'text-teal-600/60 hover:text-red-300'
        }`}
        onClick={() => dispatch(toggleWishlist(product.id))}
      >
        {isWishlisted ? '❤️' : '🤍'}
      </button>

      {/* Product Link */}
      <Link to={`/products/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover rounded-xl shadow-md"
        />

        <h2 className="text-xl font-semibold mt-4 text-teal-800 drop-shadow">{product.title}</h2>

        <p className="text-teal-700 font-bold mt-2 text-lg drop-shadow">£{product.price}</p>
      </Link>

      {/* Add to Cart */}
      <button
        className="mt-4 w-full bg-teal-600/80 text-white py-2 rounded-xl backdrop-blur-md hover:bg-teal-700 transition shadow-md"
        onClick={() => {
          dispatch(addToCart(product))
          navigate('/cart')
        }}
      >
        Add to Cart
      </button>
    </div>
  )
}
