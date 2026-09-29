import { test, expect } from '@playwright/test'

test('wishlist toggles correctly', async ({ page }) => {
  await page.goto('http://localhost:5173/products')

  await page.waitForSelector('img')

  const heart = page.getByText('🤍').first()
  await heart.click()

  await page.goto('http://localhost:5173/wishlist')

  await expect(page.getByRole('heading', { name: 'Your Wishlist' })).toBeVisible()
  await expect(page.locator('img')).toBeVisible()
})

test('wishlist page loads', async ({ page }) => {
  await page.goto('http://localhost:5173/wishlist')

  await expect(page.getByRole('heading', { name: 'Your Wishlist' })).toBeVisible()
})
