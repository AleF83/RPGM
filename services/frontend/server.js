import express from 'express';

const app = express();

app.use(express.static('public'));

app.get('/api/health', (req, res) => res.send('true'));

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => console.log(`RPGM Frontend is listening on port ${port}`));
