import { useEffect } from 'react'
import GlassCard from '../../components/Card/Card'
import { useSelector, useDispatch } from 'react-redux'
import { toggleWishlist } from '../../store/wishlistSlice'
import { fetchProducts } from '../../store/productSlice'
import { Link } from 'react-router-dom'

export default function Wishlist() {
  const dispatch = useDispatch()

  const wishlist = useSelector((state) => state.wishlist.items)
  const products = useSelector((state) => state.products.items)
  const loading = useSelector((state) => state.products.loading)

  // Make sure products are available when wishlist page loads
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts())
    }
  }, [dispatch, products.length])

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id))

  if (loading && products.length === 0) {
    return <p className="p-10 text-xl">Loading wishlist...</p>
  }

  return (
    <div className="p-10 space-y-10">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Your Wishlist</h1>

      {/* Empty State */}
      {wishlistedProducts.length === 0 && (
        <p className="text-gray-600 text-lg">
          Your wishlist is empty.
          <Link to="/products" className="text-gray-900 underline ml-2">
            Browse products
          </Link>
        </p>
      )}

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {wishlistedProducts.map((product) => (
          <GlassCard
            key={product.id}
            product={product}
            showWishlist={true}
            showAddToCart={true}
            showRemove={false}
            onWishlistToggle={{
              isWishlisted: true,
              toggle: (id) => dispatch(toggleWishlist(id))
            }}
          />
        ))}
      </div>
    </div>
  )
}
