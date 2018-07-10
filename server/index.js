const express = require('express');
const parser = require('body-parser');

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/../client/dist'))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})