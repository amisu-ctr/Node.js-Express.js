const { createReadStream } = require('fs');

const stream = createReadStream('./content/big.txt', {
  highWaterMark: 600000000,
  encoding: 'utf-8',
});

stream.on('data', (result) => {
  console.log(result);
});

stream.on('error', (err) => {
  console.log(err);
});

//default 64kb
//last buffer - reminder
//highWaterMark - control size
