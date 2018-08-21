const express = require('express');
const parser = require('body-parser');
const path = require('path');
const app = express();
const dbControllers = require('./db/controllers/etherCubeControllers.js');

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/../client/dist'));

app.get('/cubes', (req, res) => {
  dbControllers.get(req, res);
});

app.post('/cubes', (req, res) => {
  dbControllers.post(req, res);
});

app.delete('/cubes', (req, res) => {
  dbControllers.delete(req, res);
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) res.status(500).send(err);
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});