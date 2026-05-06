/*
input: an array of number
Output: an array represent the product of numbers except at each element

- each sum cannot contain the product of current number
- return empty array when input array is empty or less than 2
- element can be 0
- return undefined when input is not an array
- return undefined when non numeric number in array


HELPER function totalProduct(array)
- return the total products of all element in the array

HELPER function removeElement(array, element)
- return the new array that not contain current element

Algorithm:
- create a new array by loop through input array
  - return a new number that is product of invoking totalProduct and removeelement inside 
*/


function totalProduct(array){
    return array.reduce((total, current) => total *= current)
}
function removeElement(array, element){
    return array.filter(current => current !== element)
}
function productOfOthers(numbers) {
     if(numbers.length < 2) return []
      return numbers.map(current => {
       return current = totalProduct(removeElement(numbers, current))
      })
    }

console.log( productOfOthers([1, 2, 3, 4, 5])); // [120, 60, 40, 30, 24]
console.log(productOfOthers([1, 7, 3, 4]));    // [84, 12, 28, 21]
console.log(productOfOthers([3, 2, 1]));       // [2, 3, 6]
console.log(productOfOthers([1, 0, 3, 4]));    // [0, 12, 0, 0]
console.log(productOfOthers([5]));             // []
console.log(productOfOthers([]));              // []
    