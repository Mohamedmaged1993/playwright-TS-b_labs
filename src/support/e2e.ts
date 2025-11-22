import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

import { test as base, expect } from '@playwright/test';
import { AuthPage } from '../auth/authPage';
import { HomePage } from '../domain/homeManagement/pages/homepage';
import { AddToCart } from '../domain/cartManagement/pages/addTocartPage';

type Fixtures = {
  home: HomePage;
  cart: AddToCart;
};

export const test = base.extend<Fixtures>({
  home: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  cart: async ({ page }, use) => {
    await use(new AddToCart(page));
  },
});

test.beforeEach(async ({ page, context }) => {
  await context.grantPermissions(['notifications'], {
    origin: process.env.BASE_URL,
  });

  const authPage = new AuthPage(page);
  await authPage.navigateToHomePage();

  const homePageURL = process.env.HOME_PAGE_URL!;
  await expect(page).toHaveURL(homePageURL);

  await page.waitForLoadState('load');
  await page.waitForLoadState('networkidle');
});

export { expect };
