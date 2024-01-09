const express = require('express');
const path = require('path')

const api = express()

api.use(express.static(path.join(__dirname, 'public')));

api.use('/', express.static('index.html'))

// api.listen(4000, () => {
//     console.log('Listening on port 4000')
// });

module.exports = api;