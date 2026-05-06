/*C can be placed before D (500) and M (1000) to make 400 and 900.
Problem:
Input: a string - represent a Roman numeral
Output: a number represent value of that Roman Numeral

Rules:
- Roman numeral values are represent by letter matches with its values
- I before V is 4
  - IF we have an I (current position) and a V after, We MUST check if there is an I before our current position 
  - IIV => 1 + 1, 2 + 1, 3 - 5 (x) XIIII
- I before X is 9
- X before L is 40
- X before C is 90
- C before D is 400
- C before M is 900
- Value of Roman numeral string is equal the total of adding values of all its characters. 
- Input is a string represent a Roman numeral
- non Roman numeral character return undefined

Test cases:
romanToInt("DCXL") => 640
romanToInt("") => undefined 
romanToInt(23) => undefined (same with special characters)
romanToInt("OO") => undefined
romanToInt("iii") => 3

IX => ['I', 'X'] =>
  'I' => 1, 'X' => 10 => '9' (10 - 1)

DCXL => [D, C, X, L] =>
  D => 500, C => 100, X => 10, L => 50
--------------------------- (-)

  DCXIIII => 612 IIX
    500 >= 100 (+) 
    100 >= 10 (+)
    10 >= 1 (+)
    1 >= 1 (+)
    1 >= 1 (+)

  DCXC => 690
  

III => 3
IV => 4
IX => 9

Data Structure:
- String (iterate)

Algorithm:
High Level:
1. For each character in the roman numeral string representation, we take it's number value from an object mapped w/ roman numeral keys, and number values

2. (IXCM) After every iteration, we need to check if our character is the same as the previous character, IF SO we increment a `checkCounter`.
  - IF our `checkCounter` is > 3, We have an invalid roman numeral
  - IF our `checkCounter` is > 1, We have an invalid roman numeral

3. Taking the current character's value, We add or subtract the next value to our total
  - If current character's value is >= next value, add
  - If current character's value is <= next value, subtract

4. return our total (number representation of the roman numeral)

Low level:
- initialize a total = 1

- For each char (index = 0)
  *check if at end of string*
  - initialize value = map[letter] (constant roman numerals key)
  - initialize letter = string[index]
  - initialize checkCounter = 0

  - IF char is equal === previous character
    - IF so, increment 'checkCounter'
    - IF our `checkCounter` is > 3 => return undefined
    - IF our `checkCounter` is > 1 => return undefined

  - IF char !== previous character => reset `checkCounter` to 0

  - IF our current index is === roman numeral's length - 1 (we are at end of string)

  - IF value >= string[index + 1], add sum of value & next value to total
  - IF value <= string[index + 1], add absolute difference of value & next value to total

- return total

*/
const romanValues = {
  M: 1000,
  MM: 2000,
  MMM: 3000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  CC: 200,
  CCC: 300,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  XX: 20,
  XXX: 30,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
  II: 2,
  III : 3
};
function charToValue(char){
  let result = 0
  Object.keys(romanValues).forEach((letter,index) => {
    result = letter === char ? romanValues[char] : result})
    return result
}

function romanToInt(string) {
  let total = 0
  let regrexRomanNumernal = /M+|CM|D|CD|XC|C+|XL|L|IX|X+|IV|V|I+/g
  return string.match(regrexRomanNumernal).reduce((total, char) => {
    return total + charToValue(char)
   },0)
 
}
function isRomanNumeral(string){
}
console.log(romanToInt("III")); // 3
console.log(romanToInt("LVIII")); // 58
console.log(romanToInt("MCMXCIV")); // 1994
console.log(romanToInt("IX")); // 9
console.log(romanToInt("IV")); // 4
