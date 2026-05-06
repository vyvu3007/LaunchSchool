/*
algorithm:
1. count occurances of each number
2. return the number with the highest occurence.

Low Level:
- initialize an empty object to store occurances of each integer
- loop through each element of the array
  - if the current number is within the object, add one to its occurance
  - else add the number to object and it's first occurance
- loop through the object values to find the largest number
- return the number above
*/

function highestRank(arr) {
  let occurances = {}
  arr.forEach(number => {
    occurances[number] = (occurances[number] || 0 ) + 1
  })
  return Object.keys(occurances).reduce((highest, currentKey) => {
    if(occurances[currentKey] > occurances[highest]) return currentKey
    else if (occurances[currentKey] === occurances[highest]) return Math.max(Number(highest),Number(currentKey))
    else return highest
  })
}


console.log(highestRank([12, 10, 8, 12, 7, 6, 4, 10, 12])); // 12
console.log(highestRank([12, 10, 8, 12, 7, 6, 4, 10, 10])); // 10
console.log(highestRank([1, 2, 3, 4, 5])); // 5 (all have freq 1, 5 is largest)
console.log(highestRank([5, 4, 3, 2, 1])); // 5
console.log(highestRank([10, 10, 8, 8, 8, 10, 10])); // 10 (freq 4 vs 3)
console.log(highestRank([1, 1, 2, 2, 3])); // 2 (tie in freq, 2 > 1)