// Your code goes here
// Write a function that displays an 8-pointed star in an n x n grid, where n is an odd integer that is supplied as an argument to the function.

// The smallest such star you need to handle is a 7x7 grid.
// Function Signature:
/*
Input: a number (n represent n x n grid)
output: a string (a displace of an 8-point stars
in an n x n grid)

Rules: 
n will always be an odd integer
n is greater than or equal 7

Data Structure:
- a number represent middle of n x n grid
- a string to display the star

Algorithm:
1. find the display for the top part of the star
2. find the display for the middle part of the star
3. find the display for the bottom part of the star
4. combine all three part of the star and return the string

- initialize a number to represent middle of n 
- 

helper function displayMiddle(n)
- generate a new string with n amount of *

helper function displayTopPart(middle)
- initialize string to display star
- create a loop run middle times starting at indx as 0
  - add a string with pattern is 'middle - (middle - index) of space, a *, middle - index, star, middle -index, middle - (middle - index), *,and in line

helper function displayBottomPart(middle)
- initialize string to display star
- create a loop run middle times starting at index as middle and decrement until 0
  - add a string with pattern is 'middle - (middle - index) of space, a *, middle - index, star, middle -index, middle - (middle - index), *

*/

function star(n) {
  let middlePart = displayMiddle(n)
  let middle = (n - 3) /2
  let topPart = displayTopPart(middle)
  let bottomPart = displayTopPart(middle).reverse()
  topPart.forEach(line => console.log(line))
  console.log(middlePart)
  bottomPart.forEach(line => console.log(line))
}
function displayMiddle(n){
  return new Array(n).fill("*").join("")
}
function displayTopPart(middle){
  let displayString = []
  for(let index = 0; index <= middle; index++){
    // console.log(displayString)
    displayString.push(" ".repeat(middle - (middle - index)) + "*" 
                       + " ".repeat(middle - index)  + "*" 
                       + " ".repeat(middle - index) + "*" 
                       + " ".repeat(middle - (middle - index) + "\n"))

    //console.log(displayString);
  }
   return displayString
}

function star(n) {
  let middle = Math.floor(n / 2);

  for (let row = 0; row < n; row++) {
    if (row === middle) {
      console.log('*'.repeat(n));
      continue;
    }

    let outerSpaces = Math.abs(middle - row) - 1;
    let innerSpaces = middle - 1 - outerSpaces;
//                      4 - 1 - 1 => 2
    let line = ' '.repeat(outerSpaces) + '*' +
               ' '.repeat(innerSpaces) + '*' +
               ' '.repeat(innerSpaces) + '*';
    console.log(line);
  }
}

// Test Cases:
star(7);
//*  *  * // * 2 blanks * 2 blanks *
// * * * // blank * blank * blank * blank
//  ***
//******
//  ***
// * * *
//*  *  *
star(9);
//*   *   * // - 3 * n -3 / 2 * n -3 /2 *
// *  *  * // - 2 
//  * * * //  n - 3 / 2 - 1
//   ***  //  n -3 / 2 *** n - 3 / 2
//*********  // n
//   ***
//  * * *
// *  *  *
//*   *   *
