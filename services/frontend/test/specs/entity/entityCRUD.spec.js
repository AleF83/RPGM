/* global describe before after it browser */
const puppeteer = require('puppeteer');
// const { expect } = require('chai');
const nconf = require('nconf');
const { setPageListeners } = require('../utils');

nconf.argv().env().defaults({ FRONTEND_URL: 'http://localhost' });

describe('Entity CRUD flows', () => {
  before(async () => {
    const executablePath = nconf.get('CHROMIUM_BROWSER_PATH');
    const args = ['--disable-dev-shm-usage'];
    const launchOptions = executablePath ? { executablePath, args } : {};

    global.browser = await puppeteer.launch(launchOptions);
  });

  after(async () => {
    await browser.close();
  });

  it('Create new entity', async () => {
    const page = await browser.newPage();
    setPageListeners(page);
    await page.goto(`${nconf.get('FRONTEND_URL')}/entity`);

    const createButtonSelector = '[data-id=btnNew]';
    await page.waitForSelector(createButtonSelector);
    await page.click(createButtonSelector);

    //     const messageSelector = '[data-id=message]';
    //     await page.waitForSelector(messageSelector);
    //     const message = await page.$eval(messageSelector, element => element.innerHTML);
    await page.waitFor(3000);
    await page.close();
  });

  it('Show entity', () => {
  });

  it('Edit entity', () => {
  });

  it('Delete entity', () => {
  });
});
