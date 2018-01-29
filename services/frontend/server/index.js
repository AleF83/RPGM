import express from 'express';
import path from 'path';
import axios from 'axios';

const app = express();

const backendUrl = process.env.BACKEND_URL || 'http://backend.localtest.me:8080';

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/health', (req, res) => res.send('true'));

app.get('/api/*', (req, res) =>
  axios
    .get(`${backendUrl}${req.path}`)
    .then(r => res.send(r.data))
    .catch(e => res.send(e)));

app.listen(3000, () => console.log('RPGM Frontend is listening on port 3000'));
