  /*
  Input: an array of numbers
  Output: a number represent missing integer

  Rules: 
  - sequence start at 0
  - if there are no missing integer return the next number in the sequence
  - if an array is empty return 0
  - if input is invalid return undefined
  - what happen if input in array is not a number?
  - what happen if we are missing more than one integer


  Data Structure:
  - an array of numbers follow sequence

  Algorithm
  - find the largest number in the array
  - loop to longest number, if that number is not within array, return it
  - if not missing number return the next number of the sequence

  */
  
  
  
  
  function findMissingNumber(numbers) {
      let missingNumbers = []
      let largestNumber = numbers.reduce((largeNum, num) => largeNum > num ? largeNum : num)
      for(let index = 0; index <= largestNumber; index++){
        if(!numbers.includes(index)) missingNumbers.push(index)
      }
      return missingNumbers.length === 0 ? largestNumber + 1 : missingNumbers
    }

    console.log(findMissingNumber([3, 0, 1])); // 2
    console.log(findMissingNumber([9, 6, 4, 3, 5, 7, 0, 1])); // 8
    console.log(findMissingNumber([0])); // 1
    console.log(findMissingNumber([1])); // 0
    console.log(findMissingNumber([0, 1])); // 2