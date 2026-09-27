import { test, expect } from "@playwright/test";

test("dashboard loads", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await expect(page.getByRole("heading", { name: "TK Mart Dashboard" })).toBeVisible();
});

test("stats boxes appear", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await expect(page.getByText("Total Products")).toBeVisible();
  await expect(page.getByText("Categories")).toBeVisible();
  await expect(page.getByText("Inventory Value")).toBeVisible();
});
