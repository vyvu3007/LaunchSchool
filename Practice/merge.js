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

  return result
    .concat(array1.slice(i))
    .concat(array2.slice(j));}
function mergeSortIterative(arr) {
  let width = 1;

  while (width < arr.length) {
    let result = [];

    for (let i = 0; i < arr.length; i += 2 * width) {
      let left = arr.slice(i, i + width);
      let right = arr.slice(i + width, i + 2 * width);

      result = result.concat(merge(left, right));
    }

    arr = result; 
    width *= 2;
  }

  return arr;
}
   
console.log(merge([1, 5, 9], [2, 5, 8]));

