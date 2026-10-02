import { test, expect } from '@playwright/test'

test('add to cart works', async ({ page }) => {
  await page.goto('http://localhost:5173/products')

  const addToCartButton = page.getByRole('button', { name: 'Add to Cart' }).first()

  await expect(addToCartButton).toBeVisible({ timeout: 30000 })

  await addToCartButton.click()

  // New behaviour: notification appears
  await expect(page.getByText('Added to cart ✓')).toBeVisible()

  // Navigate to cart using navbar
  await page.getByRole('link', { name: 'Cart', exact: true }).click()

  await expect(page).toHaveURL(/\/cart/)

  await expect(page.getByRole('heading', { name: 'Shopping Basket' })).toBeVisible()

  await expect(page.getByRole('heading', { name: /Subtotal/ })).toBeVisible()
})

test('increase and decrease quantity', async ({ page }) => {
  await page.goto('http://localhost:5173/products')

  const addToCartButton = page.getByRole('button', { name: 'Add to Cart' }).first()

  await expect(addToCartButton).toBeVisible({ timeout: 30000 })

  await addToCartButton.click()

  await expect(page.getByText('Added to cart ✓')).toBeVisible()

  await page.getByRole('link', { name: 'Cart', exact: true }).click()

  await expect(page).toHaveURL(/\/cart/)

  const quantity = page.locator('span.text-xl.font-semibold').first()

  await expect(quantity).toHaveText('1')

  await page.getByRole('button', { name: '+' }).click()
  await expect(quantity).toHaveText('2')

  await page.getByRole('button', { name: '-' }).click()
  await expect(quantity).toHaveText('1')
})

test('remove from cart works', async ({ page }) => {
  await page.goto('http://localhost:5173/products')

  const addToCartButton = page.getByRole('button', { name: 'Add to Cart' }).first()

  await expect(addToCartButton).toBeVisible({ timeout: 30000 })

  await addToCartButton.click()

  await expect(page.getByText('Added to cart ✓')).toBeVisible()

  await page.getByRole('link', { name: 'Cart', exact: true }).click()

  await expect(page).toHaveURL(/\/cart/)

  await page.getByRole('button', { name: 'Delete' }).click()

  await expect(page.getByText('Your cart is empty.', { exact: true })).toBeVisible()
})
