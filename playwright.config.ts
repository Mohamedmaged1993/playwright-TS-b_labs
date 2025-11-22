import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: 'src/config/.env' });  

export default defineConfig({
  testDir: 'src',
  testMatch: /.*\.spec\.ts$/,

  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on',
    permissions: ['notifications'],
    launchOptions: {
      args: [
        '--disable-notifications=false',
      ],
    },
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        permissions: ['notifications'],
      },
    },
  ],
});
