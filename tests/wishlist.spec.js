import { test, expect } from '@playwright/test'

test('wishlist toggles correctly', async ({ page }) => {
  await page.goto('http://localhost:5173/products')

  const firstProduct = page
    .locator('a[href^="/products/"]')
    .filter({
      has: page.locator('img')
    })
    .first()

  await expect(firstProduct).toBeVisible({ timeout: 15000 })

  const productName = await firstProduct.locator('h2').textContent()

  // Add first product to wishlist
  const heart = page.getByRole('button', { name: '🤍' }).first()
  await heart.click()

  // Confirm heart changed
  await expect(page.getByRole('button', { name: '❤️' }).first()).toBeVisible()

  // IMPORTANT: use React Router navigation instead of page.goto()
  await page.getByRole('link', { name: 'Wishlist', exact: true }).click()

  await expect(page).toHaveURL(/\/wishlist/)

  await expect(page.getByRole('heading', { name: 'Your Wishlist' })).toBeVisible()

  // Confirm the same product appears in wishlist
  await expect(page.getByRole('heading', { name: productName })).toBeVisible({ timeout: 15000 })
})

test('wishlist page loads', async ({ page }) => {
  await page.goto('http://localhost:5173/wishlist')

  await expect(page.getByRole('heading', { name: 'Your Wishlist' })).toBeVisible()
})
