import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'
import Register from './Register'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: vi.fn(),
  updateProfile: vi.fn()
}))

vi.mock('../../firebase', () => ({
  auth: {}
}))

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')

  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

describe('Register', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('shows error when passwords do not match', async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Test User' }
    })

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    })

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' }
    })

    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'different123' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'Register' }))

    expect(await screen.findByText('Passwords do not match')).toBeInTheDocument()

    expect(createUserWithEmailAndPassword).not.toHaveBeenCalled()
  })

  test('registers user successfully and navigates to login', async () => {
    const mockUser = {
      uid: '123',
      email: 'test@example.com'
    }

    createUserWithEmailAndPassword.mockResolvedValue({
      user: mockUser
    })

    updateProfile.mockResolvedValue()

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Test User' }
    })

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    })

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' }
    })

    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'password123' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'Register' }))

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      )

      expect(updateProfile).toHaveBeenCalledWith(mockUser, {
        displayName: 'Test User'
      })

      expect(mockNavigate).toHaveBeenCalledWith('/', {
        state: {
          message: 'Registration successful. Please login.'
        }
      })
    })
  })

  test('redirects existing user to login', async () => {
    createUserWithEmailAndPassword.mockRejectedValue({
      code: 'auth/email-already-in-use'
    })

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Test User' }
    })

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'existing@example.com' }
    })

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' }
    })

    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'password123' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'Register' }))

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/', {
        state: {
          message: 'Account already exists. Please login.'
        }
      })
    })
  })
})
