const http = require('http');

// const server =  https.createServer((req, res) => {
//     res.end('Welcome')
// })

//USING Event Emitter API
const server = http.createServer(); //Didnt use call back here like previous example
// emits request event
// subscribe to it / listen for it / respond to it
server.on('request', (req, res) => {
  res.end('Welcome Home');
});

server.listen(5000);
