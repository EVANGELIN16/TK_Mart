import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'
import Login from './Login'
import { signInWithEmailAndPassword } from 'firebase/auth'

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn()
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

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders the login form', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
  })

  test('logs in and navigates to dashboard', async () => {
    signInWithEmailAndPassword.mockResolvedValue({
      user: {
        email: 'test@example.com'
      }
    })

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    })

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      )

      expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
    })
  })

  test('shows an error for invalid login details', async () => {
    signInWithEmailAndPassword.mockRejectedValue({
      code: 'auth/invalid-credential'
    })

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'wrong@example.com' }
    })

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'wrongpassword' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(await screen.findByText('Invalid email or password')).toBeInTheDocument()
  })
})
