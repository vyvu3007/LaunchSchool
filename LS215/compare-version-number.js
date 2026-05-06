/*
-----PROBLEM----
- Input: two version numbers in string representation, version1 and version2
- Output: one of the numbers from 1, 0, and -1; or null for invalid inputs

Rules: 
- if inputs contain invalid characters return null
- if version number begins or end with a period or has more 
than one period in a row, return null
- Compare the two input versions:
  - if version1 > version2, output 1
  - if version1 < version2, output -1
  - if version1 === version2, output 0
- to compare: 
  - version number is written by the pattern number follow by a dot and number
    - version number can contain more than 5 pattern above
    - version number can be a single number
  - to compare version number, compare the numbers according with its pattern.
  - Compare the first number of each version,
   the version is larger when the number is larger
  - if first numbers are equal compare the next number of versions and continue
  - if there are no more numbers they are assign as 0

-----DATA STRUCTURE------
array of numbers

-----ALGORITHM-----
- return null if the number format is incorrect
  - number start with a digits and end with a digits
  - number only contain digits and dots
  - we can't have two ore more dots consecutively
- convert input numbers into arrays of integers using convertNumbers(number)
- loop through the longer array parts
  - compare the two arrays parts
    - replace shorter array parts with 0,
    - if part1 > part 2 return 1
    - if part1 < part2 return 1
    - if part1 === part2 we move to the next pair of parts
  - return 0 outside of the loop
-
*/

function convertNumbers(number){

}

function validVersion(string){
    return (/[^0-9.]/g.test(string))
}

function compareVersions(version1, version2){

}
console.log(validVersion('2.a'))
console.log(compareVersions('1', '1'));            // 0
console.log(compareVersions('1.1', '1.0'));        // 1
console.log(compareVersions('2.3.4', '2.3.5'));    // -1
console.log(compareVersions('1.a', '1'));          // null
console.log(compareVersions('.1', '1'));           // null
console.log(compareVersions('1.', '2'));           // null
console.log(compareVersions('1..0', '2.0'));       // null
console.log(compareVersions('1.0', '1.0.0'));      // 0
console.log(compareVersions('1.0.0', '1.1'));      // -1
console.log(compareVersions('1.0', '1.0.5'));      // -1