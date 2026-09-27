import { test, expect } from "@playwright/test";

test("add to cart works", async ({ page }) => {
  await page.goto("http://localhost:5173/products");

  await page.waitForSelector("img");

  await page.getByText("Add to Cart").first().click();

  await page.goto("http://localhost:5173/cart");

  await expect(page.getByRole("heading", { name: "Shopping Basket" })).toBeVisible();
  await expect(page.getByText("£")).toBeVisible();
});

test("increase and decrease quantity", async ({ page }) => {
  await page.goto("http://localhost:5173/products");

  await page.waitForSelector("img");

  await page.getByText("Add to Cart").first().click();
  await page.goto("http://localhost:5173/cart");

  const qty = page.locator("text=1");
  await expect(qty).toBeVisible();

  await page.getByText("+").click();
  await expect(page.locator("text=2")).toBeVisible();

  await page.getByText("-").click();
  await expect(page.locator("text=1")).toBeVisible();
});

test("remove from cart works", async ({ page }) => {
  await page.goto("http://localhost:5173/products");

  await page.waitForSelector("img");

  await page.getByText("Add to Cart").first().click();
  await page.goto("http://localhost:5173/cart");

  await page.getByText("Delete").click();

  await expect(page.getByText("Your cart is empty.")).toBeVisible();
});
