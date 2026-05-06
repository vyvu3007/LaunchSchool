// Given an array of integers, nums, return the third largest number in the 
// array. If the third largest number does not exist, return the greatest 
// number.
// You are not allowed to sort the array.

function thirdMax(array){
    if(array.length < 3) return Math.max(...array)
    let largest = -Infinity
    let secondLargest = -Infinity
    let thirdLargest = -Infinity
     removeDuplicates(array).forEach(element => {
        if(element > largest) {
            thirdLargest = secondLargest
            secondLargest = largest
            largest = element
        }
        else if(element > secondLargest){
            thirdLargest = secondLargest
            secondLargest = element
        }
        else if (element > thirdLargest){
            thirdLargest = element
        }
    });
   return thirdLargest
}
function removeDuplicates(array){
    return array.reduce((total, current) => {
        if(!total.includes(current)) total.push(current)
            return total
    },[])
}



// Examples:
console.log(thirdMax([3, 2, 1]));      // Expected output: 1
console.log(thirdMax([1, 2]));         // Expected output: 2
console.log(thirdMax([2, 2, 3, 1]));   // Expected output: 1
console.log(thirdMax([10,22,3,4,523])) // Expected output: 10
console.log(thirdMax([435,34,-32]))  // Expected output: -32