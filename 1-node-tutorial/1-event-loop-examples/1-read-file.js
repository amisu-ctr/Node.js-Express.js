const { readFile } = require('fs');

console.log('started a first task');
//CHECK FILE PATH!!!!
readFile('./content/first.txt', 'utf8', (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result);
  console.log('complete frst task');
});

console.log('starting');
