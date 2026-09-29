import { test, expect } from '@playwright/test'

test('products page loads', async ({ page }) => {
  await page.goto('http://localhost:5173/products')

  await page.waitForSelector('img')

  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible()
})

test('product cards render', async ({ page }) => {
  await page.goto('http://localhost:5173/products')

  await page.waitForSelector('img')

  const cards = await page.locator('img').count()
  expect(cards).toBeGreaterThan(0)
})

test('clicking a product opens product details', async ({ page }) => {
  await page.goto('http://localhost:5173/products')

  await page.waitForSelector('img')

  await page.locator('img').first().click()

  await expect(page.getByRole('heading')).toBeVisible()
})
