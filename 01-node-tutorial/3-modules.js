// Node uses commonJS under the hood
//CommonJS , every file is a module (by default)   //there can be third party modules and built in modules
//Modules - Encapsulated Code (only share mininum)

const names = require('./4-names');
const sayHi = require('./5-utils');
const data = require('./6-alternative-moduleexport');
require('./7-mind-grenade');

// console.log(data);
// sayHi(names.john);
// sayHi(names.peter);
