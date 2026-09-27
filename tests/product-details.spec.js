import { test, expect } from "@playwright/test";

test("product details loads correctly", async ({ page }) => {
  await page.goto("http://localhost:5173/products");

  await page.waitForSelector("img");

  await page.locator("img").first().click();

  await expect(page.getByRole("heading")).toBeVisible();
  await expect(page.getByText("£")).toBeVisible();
});

test("recommended products appear", async ({ page }) => {
  await page.goto("http://localhost:5173/products");

  await page.waitForSelector("img");

  await page.locator("img").first().click();

  await expect(page.getByText("Recommended")).toBeVisible();
});
