import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from './ProductCard'
import cartReducer from '../../store/cartSlice'
import wishlistReducer from '../../store/wishlistSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer
  }
})

export default {
  title: 'Components/ProductCard',
  component: ProductCard,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    )
  ]
}

const sampleProduct = {
  id: 1,
  title: 'Baby Stroller',
  price: 129.99,
  image: 'https://via.placeholder.com/200'
}

export const Default = () => <ProductCard product={sampleProduct} />
