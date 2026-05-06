/*
input: an array of integers between 1 to n
Output: return a repeated integer

Rules: 
integer is larger than 0
integer is whole number
return null when no duplicate or empty array
integers are all positive number
return the first dubplicate

Algorithm
1 - create an object to store integers and its occurence within array
2 - loop through element of array
    - if the element is not an existing key of object add element
    and its occurence to object else add 1 to to the value of the key matching element within object
    - call function helper to check if object contains any value greater than 1
    - return element if the function helper return true
3 - return null

helper function containDuplicated(object)
- iterate through key of object
  - if value of key is greater than 1 return true
- else return false

- init integerOccurences as an empty object
- if length of array is less than 2 or input is not array, return null
- iterate through input array
  - if current element is not a key of `integerOccurrence`
   assign `integerOccurences[element]` = 1
   else assign increment the vakue at element of `integerOccurences`
  - check if invoke containDuplicated pass in current element return true
    - return current element if true
- return null
*/
function containDuplicated(object){
    for(let key in object){
      if (object[key] > 1) return true
    }
  return false
}

function firstDuplicateValue(array) {
      let integerOccurences = {}
      if(array.length <= 1 || !Array.isArray(array)) return null

      for(let index = 0; index < array.length; index += 1){
        let integer = array[index]
        integerOccurences[integer] ? integerOccurences[integer] = integerOccurences[integer] + 1 : integerOccurences[integer] = 1
        if(containDuplicated(integerOccurences)) return integer
    }
      return null
    }
    p = console.log
    p(firstDuplicateValue([2, 1, 5, 2, 3, 3, 4])); // 2
    // 2 is the first duplicate because its second appearance is at index 3,
    // which is before the second appearance of 3 at index 5.

    p(firstDuplicateValue([2, 1, 5, 3, 3, 2, 4])); // 3
    // 3 is the first duplicate because its second appearance is at index 4,
    // which is before the second appearance of 2 at index 5.

    p(firstDuplicateValue([1, 2, 3, 4, 5, 6])); // null
    p(firstDuplicateValue([])); // null
    