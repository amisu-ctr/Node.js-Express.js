//This is better than the callback hell in the 11-fs-async.js
//demonstrates the benefit of async patterns such as aync/await and promises

const { readFile, writeFile } = require('fs').promises;
// const util = require('util');
// const readFilePromise = util.promisify(readFile);
// const writeFilePromise = util.promisify(writeFile);

const start = async () => {
  try {
    const first = await readFile('./content/first.txt', 'utf-8');
    const second = await readFile('./content/second.txt', 'utf-8');
    await writeFile(
      './content/result-mind-grenade.txt',
      `THIS IS AWESOME : ${first} ${second} `,
      { flag: 'a' }
    );
    console.log(first, second);
  } catch (error) {
    console.log(error);
  }
};

start();

// const getText = (path) => {
//   return new Promise((resolve, reject) => {
//     readFile(path, 'utf-8', (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// };

//use the try catch block anytime you have an async await to
//have more control when there is an error
// const start = async () => {
//   try {
//     const first = await getText('./content/first.txt');
//     const second = await getText('./content/second.txt');
//     console.log(first, second);
//   } catch (error) {
//     console.log(error);
//   }
// };

// start();

// const start = async () => {
//   const first = await getText('./content/first.txt');
//   console.log(first);
// };
// start();

// getText('./content/first.txt')
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));
