 
 /*
Imagine a sequence of consecutive even integers beginning 
with 2. The integers are grouped into rows, with the first
 row containing one integer, the second row two integers, 
 the third row three integers, and so on. Given an integer
  representing the row number, your task is to return the 
  sum of the integers in that row.

   Row 1: 2
   Row 2: 4, 6
   Row 3: 8, 10, 12
   Row 4: 14, 16, 18, 20
   [2][4,6][8,10,12][14, 16, 18, 20]
   total = 0 
   numberOfRows: 1 until this equal numberOfRows
   loop = numberOfRows
   currentNumber = 2 
   total += currentNumber
   currentNumber += 2

Algorithm
- initialize total as 0
- initialize numberofRows as 1
- initialize currentNumber = 2
- WHILE numberofRows is less than or equal input number
  - iterate through numberOfRows
      add currentNumber to tal
      increment currentNumber by 2
  - increment numberOfRows by 1
    
 */
 function sumEvenNumberRow(rowNumber){
    let total = 0
    numberOfRows = 1
    currentNumber = 2
    while(numberOfRows <= rowNumber){
        let currentSum = 0
        for(let index = 0; index < numberOfRows; index++){
            currentSum += currentNumber
            currentNumber = currentNumber + 2
        }
        total = currentSum
        numberOfRows++
    }
    return total
 }
 

    console.log(sumEvenNumberRow(4)); // 2
    console.log(sumEvenNumberRow(2)); // 10
    sumEvenNumberRow(4); // 68