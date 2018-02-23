/* global describe before after it browser */
const puppeteer = require('puppeteer');
const nconf = require('nconf');
const { setPageListeners, assertLabelValue, assertTextFieldValue } = require('../utils');

const testData = require('./testData.json');

nconf.argv().env().defaults({ FRONTEND_URL: 'http://localhost' });

const createEntity = async (page, entity) => {
  const createButtonSelector = '#btnNew';
  await page.waitForSelector(createButtonSelector);
  await page.click(createButtonSelector);

  const nameSelector = '#txtName';
  await page.waitForSelector(nameSelector);
  await page.type(nameSelector, entity.name);

  const summarySelector = '#txtSummary';
  await page.type(summarySelector, entity.summary);

  // const descriptionSelector = '[data-text=true]';
  // await page.type(descriptionSelector, entity.description);
  const saveButtonSelector = '#btnSave';
  await page.click(saveButtonSelector);
};

const deleteEntity = async (page) => {
  const deleteButtonSelector = '#btnDelete';
  await page.waitForSelector(deleteButtonSelector);
  await page.click(deleteButtonSelector);
};

describe('Entity CRUD flows', () => {
  before(async () => {
    const executablePath = nconf.get('CHROMIUM_BROWSER_PATH');
    const args = ['--disable-dev-shm-usage'];
    const launchOptions = executablePath ? { executablePath, args } : {};

    global.browser = await puppeteer.launch(launchOptions);
  });

  after(async () => {
    try {
      await browser.close();
    } catch (e) {
      console.log(e);
    }
  });

  it('Create new entity', async () => {
    const page = await browser.newPage();
    setPageListeners(page);
    await page.goto(`${nconf.get('FRONTEND_URL')}/entity`);

    await createEntity(page, testData.create);

    await assertLabelValue(page, '#lblName', testData.create.name);
    await assertLabelValue(page, '#lblSummary', testData.create.summary);
    // await assertLabelValue(page, '[data-text=true]', testData.create.description);
    await deleteEntity(page, testData.create.name);

    await page.close();
  });

  it('Edit entity', async () => {
    const page = await browser.newPage();
    setPageListeners(page);
    await page.goto(`${nconf.get('FRONTEND_URL')}/entity`);

    await createEntity(page, testData.create);

    const editButtonSelector = '#btnEdit';
    await page.waitForSelector(editButtonSelector);
    await page.click(editButtonSelector);

    await assertTextFieldValue(page, '#txtName', testData.edit.name);
    await assertTextFieldValue(page, '#txtSummary', testData.edit.summaryOld);
    // await assertLabelValue(page, '[data-text=true]', testData.edit.description);
    await page.type('#txtSummary', testData.edit.summaryAddition);

    const saveButtonSelector = '#btnSave';
    await page.waitForSelector(saveButtonSelector);
    await page.click(saveButtonSelector);

    await assertLabelValue(page, '#lblName', testData.edit.name);
    await assertLabelValue(page, '#lblSummary', testData.edit.summaryNew);
    // await assertLabelValue(page, '[data-text=true]', testData.edit.description);
    await page.close();
  });
});
