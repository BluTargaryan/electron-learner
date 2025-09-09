import { test, expect, _electron, ElectronApplication, Page } from '@playwright/test';

let electronApp: Awaited<ReturnType<typeof _electron.launch>>;
let mainPage: Page;

test.beforeEach(async ({ page }) => {
 electronApp = await _electron.launch({
    args: ['.'],
    env:{NODE_ENV: 'development'},
  });

  const mainPage = await electronApp.firstWindow();
});

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
