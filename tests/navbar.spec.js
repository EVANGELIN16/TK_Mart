import { test, expect } from "@playwright/test";

test("navbar links work", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await page.getByRole("link", { name: "Products" }).click();
  await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();

  await page.getByRole("link", { name: "Wishlist" }).click();
  await expect(page.getByRole("heading", { name: "Your Wishlist" })).toBeVisible();

  await page.getByRole("link", { name: "Cart" }).click();
  await expect(page.getByRole("heading", { name: "Shopping Basket" })).toBeVisible();
});
