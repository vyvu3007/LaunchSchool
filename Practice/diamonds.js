/*
Diamonds
Write a function that displays a four-pointed diamond in an nxn grid,
 where n is an odd integer supplied as an argument to the function. 
 You may assume that the argument will always be an odd integer.

 Input: a number
 Output: a four-pointed diamond ina n n x n grid

 RULES:
 - n is an odd number
 - a four pointed diamond is created based on input number
 
 Testcase: (space is represent by a . for easy look up)
 diamond(5) =>
..*.. => 2 1 2
.***. => 1 3 1 
***** => 0 5 0 
.***. => 1 3 1
..*.. => 2 1 2

ALGORITHM
High level
- create a string to store result
- loop through half of input number subtract 1
  - generate a string in format space number of input number length
   and * number of index
   decrement input number length by one and number ofindex + 2
- 

HELPER function middle(number)
- return a string length of 5 and all elements are *

HELPER function topHalf(number)
- initialize `length` as round version of number divide by 2 
- initialize `diamondGrid` as an empty string
- initialize `diamonds` as 1
- iterate length number of time, starting at length and end at 0 increment by 2
  - create a string that is REPEAT length number of space, `diamonds` number of "*"
  and length number of space
  - append the string above plus inline to `diamondGrid`
  - increment diamonds by 2
- return diamondGrid

HELPER function bottomHalf(number)
- initialize `length` as round version number divide 
- initialize `diamondGrid` as an empty string
- initialize `diamonds` as number
- iterate length number of time, starting at 0 end at length decrement length by 2
  - create a string that is REPEAT length number of space, `diamonds` number of "*"
  and length number of space
  - append the string above plus inline to `diamondGrid` 
  - decrement diamond by 2
- return diamondGrid

*/

function middle(number){
    return '*'.repeat(number) + "\n"
}
function topHalf(number){
    let length = Math.floor(number /2)
    let diamondGrid = ''
    let diamond = 1
    for( let index = length; index > 0; index -- ){
        diamondGrid = diamondGrid.concat(" ".repeat(index) + "*".repeat(diamond)+ " ".repeat(diamond) +"\n"
        )
        diamond += 2
    }
    return diamondGrid
}
function bottomHalf(number){
    let length = Math.floor(number /2)
    let diamondGrid = ''
    let diamond = number - 2
    for( let index = 1; index <= length; index ++ ){
        diamondGrid = diamondGrid.concat(" ".repeat(index) + "*".repeat(diamond)+ " ".repeat(diamond) +"\n"
        )
        diamond -= 2
    }
    return diamondGrid
}
function diamond(number){
 let result = topHalf(number) + middle(number) + bottomHalf(number)
 console.log(result)
}
//console.log(bottomHalf(9))
diamond(1);
diamond(9);
/* 
logs
 *
***
 *
 
 */