const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');


const app = express();
const port = process.env.PORT || 3000;

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));

app.get('/', async (req, res) => {
  
  const readStream = fs.createReadStream(path.join(__dirname, 'access.log'));

  let streamoutput = '';

  await readStream.on('data', (data) => {
    streamoutput += data;
    res.write(streamoutput);
  }).on('end', () => {
    console.log('done');
    res.end('done');
  });

});

app.listen(port, () => {console.log(`listening on port ${port}`)});
