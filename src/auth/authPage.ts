// src/auth/authPage.ts
import { Page } from '@playwright/test';

export class AuthPage {
  constructor(private readonly page: Page) {}

  async navigateToHomePage() {
    const baseUrl = process.env.BASE_URL;
    if (!baseUrl) {
      throw new Error('BASE_URL is not defined in config/.env');
    }

    await this.page.goto(baseUrl);
  }
}
