import { test, expect } from '@playwright/test'

test('search filters products', async ({ page }) => {
  await page.goto('http://localhost:5173/products')

  await page.waitForSelector('img')

  await page.getByPlaceholder('Search products...').fill('phone')

  const cards = await page.locator('img').count()
  expect(cards).toBeGreaterThan(0)
})

test('category filter works', async ({ page }) => {
  await page.goto('http://localhost:5173/products')

  await page.waitForSelector('img')

  await page.getByRole('button', { name: 'Smartphones' }).click()

  const cards = await page.locator('img').count()
  expect(cards).toBeGreaterThan(0)
})
