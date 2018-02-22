const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
MongoClient.connect(url, (err, client) => {
  console.log('Connected successfully to server');

  const db = client.db('rpgm');

  db
    .dropCollection('entities')
    .then(res => {
      console.log('Drop collection', res);
      return db.createCollection('entities');
    })
    .then(res => {
      console.log('Collection', res);
      client.close();
    });
});
