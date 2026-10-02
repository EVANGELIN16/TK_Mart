import { test, expect } from '@playwright/test'

test('search filters products', async ({ page }) => {
  await page.goto('http://localhost:5173/products')

  // Wait for products to load
  const searchInput = page.getByPlaceholder('Search products...')
  await expect(searchInput).toBeVisible({ timeout: 15000 })

  // Search for a product we know exists
  await searchInput.fill('Essence Mascara')

  // Check that the matching product appears
  await expect(page.getByText('Essence Mascara Lash Princess', { exact: true })).toBeVisible({
    timeout: 15000
  })
})

test('category filter works', async ({ page }) => {
  await page.goto('http://localhost:5173/products')

  // Wait for products to load
  const categorySelect = page.locator('select')
  await expect(categorySelect).toBeVisible({ timeout: 15000 })

  // Select the beauty category
  await categorySelect.selectOption('beauty')

  // A beauty product should remain visible
  await expect(page.getByText('Essence Mascara Lash Princess', { exact: true })).toBeVisible({
    timeout: 15000
  })
})
