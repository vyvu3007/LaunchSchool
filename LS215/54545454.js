/*
input: an array contains list of ranges
output: an array contains numbers within input ranges

Rules:
- seperator for ranges can be - , :, ...
- the next number on the list is always largesr than number before
- single number without ranges is its self

Data structure:
array to store ranges, each range is an emenet

Algorithm:
High level:
1. create an array to store all the ranges, each range is an element
2. if the element is a single number add it to the new array
3. if the element contains -,:, or ... find the numbers within the range of the elmement
 a. make sure the numbes within the next range is larger than the number before it
4. return the new array

Low level:
- init an array to store all the ranges. splitting at ,
- init an empty array to store all numbers
- loop through each element in the array of ranges
  - if current element is a number
    - if element is first element push it to result array
    - else check element value with previous element, if it is smaller
      - concatnate the first char of previous element with current element
      and reassign it
  - if the current element contain -,:,..
    - split the current element into array contains numbers seperate by : or , or ..
    - compare the first element in


helper function generateRanges(range, number)
- init array []
- split range into array contains numbers seperate by : or , or ..
- compare the first element in array with number,
  - if element is smaller than number
    - concatnate the first char of number with current element
      and reassign it
  - if element is greater than number
  - push element to array
- compare the  element with first element
  - 
*/

function generateRanges(ranges,number){
    let array = []
    ranges = ranges.split(/[:|-]/)
    return ranges
}
// testcases
console.log(generateRanges('64:11', 9))
function createRanges(){

}
console.log(createRanges("1, 3, 7, 2, 4, 1"))
console.log(createRanges("1-3, 1-2"))
console.log(createRanges("1:5:2" ))
console.log(createRanges("104-2"))
console.log(createRanges("104-02" ))
console.log(createRanges("545, 64:11"))

// 234, 211 => (2+1)11 
//90, 1 => 