import express from 'express';

const app = express();

app.use(express.static('public'));

app.get('/api/health', (req, res) => res.send('true'));

app.listen(3000, () => console.log('RPGM Frontend is listening on port 3000'));
