import { test, expect } from '@playwright/test'

test('product details loads correctly', async ({ page }) => {
  await page.goto('http://localhost:5173/products')

  // Wait for products to load
  const firstProduct = page
    .locator('a[href^="/products/"]')
    .filter({
      has: page.locator('img')
    })
    .first()

  await expect(firstProduct).toBeVisible()
  await firstProduct.click()

  // Make sure we navigated to a product details URL
  await expect(page).toHaveURL(/\/products\/\d+/)

  // Product title
  await expect(page.locator('h1.text-4xl')).toBeVisible()

  // Product price
  await expect(page.getByText(/^£\d/).first()).toBeVisible()

  // Additional information
  await expect(page.getByRole('heading', { name: 'Additional Information' })).toBeVisible()
})

test('recommended products appear', async ({ page }) => {
  await page.goto('http://localhost:5173/products')

  // Wait for products to load
  const firstProduct = page
    .locator('a[href^="/products/"]')
    .filter({
      has: page.locator('img')
    })
    .first()

  await expect(firstProduct).toBeVisible()
  await firstProduct.click()

  // Make sure product details page opened
  await expect(page).toHaveURL(/\/products\/\d+/)

  // Recommended section
  await expect(page.getByRole('heading', { name: 'You May Also Like' })).toBeVisible()
})
