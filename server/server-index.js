const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/../client/dist/`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
