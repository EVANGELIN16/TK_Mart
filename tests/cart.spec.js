import { test, expect } from '@playwright/test'

const mockProducts = {
  products: [
    {
      id: 1,
      title: 'Test Product',
      description: 'Product used for Playwright testing',
      category: 'test',
      price: 99.99,
      thumbnail: 'https://dummyjson.com/icon/test/128'
    }
  ],
  total: 1,
  skip: 0,
  limit: 1
}

test.beforeEach(async ({ page }) => {
  await page.route('https://dummyjson.com/products', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockProducts)
    })
  })
})

test('add to cart works', async ({ page }) => {
  await page.goto('http://localhost:5173/products')

  const addToCartButton = page.getByRole('button', { name: 'Add to Cart' }).first()

  await expect(addToCartButton).toBeVisible()

  await addToCartButton.click()

  await expect(page.getByText('Added to cart ✓')).toBeVisible()

  await page.getByRole('link', { name: 'Cart', exact: true }).click()

  await expect(page).toHaveURL(/\/cart/)

  await expect(page.getByRole('heading', { name: 'Shopping Basket' })).toBeVisible()

  await expect(page.getByRole('heading', { name: /Subtotal/ })).toBeVisible()
})

test('increase and decrease quantity', async ({ page }) => {
  await page.goto('http://localhost:5173/products')

  const addToCartButton = page.getByRole('button', { name: 'Add to Cart' }).first()

  await expect(addToCartButton).toBeVisible()

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

  await expect(addToCartButton).toBeVisible()

  await addToCartButton.click()

  await expect(page.getByText('Added to cart ✓')).toBeVisible()

  await page.getByRole('link', { name: 'Cart', exact: true }).click()

  await expect(page).toHaveURL(/\/cart/)

  await page.getByRole('button', { name: 'Delete' }).click()

  await expect(page.getByText('Your cart is empty.', { exact: true })).toBeVisible()
})
