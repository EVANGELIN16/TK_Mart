import { test, expect } from '@playwright/test'

test('products page loads', async ({ page }) => {
  await page.goto('http://localhost:5173/products')

  await expect(page.getByRole('heading', { name: 'Products', exact: true })).toBeVisible({
    timeout: 15000
  })
})

test('product cards render', async ({ page }) => {
  await page.goto('http://localhost:5173/products')

  const productCards = page.locator('a[href^="/products/"]').filter({
    has: page.locator('img')
  })

  await expect(productCards.first()).toBeVisible({ timeout: 15000 })

  const count = await productCards.count()
  expect(count).toBeGreaterThan(0)
})

test('clicking a product opens product details', async ({ page }) => {
  await page.goto('http://localhost:5173/products')

  const firstProduct = page
    .locator('a[href^="/products/"]')
    .filter({
      has: page.locator('img')
    })
    .first()

  await expect(firstProduct).toBeVisible({ timeout: 15000 })

  await firstProduct.click()

  await expect(page).toHaveURL(/\/products\/\d+/)

  await expect(page.locator('h1.text-4xl')).toBeVisible()

  await expect(page.getByRole('heading', { name: 'Additional Information' })).toBeVisible()
})
