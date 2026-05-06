/*
input: a number
output: a "featured" number

rules:
- a featured is an odd number, that is multiple of 7
- all digits in featured occured only once
- return the next featured number that is greater than input num

Data structure
- number represent featured number

Algorithm
1. add one to input number 
2. check if the number sastify conditions of a featured number
3. return number

- create a loop run until number sastify all condition ( check by invoke helper function)
  - increment 1 to number
- return number

=================
helper function isFeatured(number)
- if number divide by 7 has remainder that is not 0 return false
- if number is an even number return false
- iterate through each digit in number, if current 
*/





featured(12);           // 21
featured(20);           // 21
featured(21);           // 35
featured(997);          // 1029
featured(1029);         // 1043
featured(999999);       // 1023547
featured(999999987);    // 1023456987
featured(9876543200);   // 9876543201
featured(9876543201);   // "There is no possible number that fulfills those requirements."