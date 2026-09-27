import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './productSlice'
import cartReducer from './cartSlice'
import wishlistReducer from './wishlistSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer
  }
})
