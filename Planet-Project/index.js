// https://csv.js.org/parse/
const { parser } = require('csv-parse')
const fs = require('fs')
// https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options

const results = [];
fs.createReadStream('kepler_data.csv')
.on('data', (data) => {
    results.push(data)
})
.on('error', (err) => {
    console.log(err)
})
.on('end', () => {
    console.log(results);
    console.log('done')
});

