/* global describe before after it browser */
const puppeteer = require('puppeteer');
// const { expect } = require('chai');
const nconf = require('nconf');
const { setPageListeners } = require('../utils');

const testData = require('./testData.json');

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

    const nameSelector = '[data-id=txtName]';
    await page.waitForSelector(nameSelector);
    await page.type(nameSelector, testData.create.name);

    const summarySelector = '[data-id=txtSummary]';
    await page.type(summarySelector, testData.create.summary);

    // const descriptionSelector = '[data-id=txtDescription]';
    // await page.type(descriptionSelector, testData.create.description);
    const saveButtonSelector = '[data-id=btnSave]';
    await page.click(saveButtonSelector);

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
