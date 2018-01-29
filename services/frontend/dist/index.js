

const _express = require('express');

const _express2 = _interopRequireDefault(_express);

const _path = require('path');

const _path2 = _interopRequireDefault(_path);

const _axios = require('axios');

const _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const app = (0, _express2.default)();

const backendUrl = process.env.BACKEND_URL || 'http://backend.localtest.me:8080';

app.use(_express2.default.static(_path2.default.join(__dirname, 'build')));

app.get('/api/health', (req, res) => res.send('true'));

app.get('/api/*', (req, res) => _axios2.default
  .get(`${backendUrl}${req.path}`)
  .then(r => res.send(r.data))
  .catch(e => res.send(e)));

app.listen(3000, () => console.log('RPGM Frontend is listening on port 3000'));
