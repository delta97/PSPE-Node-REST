const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

const app = express();
const port = process.env.PORT;

app.use(morgan('combined', {stream: accessLogStream}));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {console.log(`listening on port ${port}`)});
