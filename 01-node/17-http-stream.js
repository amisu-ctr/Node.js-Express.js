let http = require('http');
let fs = require('fs');

http
  .createServer(function (req, res) {
    // const text = fs.readFileSync('./content/big.txt');  //This reads the entire content of the large file at a go
    // res.end(text); //resonse with the large contents

    // This reads the file content/data in chunks
    const filestream = fs.createReadStream('./content/big.txt', 'utf8'); //Reads data in chunks
    filestream.on('open', () => {
      filestream.pipe(res); // if we can read data in chunks then we can write in chunks too, the pipe stream helps with that
    });
    filestream.on('error', (err) => {
      res.end(err);
    });
  })
  .listen(5000);
