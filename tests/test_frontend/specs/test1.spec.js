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
    global.browser = await puppeteer.launch();
  });

  after(async () => {
    await browser.close();
  });

  it('Test', async () => {
    const page = await browser.newPage();

    await page.goto(`${nconf.get('FRONTEND_URL')}/entity`);

    const text = await page.evaluate(() => document.body.innerHTML);

    const saveButtonSelector = '[data-id=btnSave]';
    await page.waitForSelector(saveButtonSelector);
    await page.click(saveButtonSelector);

    const messageSelector = '[data-id=message]';
    await page.waitForSelector(messageSelector);
    const message = await page.$eval(messageSelector, element => element.innerHTML);

    await page.close();

    expect(message).to.equal('The entity was created');
  });
});
