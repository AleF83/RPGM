/* eslint-disable no-console */
const { expect } = require('chai');

const setPageListeners = (page) => {
  page.on('console', msg => console.log('PAGE LOG:', msg.text));

  page.on('pageerror', (error) => {
    console.log('pageerror:', error.message);
  });

  page.on('request', (request) => {
    if (!request.url.includes('backend')) {
      return;
    }
    const {
      url, method, headers, postData,
    } = request;
    console.log('================ REQUEST ============================');
    console.log('URL:', url);
    console.log('METHOD:', method);
    console.log('HEADERS:', headers);
    if (postData) {
      console.log('POST DATA:', postData);
    }
    console.log('============== END REQUEST ==========================');
  });

  page.on('response', async (response) => {
    try {
      if (!response.url.includes('backend')) {
        return;
      }

      const resText = await response.text();
      const { url, headers, status } = response;
      console.log('================ RESPONSE ============================');
      console.log('URL:', url);
      console.log('STATUS:', status);
      console.log('HEADERS:', headers);
      console.log('TEXT:', resText);
      console.log('============== END RESPONSE ==========================');
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
