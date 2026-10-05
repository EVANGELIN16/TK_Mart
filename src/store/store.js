import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './productSlice'
import cartReducer from './cartSlice'
import wishlistReducer from './wishlistSlice'
import { getCart, saveCart } from '../api/cart'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer
  },

  preloadedState: {
    cart: {
      items: getCart()
    }
  }
})

store.subscribe(() => {
  saveCart(store.getState().cart.items)
})
