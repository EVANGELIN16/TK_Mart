import { test, expect } from '@playwright/test'

test('navbar links work', async ({ page }) => {
  await page.goto('http://localhost:5173')

  // Products
  await page.getByRole('link', { name: 'Products', exact: true }).click()

  await expect(page.getByRole('heading', { name: 'Products', exact: true })).toBeVisible({
    timeout: 30000
  })

  // Wishlist
  await page.getByRole('link', { name: 'Wishlist', exact: true }).click()

  await expect(page.getByRole('heading', { name: 'Your Wishlist', exact: true })).toBeVisible({
    timeout: 30000
  })

  // Cart
  await page.getByRole('link', { name: 'Cart', exact: true }).click()

  await expect(page.getByRole('heading', { name: 'Shopping Basket', exact: true })).toBeVisible({
    timeout: 30000
  })
})
