
/*
Input: a string of words
Output: a number represent total score from list of words

- output is a total by add score of every letter
- each letter has special score
- case insensitive
- only account for alphabetic letters
- empty string is 0
- any output aside from string will be undefined

Data structure
- a number to represent total
- an object to represent letters and its value

Algorithm:
-init total as 0
-create an object contain letter and its value as key value pair
- iterate through the uppercase version of input string
  - iterate through keys of object
    - if current char is whitin value of current key
      - add it to total
- return total

HELPER function: charInWords(char, word)
  iterate over array
  if char is within array return true
*/

function charInWords(char, word){
    return word.includes(char)
}
function scrabbleScore(word) {
  const groups = {
    1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
    2: ['D', 'G'],
    3: ['B', 'C', 'M', 'P'],
    4: ['F', 'H', 'V', 'W', 'Y'],
    5: ['K'],
    8: ['J', 'X'],
    10: ['Q', 'Z']
   };
   let total = 0
   let values = Object.keys(groups)
   word.toUpperCase().split("").forEach(char => {
     for(let key of values){
          if(charInWords(char, groups[key])) total += Number(key)
     }
   })
   return total
    }

    console.log(scrabbleScore("cabbage")); // 14
    console.log(scrabbleScore("launch"));  // 11
    console.log(scrabbleScore("school"));  // 12
    console.log(scrabbleScore("quirky"));  // 22
    console.log(scrabbleScore("OXYPHENBUTAZONE")); // 41
    //scrabbleScore(""); // 0
    'IVV'.match(/([I])[V]/g)