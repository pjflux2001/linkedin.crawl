const { chromium } = require('playwright');
require('dotenv').config();

const EMAIL = process.env.LINKEDIN_EMAIL;
const PASSWORD = process.env.LINKEDIN_PASSWORD;
const HEADLESS_BROWSER = false

const login = async (page) => {
  await page.goto('https://www.linkedin.com/login');
  await page.fill('#username', EMAIL);
  await page.fill('#password', PASSWORD);
  await Promise.all([
    page.waitForNavigation(),
    page.click('.login__form_action_container button[type="submit"]'),
  ]);
};

const visitPages = async (page, pagesToVisit) => {
  for (const link of pagesToVisit) {
    await page.goto(link);
    await page.waitForLoadState('networkidle');
    // await page.screenshot({ path: `linkedin-${link.replace('https://www.linkedin.com/', '')}.png` });
  }
};

(async () => {
  const browser = await chromium.launch({ headless: HEADLESS_BROWSER });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await login(page);

    const pagesToVisit = [
      'https://www.linkedin.com/feed/',
      'https://www.linkedin.com/messaging/',
      'https://www.linkedin.com/jobs/',
    ];

    await visitPages(page, pagesToVisit);
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
    console.log('Visited pages.');
  }
})();
