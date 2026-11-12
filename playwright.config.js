// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // which test you want to run
  testDir: './tests',
  // for override test timeout for all tests
  timeout: 60 * 1000,
  // assertions timeout
  expect: {
    timeout: 10 * 1000,
  },
  // fail on CI if test.only is left in the code
  forbidOnly: !!process.env.CI,
  // retry failed tests only on CI
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',

  use: {
    headless: true,
    // screenshot for everything
    //screenshot: 'on',
    screenshot: 'only-on-failure',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    //trace: 'on-first-retry',
    trace: 'retain-on-failure',
    //trace: 'on',
  },

  // MUST be chromium, firefox or webkit
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // locally use installed Google Chrome (Smart App Control blocks Playwright's unsigned Chromium);
        // on CI (process.env.CI is set) use Playwright's own Chromium
        channel: process.env.CI ? undefined : 'chrome',
      },
    },
    //{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});