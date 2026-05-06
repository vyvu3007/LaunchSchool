/*
input: an array of number
output: an array of count of the number that is smaller than current number

Rules:
input array can contains duplicated values
negative numbers are allowed
length of output array must be equal array
output array represents the count of numbers strictly less than current number

Test cases:
[] => []

Data struture
- an array for sorted version of input array
- an array to store output array

Algorithm:

High level
1. create a sorted version of input array 
2. with each element of input array, find the index of current element in sorted version of input array
  a. add the index above to a new array
3. return the new array

Low level
1. init a new empty array to store final result
2. initialize sortedArr as a sorted version of input array from smallest to largest
3. iterate through each element of input array
  a. find the index of current element within sortedArr and push to final result array
4. return the final result array
*/

function smallerNumbersThanCurrent(array){
    let sortedArray = array.slice().sort((a,b) => a - b).reduce((total,number) => {
        if(!total.includes(number)) total.push(number)
            return total
    },[])
   return array.map(currentNumber => sortedArray.indexOf(currentNumber))
}





console.log(smallerNumbersThanCurrent([8, 1, 2, 2, 3])); // Expected output: [3, 0, 1, 1, 2]
console.log(smallerNumbersThanCurrent([7, 7, 7, 7]));    // Expected output: [0, 0, 0, 0]
console.log(smallerNumbersThanCurrent([6, 5, 4, 8]));    // Expected output: [2, 1, 0, 3]
console.log(smallerNumbersThanCurrent([1]));             // Expected output: [0]

// when the numbers are negative
console.log(smallerNumbersThanCurrent([1, -4, -5]));             // Expected output: [2, 1, 0]
console.log(smallerNumbersThanCurrent([1, 9, 0, -5]));             // Expected output: [2, 3, 1, 0] []