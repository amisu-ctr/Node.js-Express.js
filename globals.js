//GLOBALS

// __dirname  - path to current directory
// __filename - file name
// require    - funciton to use module (commonJs)
// module     - info about current module (file)
// process    - info about env where the program is being executed

console.log(__dirname);
console.log(__filename);
setInterval(() => {
  console.log('hello world');
}, 1000);
