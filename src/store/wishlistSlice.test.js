import { describe, expect, test } from 'vitest'
import wishlistReducer, {
  toggleWishlist,
  selectWishlistItems,
  selectIsWishlisted
} from './wishlistSlice'

describe('wishlistSlice', () => {
  test('adds a product to wishlist', () => {
    const initialState = {
      items: []
    }

    const state = wishlistReducer(initialState, toggleWishlist(1))

    expect(state.items).toContain(1)
  })

  test('removes a product already in wishlist', () => {
    const initialState = {
      items: [1]
    }

    const state = wishlistReducer(initialState, toggleWishlist(1))

    expect(state.items).not.toContain(1)
  })

  test('selectWishlistItems returns wishlist items', () => {
    const state = {
      wishlist: {
        items: [1, 2, 3]
      }
    }

    expect(selectWishlistItems(state)).toEqual([1, 2, 3])
  })

  test('selectIsWishlisted returns true when product is in wishlist', () => {
    const state = {
      wishlist: {
        items: [1, 2, 3]
      }
    }

    expect(selectIsWishlisted(state, 2)).toBe(true)
  })

  test('selectIsWishlisted returns false when product is not in wishlist', () => {
    const state = {
      wishlist: {
        items: [1, 2, 3]
      }
    }

    expect(selectIsWishlisted(state, 10)).toBe(false)
  })
})
