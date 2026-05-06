/*
Write a function that takes two sorted arrays as arguments and returns a new array that contains all the elements from both input arrays in sorted order.

You may not provide any solution that requires you to sort the result array. You must build the result array one element at a time in the proper order.

Your solution should not mutate the input arrays.

Rules:
-Two input arrays are sorted
- 
*/

function merge(array1, array2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < array1.length && j < array2.length) {
    if (array1[i] <= array2[j]) {
      result.push(array1[i]);
      i++;
    } else {
      result.push(array2[j]);
      j++;
    }
  }
  // Add remaining elements
  return result.concat(array1.slice(i)).concat(array2.slice(j));
}

console.log(merge([1, 5, 9], [2, 6, 8]))
console.log(merge([], [1, 4, 5]));