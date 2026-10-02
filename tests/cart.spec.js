import { test, expect } from '@playwright/test'

test('add to cart works', async ({ page }) => {
  await page.goto('http://localhost:5173/products')

  // Wait for products to load
  const addToCartButton = page.getByRole('button', { name: 'Add to Cart' }).first()
  await expect(addToCartButton).toBeVisible({ timeout: 30000 })

  // Add first product to cart
  await addToCartButton.click()

  // Products page automatically navigates to cart
  await expect(page).toHaveURL(/\/cart/)

  // Cart page should load
  await expect(page.getByRole('heading', { name: 'Shopping Basket' })).toBeVisible()

  // Cart should contain a product image
  await expect(page.locator('img').first()).toBeVisible()

  // Subtotal should appear
  await expect(page.getByRole('heading', { name: /Subtotal/ })).toBeVisible()
})

test('increase and decrease quantity', async ({ page }) => {
  await page.goto('http://localhost:5173/products')

  const addToCartButton = page.getByRole('button', { name: 'Add to Cart' }).first()
  await expect(addToCartButton).toBeVisible({ timeout: 30000 })

  await addToCartButton.click()

  await expect(page).toHaveURL(/\/cart/)

  // Quantity starts at 1
  const quantity = page.locator('span.text-xl.font-semibold').first()
  await expect(quantity).toHaveText('1')

  // Increase quantity
  await page.getByRole('button', { name: '+' }).click()
  await expect(quantity).toHaveText('2')

  // Decrease quantity
  await page.getByRole('button', { name: '-' }).click()
  await expect(quantity).toHaveText('1')
})

test('remove from cart works', async ({ page }) => {
  await page.goto('http://localhost:5173/products')

  const addToCartButton = page.getByRole('button', { name: 'Add to Cart' }).first()
  await expect(addToCartButton).toBeVisible({ timeout: 30000 })

  await addToCartButton.click()

  await expect(page).toHaveURL(/\/cart/)

  // Remove product
  await page.getByRole('button', { name: 'Delete' }).click()

  // Cart should now be empty
  await expect(page.getByText('Your cart is empty.', { exact: true })).toBeVisible()
})
