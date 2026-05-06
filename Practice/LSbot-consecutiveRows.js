    
    
/*
input: a number represent row numbers
output: sum of all integers in that row

Rules: each row contain even integers 
- row 1 begind with 2
- row number equal amount of number in that row.
- integers are whole number
- input is greater than 0

Algorithm:
High level:
create a loop to run until reaching the amount of rows
keep track of the numbers in each row
when at the row number the same as input number, add all numbers in that row
return the sum

- init a number to store value of current number in row starting at 0
- init a number to represent the current row
- init a value to store total sum of expected row
- create a loop run from 1 to the input row
  - init a number to track the numbers in current row = 0
  - create another loop to run until the length of the current row = input row
    - add 2 to current number in row
    - increment number to track numbers in current row
  if current row is equal expected row
  - add current nummber to total sum




   Row 1: 2
    Row 2: 4, 6
    Row 3: 8, 10, 12
    Row 4: 14, 16, 18, 20
*/
    
    
    
    function sumEvenNumberRow(rowNumber) {
      let currentNumber = 0
      let currentRow = 1
      let totalSum = 0
      while(currentRow <= rowNumber){
        let rowTrack = 1
        while(rowTrack <= currentRow){
          currentNumber += 2
          if(currentRow === rowNumber) totalSum += currentNumber
          rowTrack += 1
        }
        currentRow += 1
      }
      return totalSum
    }

    console.log(sumEvenNumberRow(1)); // 2
    console.log(sumEvenNumberRow(2)); // 10
    console.log(sumEvenNumberRow(4)); // 68