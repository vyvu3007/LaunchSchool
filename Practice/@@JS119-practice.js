/*
create a function that takes a nonempty string as an argument 
and returns an array consisting of a string and an integer.
 If we call the string argument s, the string component of the
  returned array t, and the integer component of the returned
   array k, then s, t, and k must be related to each other such
    that s === t * k. The values of t and k should be the shortest
     possible substring and the largest possible repeat count
      that satisfies this equation.
      
 input: a string
 output: an array contain string and integer

 rules: 
 - output array contains string as shortest possible substring and
 integer as largest possible repeat of subtring to recreate input string
 - only lowercase letters
 
 Data structure:
 an array to store output

 Algorithm:
 high level
 1. iterate over element of input string
   b. current repeat as length of string divide by current index
   a. check if substring from 0 to current index repeat n times equal input substrin
     return an array contain substring and n repeat

   */
      
//xyzxyzxyz
//x index 0 => 8/1 = 8 x repeat 8 => xxxxx
//y index 1 =? 8 / index + 1 = 4 xy repeat 4 => xyxyxy
//xyz index 2 => 8/ index + 1 => 3 xyz repeat 3 => xyzxyzxyz
const p = console.log;


function repeatedSubstring(string){
  for(let index = 0; index < string.length; index++){
    let repeatCount = Math.floor(string.length/ (index+1))
    let currentSubstring = string.slice(0, index + 1)
    if(currentSubstring.repeat(repeatCount) === string) return [currentSubstring,repeatCount ]
  }

}
const eq = (arr1, arr2) => JSON.stringify(arr1) === JSON.stringify(arr2);

p(eq(repeatedSubstring('xyzxyzxyz'), ['xyz', 3]));
p(eq(repeatedSubstring('xyxy'), ['xy', 2]));
p(eq(repeatedSubstring('xyz'), ['xyz', 1]));
p(eq(repeatedSubstring('aaaaaaaa'), ['a', 8]));
p(eq(repeatedSubstring('superduper'), ['superduper', 1]));