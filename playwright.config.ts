import { defineConfig, devices } from '@playwright/test';

// TypeScript may not include Node types in some setups; declare process to avoid TS error
declare const process: any;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,  // 1 retry local para flaky tests en servidor demo
  workers: process.env.CI ? 1 : 2,  // máximo 2 workers local
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    actionTimeout: 15000,   // 15s para cada acción (click, fill, etc)
    navigationTimeout: 30000, // 30s para navegaciones
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});