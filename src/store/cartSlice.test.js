import { describe, expect, test } from 'vitest'
import cartReducer, {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  updateQuantity
} from './cartSlice'

describe('cartSlice', () => {
  test('adds a product to the cart', () => {
    const initialState = {
      items: []
    }

    const product = {
      id: 1,
      title: 'Test Product',
      price: '25'
    }

    const state = cartReducer(initialState, addToCart(product))

    expect(state.items).toHaveLength(1)
    expect(state.items[0].title).toBe('Test Product')
    expect(state.items[0].price).toBe(25)
    expect(state.items[0].qty).toBe(1)
  })

  test('increases quantity when the same product is added again', () => {
    const initialState = {
      items: [
        {
          id: 1,
          title: 'Test Product',
          price: 25,
          qty: 1
        }
      ]
    }

    const product = {
      id: 1,
      title: 'Test Product',
      price: 25
    }

    const state = cartReducer(initialState, addToCart(product))

    expect(state.items[0].qty).toBe(2)
  })

  test('removes a product from the cart', () => {
    const initialState = {
      items: [{ id: 1, title: 'Test Product', price: 25, qty: 1 }]
    }

    const state = cartReducer(initialState, removeFromCart(1))

    expect(state.items).toHaveLength(0)
  })

  test('increases product quantity', () => {
    const initialState = {
      items: [{ id: 1, title: 'Test Product', price: 25, qty: 1 }]
    }

    const state = cartReducer(initialState, increaseQty(1))

    expect(state.items[0].qty).toBe(2)
  })

  test('decreases product quantity', () => {
    const initialState = {
      items: [{ id: 1, title: 'Test Product', price: 25, qty: 2 }]
    }

    const state = cartReducer(initialState, decreaseQty(1))

    expect(state.items[0].qty).toBe(1)
  })

  test('does not decrease quantity below 1', () => {
    const initialState = {
      items: [{ id: 1, title: 'Test Product', price: 25, qty: 1 }]
    }

    const state = cartReducer(initialState, decreaseQty(1))

    expect(state.items[0].qty).toBe(1)
  })

  test('updates product quantity', () => {
    const initialState = {
      items: [{ id: 1, title: 'Test Product', price: 25, qty: 1 }]
    }

    const state = cartReducer(
      initialState,
      updateQuantity({
        id: 1,
        quantity: 5
      })
    )

    expect(state.items[0].qty).toBe(5)
  })
})
