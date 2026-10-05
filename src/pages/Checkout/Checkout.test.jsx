import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { describe, expect, test } from 'vitest'
import '@testing-library/jest-dom/vitest'
import Checkout from './Checkout'
import cartReducer from '../../store/cartSlice'

const testProduct = {
  id: 1,
  title: 'Test Product',
  price: 25,
  qty: 2
}

const renderCheckout = (items = []) => {
  const store = configureStore({
    reducer: {
      cart: cartReducer
    },
    preloadedState: {
      cart: { items }
    }
  })

  render(
    <Provider store={store}>
      <Checkout />
    </Provider>
  )
}

describe('Checkout', () => {
  test('shows empty cart message when cart has no items', () => {
    renderCheckout()

    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument()
  })

  test('shows order summary and total', () => {
    renderCheckout([testProduct])

    expect(screen.getByText('Test Product × 2')).toBeInTheDocument()
    expect(screen.getAllByText('£50.00')).toHaveLength(2)
  })

  test('shows demo message after placing order', () => {
    renderCheckout([testProduct])

    fireEvent.change(screen.getByLabelText('Full Name'), {
      target: { value: 'Test User' }
    })

    fireEvent.change(screen.getByLabelText('Address'), {
      target: { value: '10 Test Street' }
    })

    fireEvent.change(screen.getByLabelText('Postcode'), {
      target: { value: 'AB1 2CD' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'Place Order' }))

    expect(screen.getByText('Order simulation complete!')).toBeInTheDocument()

    expect(
      screen.getByText(
        'This is a demo e-commerce project. No real payment or order has been processed.'
      )
    ).toBeInTheDocument()
  })
})
