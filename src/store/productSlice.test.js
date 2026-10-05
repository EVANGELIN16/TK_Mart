import { describe, expect, test } from 'vitest'
import productReducer, { fetchProducts, fetchProductById } from './productSlice'

describe('productSlice', () => {
  test('has the correct initial state', () => {
    const state = productReducer(undefined, { type: 'unknown' })

    expect(state).toEqual({
      items: [],
      selectedProduct: null,
      loading: false
    })
  })

  test('sets loading to true when fetching products', () => {
    const state = productReducer(undefined, {
      type: fetchProducts.pending.type
    })

    expect(state.loading).toBe(true)
  })

  test('stores products when fetching products succeeds', () => {
    const products = [
      { id: 1, title: 'Phone', price: 500 },
      { id: 2, title: 'Laptop', price: 1000 }
    ]

    const state = productReducer(undefined, {
      type: fetchProducts.fulfilled.type,
      payload: products
    })

    expect(state.loading).toBe(false)
    expect(state.items).toEqual(products)
  })

  test('stops loading when fetching products fails', () => {
    const state = productReducer(
      {
        items: [],
        selectedProduct: null,
        loading: true
      },
      {
        type: fetchProducts.rejected.type
      }
    )

    expect(state.loading).toBe(false)
  })

  test('sets loading to true when fetching one product', () => {
    const state = productReducer(undefined, {
      type: fetchProductById.pending.type
    })

    expect(state.loading).toBe(true)
  })

  test('stores selected product when fetch succeeds', () => {
    const product = {
      id: 1,
      title: 'Phone',
      price: 500
    }

    const state = productReducer(undefined, {
      type: fetchProductById.fulfilled.type,
      payload: product
    })

    expect(state.loading).toBe(false)
    expect(state.selectedProduct).toEqual(product)
  })

  test('stops loading when fetching one product fails', () => {
    const state = productReducer(
      {
        items: [],
        selectedProduct: null,
        loading: true
      },
      {
        type: fetchProductById.rejected.type
      }
    )

    expect(state.loading).toBe(false)
  })
})
