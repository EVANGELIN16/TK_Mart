import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById } from '../../store/productSlice'
import { addToCart } from '../../store/cartSlice'
import { toggleWishlist } from '../../store/wishlistSlice'

export default function ProductDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { selectedProduct, items, loading } = useSelector((state) => state.products)

  const wishlist = useSelector((state) => state.wishlist.items)
  const isWishlisted = wishlist.includes(Number(id))

  useEffect(() => {
    dispatch(fetchProductById(id))
  }, [dispatch, id])

  if (loading || !selectedProduct) return <p className="p-10 text-xl">Loading product...</p>

  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    images,
    thumbnail
  } = selectedProduct

  // Recommended products (same category)
  const recommended = items
    .filter((p) => p.category === category && p.id !== selectedProduct.id)
    .slice(0, 4)

  console.log('Selected Product:', selectedProduct)

  return (
    <div className="p-10 bg-white rounded-xl shadow-md border border-slate-200">
      {/* TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* IMAGE GALLERY */}
        <div className="space-y-4">
          <img src={thumbnail} alt={title} className="w-full rounded-xl shadow-lg" />

          <div className="grid grid-cols-4 gap-3">
            {images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="gallery"
                className="h-20 w-full object-cover rounded-lg border hover:scale-105 transition"
              />
            ))}
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">{title}</h1>

          <p className="text-gray-600 mb-4">{description}</p>

          {/* BRAND + CATEGORY */}
          <p className="text-sm text-gray-500 mb-2">
            Brand: <span className="font-semibold">{brand}</span>
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Category: <span className="font-semibold">{category}</span>
          </p>

          {/* RATING */}
          <p className="text-yellow-500 text-xl mb-4">⭐ {rating} / 5</p>

          {/* PRICE */}
          <p className="text-blue-600 text-3xl font-bold mb-2">£{price}</p>

          {/* DISCOUNT */}
          {discountPercentage > 0 && (
            <p className="text-green-600 font-semibold mb-4">{discountPercentage}% OFF</p>
          )}

          {/* STOCK */}
          <p className={`mb-6 font-semibold ${stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
            {stock < 10 ? `Only ${stock} left!` : `In Stock (${stock})`}
          </p>

          {/* Wishlist */}
          <button
            className={`text-2xl mb-4 ${isWishlisted ? 'text-red-500' : 'text-gray-500'}`}
            onClick={() => dispatch(toggleWishlist(selectedProduct.id))}
          >
            {isWishlisted ? '❤️ Remove from Wishlist' : '🤍 Add to Wishlist'}
          </button>

          {/* Add to Cart */}
          <button
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            onClick={() => dispatch(addToCart(selectedProduct))}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* EXTRA DETAILS */}
      <div className="bg-gray-100 p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Additional Information</h2>

        <ul className="space-y-2 text-gray-700">
          <li>• High-quality product</li>
          <li>• Fast delivery available</li>
          <li>• Secure packaging</li>
          <li>• 7-day return policy</li>
          <li>• Trusted brand</li>
        </ul>
      </div>

      {/* RECOMMENDED PRODUCTS */}
      <div>
        <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {recommended?.map((p) => (
            <Link
              key={p.id}
              to={`/products/${p.id}`}
              className="p-4 bg-white border rounded-xl shadow hover:shadow-lg transition block"
            >
              <img
                src={p.thumbnail}
                alt={p.title}
                className="w-full h-32 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-3">{p.title}</h3>
              <p className="text-blue-600 font-bold mt-2">£{p.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
