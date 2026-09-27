// Simulated API (local storage or backend later)
export const getWishlist = () => {
  return JSON.parse(localStorage.getItem('wishlist') || '[]')
}

export const saveWishlist = (items) => {
  localStorage.setItem('wishlist', JSON.stringify(items))
}
