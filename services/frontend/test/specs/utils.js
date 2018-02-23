const { expect } = require('chai');

const setPageListeners = (page) => {
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
};

const assertLabelValue = async (page, selector, expectedValue) => {
  await page.waitForSelector(selector);

  const name = await page.$eval(selector, lbl => lbl.innerHTML);
  expect(name).to.equal(expectedValue);
};

const assertTextFieldValue = async (page, selector, expectedValue) => {
  await page.waitForSelector(selector);

  const name = await page.$eval(selector, lbl => lbl.value);
  expect(name).to.equal(expectedValue);
};

module.exports = { setPageListeners, assertLabelValue, assertTextFieldValue };
