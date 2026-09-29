import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../store/productSlice'
import GlassCard from '../../components/Card/Card'
import { toggleWishlist } from '../../store/wishlistSlice'
import { addToCart } from '../../store/cartSlice'
import { useNavigate } from 'react-router-dom'

export default function Products() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { items, loading } = useSelector((state) => state.products)
  const wishlist = useSelector((state) => state.wishlist.items)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (loading) return <p className="p-10 text-xl text-gray-700">Loading products...</p>

  const categories = ['all', ...new Set(items.map((p) => p.category))]

  const filteredProducts = items.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'all' ? true : p.category === category
    const matchesMinPrice = minPrice === '' ? true : p.price >= Number(minPrice)
    const matchesMaxPrice = maxPrice === '' ? true : p.price <= Number(maxPrice)

    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice
  })

  return (
    <div className="p-10 space-y-10">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Products</h1>

      {/* FILTERS */}
      <div className="mb-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          className="p-3 rounded-xl bg-white border border-gray-200 shadow-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category */}
        <select
          className="p-3 rounded-xl bg-white border border-gray-200 shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.toUpperCase()}
            </option>
          ))}
        </select>

        {/* Min Price */}
        <input
          type="number"
          placeholder="Min Price"
          className="p-3 rounded-xl bg-white border border-gray-200 shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        {/* Max Price */}
        <input
          type="number"
          placeholder="Max Price"
          className="p-3 rounded-xl bg-white border border-gray-200 shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredProducts.map((product) => {
          const isWishlisted = wishlist.includes(product.id)

          return (
            <GlassCard
              key={product.id}
              product={product}
              showWishlist={true}
              showAddToCart={true}
              onWishlistToggle={{
                isWishlisted,
                toggle: (id) => dispatch(toggleWishlist(id))
              }}
              onAddToCart={(product) => {
                dispatch(addToCart(product))
                navigate('/cart')
              }}
            />
          )
        })}
      </div>

      {/* NO RESULTS */}
      {filteredProducts.length === 0 && (
        <p className="text-gray-700 text-xl mt-10 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          No products match your filters.
        </p>
      )}
    </div>
  )
}
