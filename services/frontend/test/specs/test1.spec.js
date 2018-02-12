/* global describe before after it browser */
const puppeteer = require('puppeteer');
const { expect } = require('chai');
const nconf = require('nconf');

nconf
  .argv()
  .env()
  .defaults({
    FRONTEND_URL: 'http://localhost',
  });

describe('Test suite', () => {
  before(async () => {
    const executablePath = nconf.get('CHROMIUM_BROWSER_PATH');
    const args = ['--disable-dev-shm-usage'];
    const launchOptions = executablePath ? { executablePath, args } : {};

    global.browser = await puppeteer.launch(launchOptions);
  });

  after(async () => {
    await browser.close();
  });

  it('Test', async () => {
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text));
    page.on('pageerror', (error) => {
      console.log('pageerror:', error.message);
    });
    page.on('request', (request) => {
      console.log('request:', request.url, request.method, request.headers, request.postData);
      console.log('============================================');
    });
    page.on('response', async (response) => {
      try {
        if (response.url !== 'http://backend/api/entities') {
          return;
        }
        const resText = await response.text();
        console.log('response:', response.status, response.url, response.headers, resText);
        console.log('============================================');
      } catch (e) {
        console.log('EX', e);
      }
    });
    page.on('requestfailed', (request) => {
      console.log('REQUEST FAILED:', request.url, request);
    });

    await page.goto(`${nconf.get('FRONTEND_URL')}/entity`);

    const saveButtonSelector = '[data-id=btnSave]';
    await page.waitForSelector(saveButtonSelector);
    await page.click(saveButtonSelector);

    const messageSelector = '[data-id=message]';
    await page.waitForSelector(messageSelector);
    const message = await page.$eval(messageSelector, element => element.innerHTML);

    await page.waitFor(3000);
    await page.close();

    expect(message).to.equal('Aragorn');
  });
});
