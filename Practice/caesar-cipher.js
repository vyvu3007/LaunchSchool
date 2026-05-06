/*
Input: string of letters and a number
Output: a shuffled string shifted position

Rules:
- characters in input string are shifted input number of position
- return the modify string
- only encrypt letter, not number or special chars
- case sensitive
- if character shifted exceed the alphabet, shift from the beginning

Algorithm:
- loop through input string
  - shift character in string number of position
- return string

HELPER function (letter, number){
- if letter are not in the alphabet return letter
- if letter within range of A to Z
  - add number to the code of the letter
    if the result above greater than Z, wrap around from A
  - reasign letter to the total code of letter

*/
let charCodeA = 65
let charCodeZ = 90

function encryptLetter(letter, number){
    if(/[^A-Z]/ig.test(letter)) return letter
    if(letter >= "A" && letter <= "Z" ){
        let code = letter.charCodeAt(0) + number
        if(String.fromCharCode(code) > "Z"){
            code = code - 90
        }
    }
}

console.log(encryptLetter("a", 10))

140 > 90
140 - 90 