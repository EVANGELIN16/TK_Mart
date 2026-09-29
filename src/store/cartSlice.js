import { createSlice } from '@reduxjs/toolkit'
import { saveCart } from '../api/cart'

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
        existing.quantity += 1
      } else {
        state.items.push({ ...item, price: Number(item.price), quantity: 1 })
      }
      saveCart(state.items)
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload)
      saveCart(state.items)
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find((i) => i.id === id)
      if (item) item.quantity = quantity
      saveCart(state.items)
    },
    increaseQty: (state, action) => {
      const id = action.payload
      const item = state.items.find((item) => item.id === id)
      if (item) item.qty += 1
    },

    decreaseQty: (state, action) => {
      const id = action.payload
      const item = state.items.find((item) => item.id === id)
      if (item && item.qty > 1) item.qty -= 1
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity, increaseQty, decreaseQty } =
  cartSlice.actions
export default cartSlice.reducer
