/*
-----PROBLEM----
- Input: string of text
- Output: the longest sentence and its word count
- Rules: 
  - Sentence can end with period (.), exclamation points (!), or question mark (?)
  - Sentence begin with a word character
  - words are seperate by one or more spaces
  - words have alphabet characters only.

-----Algorithm

High Level:
1. Parse the text into correct data structure
2. Count the words
3. Compare words count.

HELPER FUNCTION: countWords(string) => count
- initialize count as 0
- split string into array of words
- remove non alphabet characters
- return length of array

HELPER FUNCTION seperateSentences(string) => arrayOfStrings
- initialize arrayOfSentences = []
- initialize startIndex = 0
- Iterate through string
  - if current element includes (.?!) 
    - slice text from startIndex to current index and push to `arrayOfSentences`
  - reassign startIndex equal current index  
- return arrayOfSentences


Detailed:
1. Parse the text into correct data structure
- invoke seperateSentences pass in text and assign it to `arrayOfsentences`
2. Count the words and Compare words count.
- initialize count as 0
- initialize longestText as an empty string
- iterate through `arrayOfsentences` 
  - invoke countWords pass in current string, 
    - if result is greater than `count`
      - reassign count as result
      - reassign longestText as current string

*/
let longText = 'Four score and seven years ago our fathers brought forth' +
  ' on this continent a new nation, conceived in liberty, and' +
  ' dedicated to the proposition that all men are created' +
  ' equal.' +
  ' Now we are engaged in a great civil war, testing whether' +
  ' that nation, or any nation so conceived and so dedicated,' +
  ' can long endure. We are met on a great battlefield of that' +
  ' war. We have come to dedicate a portion of that field, as' +
  ' a final resting place for those who here gave their lives' +
  ' that that nation might live. It is altogether fitting and' +
  ' proper that we should do this.' +
  ' But, in a larger sense, we can not dedicate, we can not' +
  ' consecrate, we can not hallow this ground. The brave' +
  ' men, living and dead, who struggled here, have' +
  ' consecrated it, far above our poor power to add or' +
  ' detract. The world will little note, nor long remember' +
  ' what we say here, but it can never forget what they' +
  ' did here. It is for us the living, rather, to be dedicated' +
  ' here to the unfinished work which they who fought' +
  ' here have thus far so nobly advanced. It is rather for' +
  ' us to be here dedicated to the great task remaining' +
  ' before us -- that from these honored dead we take' +
  ' increased devotion to that cause for which they gave' +
  ' the last full measure of devotion -- that we here highly' +
  ' resolve that these dead shall not have died in vain' +
  ' -- that this n';




function countWords(string){
  let count = 0
  string = string.replace(/[^a-zA-Z.\?!\s]/g,"").split(" ")
  return string.filter(word => word !== "").length
}
function seperateSentences(string){
  let arrayOfSentences = [];
  let startIndex = 0;
  string.split("").forEach((word, index) => {
    if ((".?!".includes(word))){
        arrayOfSentences.push(string.slice(startIndex, index + 1 ))
        startIndex = index + 2
    }
  })
  return arrayOfSentences
}

function longestSentence(text) {
    let arrayOfText = seperateSentences(text)
    let count = 0
    let longestText = ''
    arrayOfText.forEach(string => {
        let currentCount = countWords(string)
        if(currentCount > count) {
            count = currentCount
            longText = string
        }
    })
    console.log(longText)
    console.log(`The longest sentence has ${count} words`)
}

longestSentence(longText);
/*
2. Count the words and Compare words count.
- initialize count as 0
- initialize longestText as an empty string
- iterate through `arrayOfsentences` 
  - invoke countWords pass in current string, 
    - if result is greater than `count`
      - reassign count as result
      - reassign longestText as current string
*/
// console output
// is rather for us to be here dedicated to the great task remaining before us -- that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion -- that we here highly resolve that these dead shall not have died in vain -- that this nation, under God, shall have a new birth of freedom -- and that government of the people, by the people, for the people, shall not perish from the earth.

//e longest sentence has 86 words.


// Assuming the last sentence is removed:


// console output
//ur score and seven years ago our fathers brought forth on this continent a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal.

//e longest sentence has 30 words.