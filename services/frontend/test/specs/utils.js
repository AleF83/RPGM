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

module.exports = { setPageListeners };
