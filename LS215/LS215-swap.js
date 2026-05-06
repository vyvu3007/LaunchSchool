/*
input: a string 
output: a string that swap letters and numbers

Rules:
- swap letters and numbers in string
- letter is not case sensitive
- if there are non alphanumeric character keep it the same
- if there are more letters or numbers, the remainders stay the same
- return empty string if string is empty

Algorithm:
- initialize an string contains all alphabeth character from input string
- initialzie a string contains all numbers from input string
- loop through every character in input string to create a new string
  - if the current character is a number, replace it with the first character in alphabeth string
  - if the current character is an alphabeth character, replace it with the first character in number string
  - if it's neither, keep it the same, continue to next iteration
- return the transformed string
 */


function swap(str) {
  let alphabethString = str.replace(/[^a-z]/ig,"").split("")
  let numbericString = str.replace(/[^\d]/g,"").split("")
  
  return str.split("").map(currentChar => {
    if(/[a-z]/i.test(currentChar) && numbericString.length > 0) return numbericString.shift()
    else if (/[\d]/.test(currentChar) && alphabethString.length > 0) return alphabethString.shift()
    else return currentChar
  }).join("")
}

console.log(swap("1a2b3c") === "a1b2c3"); // true
console.log(swap("abcd123") === "123dabc"); // true
console.log(swap("12a") === "a21"); // true
console.log(swap("ab1") === "1ba"); // true
console.log(swap("abcd") === "abcd"); // true
console.log(swap("1") === "1"); // true
console.log(swap("ab1CD23") === "12a3DbC"); // true