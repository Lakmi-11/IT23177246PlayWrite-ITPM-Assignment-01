const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 60000,
  workers: 1,  // Run tests sequentially to prevent browser crashes
  use: {
    browserName: 'chromium',
    headless: false,
  },
  projects: [
    { name: 'chromium' }
  ],
});
