const express = require('express');
const parser = require('body-parser');
const path = require('path');
const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../client/dist'));

app.get('/cubes', (req, res) => {
  console.log("GET CUBES");
});

app.post('/cubes', (req, res) => {
  console.log("GET CUBES");
});

app.delete('/cubes', (req, res) => {
  console.log("GET CUBES");
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) res.status(500).send(err);
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
