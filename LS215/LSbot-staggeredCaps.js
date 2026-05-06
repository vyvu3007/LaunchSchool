/*
input: a string
output: a transformed string with uppercase and lowercase alternate

Rules: 
if string contains numbers, do not change numbers
if string contains non-alphabetic character, keep the value
each words in string are swap in order of uppercase first then lowercase 
and alternate

Data structure:
an array to store all words

Algorithm
transform the current element into its uppercase and lowercase alternate version
if the current element is not an alphabeth character do not transform it
return the string

- iterate though every character of input string to transform a new string
  - if the current character is not within the alphabeth keep the character
  - else transform the current chacracter to its uppercase version if index is even
  - lowercase version if index is odd
- return the new string

*/


function staggeredCase(string){
    return string.split("").map((char, index) => {
        if(/[^a-z]/i.test(char)) return char
        else if (index % 2 === 0) return char.toUpperCase()
        return char.toLowerCase()
    }).join("")
}

let p = console.log
p(staggeredCase('I Love Launch School!'));        // "I LoVe lAuNcH ScHoOl!"
p(staggeredCase('ALL_CAPS'));                     // "AlL_CaPs"
p(staggeredCase('ignore 77 the 444 numbers')); // "IgNoRe 77 ThE 444 NuMbErS"
p(staggeredCase('ignore 22noono talk')) //IgNoRe 22noono TaLk