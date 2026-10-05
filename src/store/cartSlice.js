import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',

  initialState: {
    items: []
  },

  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const existing = state.items.find((i) => i.id === item.id)

      if (existing) {
        existing.qty += 1
      } else {
        state.items.push({
          ...item,
          price: Number(item.price),
          qty: 1
        })
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload)
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find((i) => i.id === id)

      if (item) {
        item.qty = quantity
      }
    },

    increaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload)

      if (item) {
        item.qty += 1
      }
    },

    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload)

      if (item && item.qty > 1) {
        item.qty -= 1
      }
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity, increaseQty, decreaseQty } =
  cartSlice.actions

export default cartSlice.reducer
