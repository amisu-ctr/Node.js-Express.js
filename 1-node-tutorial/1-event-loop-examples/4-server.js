const http = require('http');

const server = http.createServer((req, res) => {
  console.log('request event');
  res.end('hello world');
});

server.listen(5000, () => {
  console.log('Server listening on port : 5000');
});

//server.listen just tells event loop to keep listening for
//requests on that port and immediately they match respond
