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
export default wishlistSlice.reducer
