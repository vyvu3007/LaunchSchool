/*
  Write a function that takes an array of strings and
   groups the anagrams together. The function should 
   return an array of arrays, where each inner array
    contains a group of anagrams. The order of the output 
    arrays and the strings within them does not matter.

-check for expected length of output array
-generate an array with the amount of nested array 
re the same as the length of output array
-loop through input array, if current element is not within any of the array above
add it to the first array index
else add it to existing array


Algorithm 
HELPER Function: expectedArray(words)
- iterate through sorted version of words
  - filter and remove any duplicate word
- return a new array with the amount of nested arrays are the length of words

- generate a new array with empty nested array by invoking `expectedArray`
- iterate through input array
  - if the current word is not in any of the subarray, add it to one
  - if the current word match with any of the subarray, add it to that subArray

*/
 function groupAnagrams(strs) {
  const groups = {};
  
  for (let str of strs) {

    const sorted = str.toLowerCase().split('').sort().join('');
  
    if (groups[sorted]) {
      groups[sorted].push(str);
    } else {
      groups[sorted] = [str];
    }
  }

  return Object.values(groups);
}
    console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
    // Expected output: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]] (order may vary)

    groupAnagrams([""]);
    // Expected output: [[""]]

    groupAnagrams(["a"]);
    // Expected output: [["a"]]

    groupAnagrams(["cab", "tin", "pew", "duh", "may", "ill", "buy", "bar", "max", "doc"]);
    // Expected output: [["cab"], ["tin"], ["pew"], ["duh"], ["may"], ["ill"], ["buy"], ["bar"], ["max"], ["doc"]] (order may vary)