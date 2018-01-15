const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Welcome to RPGM Frontend!'));

app.listen(3000, () => console.log('RPGM Frontend is listening on port 3000'));