// app.js
require('dotenv').config();

const crawler = require('./scripts/crawler');

(async () => {
  console.log('LINKEDIN_EMAIL:', process.env.LINKEDIN_EMAIL);
  console.log('LINKEDIN_PASSWORD:', process.env.LINKEDIN_PASSWORD);

  try {
    await crawler();
  } catch (error) {
    console.error(error);
  }
})();