  /*
   Write a function that takes an array of integers and a 
   target integer. The function should find two different
    numbers in the array that add up to the target value. 
    The function should return an array containing the two
    numbers in any order. If no two numbers sum up to the 
 target value, return an empty array. You may not use 
    the same element twice.



iterate through input array
 iterate through input array 
   -compare numbers in array if two nubmers add up to be input number
   return the two numbers

init result array
iterate through list of numbers starting at index = 0
  itertate through list of number starting at jdx = index + 1
   if number at idx and number at jdx at up to input number
   return the array contains two numbers

  */
  
  
  
  
  function findPair(numbers, target) {
      for(let idx = 0; idx < numbers.length; idx++){
        for(let jdx = idx + 1; jdx < numbers.length; jdx++){
            if(numbers[idx] + numbers[jdx] === target) return [numbers[idx], numbers[jdx]]
        }
      }

    }

    console.log( findPair([4, 6], 10)); // [11, -1] or [-1, 11]
    findPair([4, 6], 10); // [4, 6] or [6, 4]
    findPair([4, 6, 1], 5); // [4, 1] or [1, 4]
    findPair([1, 2, 3, 4, 5], 10); // []
    findPair([10, 5, 2, 3, 7, 5], 10); // [3, 7] or [7, 3]