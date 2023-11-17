const num1 = 6;
const num2 = 9;

function sum() {
  console.log(`the sum is : ${num1 + num2}`);
}

sum();

//this module wasnt exported but was used in the other folder
//just by requiring it
//was done this way because the function was called in this folder
