// # Supermarket (from Codewars)

// There is a queue for the self-checkout tills at the supermarket. Your task is
// write a function to calculate the total time required for all the customers to check out!

// input
// customers: an array of positive integers representing the queue. Each integer
// represents a customer, and its value is the amount of time they require to check out.
// n: a positive integer, the number of checkout tills.

// output
// The function should return an integer, the total time required.

// Clarifications
// There is only ONE queue serving many tills, and
// The order of the queue NEVER changes, and
// The front person in the queue (i.e. the first element in the array/list) proceeds to a till as soon as it becomes free.
// N.B. You should assume that all the test input will be valid, as specified above.

/*
Rules:
- The order of the queue remains the same, first person check out first until other till become free
- number represents tills will always be positive

Testcases:
queueTime([5,3,40]) // always valid input
queueTime([5,3,2,8],5) => 8

Data structure:
an array represent the customers
an array represent the tills
a number for total time it takes

{1: time, 2: time, 3: time}
{1: 5, 3, 4}
{1: 10, 2: 2, 3, 3}

// 
Checkout A | b | C
  10 | 2 | 3 
  if checkout B is not available wait for check out a
  if check out B is available and we still have more customers and check out A time is longer than current customer and next customer, use check out B.
///

Algorithm:
High level:
1. create an array for all check out tills
2. check for the smallest time take among all checkout till assign customer to that till
3.

Low level:
- init a new array length as number of till, elements are 0s
- for each number in the array assign it to the smallest number in array represent tills
- return the largest number in array of tills
  
*/
function indexOfsmallestNumber(array){
  return array.indexOf(Math.min(...array))
}
function queueTime(customers, tillCount){
  let allTills = Array(tillCount).fill(0)
  customers.forEach(currentCustomer => {
    allTills[indexOfsmallestNumber(allTills)] += currentCustomer
  })
  return Math.max(...allTills)
}

console.log(queueTime([5,3,4], 1));
// should return 12
// because when there is 1 till, the total time is just the sum of the times
// [0]
// min -> 0, index of 0 -> 0
// [5]
// [8]
//[12]
// mx -> 12
console.log(queueTime([10,2,3,3], 2));
// should return 10
// because here n=2 and the 2nd, 3rd, and 4th people in the
// queue finish before the 1st person has finished.
// 10 | 2 3 3
// [0, 0]
// [10, 0]
console.log(queueTime([2,3,10], 2));
// should return 12
// 2 10 | 3

console.log(queueTime([5,3,2,8],5)) //=> 8