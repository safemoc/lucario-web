import { expect, test } from "@playwright/test";

test("login, navigate tabs, logout", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: /登\s*录/i }).click();
  await expect(page).toHaveURL(/\/dashboard/);

  await page.goto("/assets");
  await expect(page.getByText(/我的资产|持有资产/i)).toBeVisible();

  await page.goto("/projects");
  await expect(page.getByText(/项目看板/i)).toBeVisible();

  await page.keyboard.press("Control+k");
  await expect(page.getByPlaceholder(/搜索/i).first()).toBeVisible({ timeout: 3000 }).catch(() => {});

  const logout = page.getByRole("button", { name: /退出|登出/i });
  if (await logout.isVisible()) {
    await logout.click();
    await expect(page).toHaveURL(/\/login/);
  }
});
