const path = require('path');
console.log(path.sep); //returns path sign

const filePath = path.join('/content/', 'subfolder', 'test.txt');
console.log(filePath); // \content\subfolder\test.txt

const base = path.basename(filePath);
console.log(base); //test.txt

const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt');
console.log(absolute); // C:\Users\DELL VENUE 11 PRO\desktop\Node.js-Express.js\content\subfolder\test.txt
