import { createSlice } from '@reduxjs/toolkit'

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [] // product IDs
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const id = action.payload

      if (state.items.includes(id)) {
        state.items = state.items.filter((p) => p !== id)
      } else {
        state.items.push(id)
      }
    }
  }
})

export const { toggleWishlist } = wishlistSlice.actions
export const selectWishlistItems = (state) => state.wishlist.items

export const selectIsWishlisted = (state, productId) => state.wishlist.items.includes(productId)
export default wishlistSlice.reducer
