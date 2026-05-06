
// In the game of chess, a queen can attack pieces which are
// on the same row, column, or diagonal.
// Positions on the board equate to coordinate numbers.
// Given a set up like so:
//
// _ _ _ _ _ _ _ _
// _ _ _ _ _ _ _ _
// _ _ _ W _ _ _ _
// _ _ _ _ _ _ _ _
// _ _ _ _ _ _ _ _
// _ _ _ _ _ _ B _
// _ _ _ _ _ _ _ _
// _ _ _ _ _ _ _ _
//
// The white queen's position equates to (2, 3) and the black
// queen is at (5, 6). In this example the queens are on
// the same diagonal, and therefore can attack each other.
//
// Write a function which, given a string representation of
// the board with the two queens, returns true or false depending
// on whether the queens can attack each other or not.

/*
---- PROBLEM ----
- Input:
  - A string representation of a board with two queens
- Output:
  - true or false based on if the queens can attack each other
- Rules:
  - queen's coordinates are represented as (row, column)
    - the first row and column are 0
  - The queens can attack each other if they are on the:
    - same row -> Same 'row' coordinate, ex: (3, 5) and (3, 2)
    - same column -> Same 'column' coordinate, ex: (3, 5) and (7, 5)
    - same diagonal -> difference between row numbers == difference between
      column numbers, ex (2, 3) and (5, 6)
  - Board is 8x8 - coordinates span (0-7, 0-7)
  - Only queen pieces on the board
  - Queens are 'B' for black queen and 'W' for white queen
  - Queens may be missing
    - return undefined if one or both queens are missing
  - We will always be given a board

---- Data Structure ----
Board:
[
  "________",
  "________",
  "___W____",
  "________",
  "________",
  "______B_",
  "________",
  "________",
]

Coordinates:
[2, 3]

---- Algorithm ----
High Level:
1. Parse the board into the correct data structure
2. Find the queen's locations within the board
3. Stop if we don't have both queens
4. Determine if the queens can attack eachother based on coordinates

HELPER: queenCoordinates(board) => { 'W' => [2, 3], 'B' => [5, 6] }
- initialize an empty object, `coordinates`
- Iterate over the string elements of `board` using an index
    -> `row`, `rowIndex`
- For each string (row):
    - Check if 'B' is in the string
    - If it is:
        - Add 'B' key to `coordinates`
        - Set value to a coordinate pair: [`rowIndex`, index of 'B' in the
          current row] (indexOf)
    - Check if 'W' is in the string
    - If it is:
        - Add 'W' key to `coordinates`
        - Set value to a coordinate pair: [`rowIndex`, index of 'W' in the
          current row] (indexOf)
- return `coordinates

HELPER: attackableCoordiantes(coordinate1, coordinate2) => true/false
1. Check if coordinates are in the same row
  - If the first element in both arguments is the same, return true

2. Check if coordinates are in the same column
  - If the second element in both arguments is the same, return true

3. Check if coordinates are in the same diagonal
  - Calculate difference between first elements of each coordinate
  - Calculate difference between second elements of each coordinate
  - If the absolute value of the differences is the same, return true

4. If we make it to the end, return false

Detailed:
1. Parse the board into the correct data structure
  - Split the input string based on the newline characters

2. Find the queen's locations within the board
  - Use queenCoordinates, passing in our board, and get back our object with coordinates

3. Stop if we don't have both queens
  - If our coordinates object doesn't contain both a 'B' key AND a 'W' key,
    return undefined

4. Determine if the queens can attack eachother based on coordinates
  - Invoke attackableCoordinates, passing in our two coordinate values as
    arguments
  - return this return value
*/
function queenCoordinates(board){
  let cordinates = {}
  board.split(/\n/).forEach((row,index) => {
    if(row.includes("B")) cordinates["B"] = [index,row.indexOf("B") -1]
    if(row.includes("W")) cordinates["W"] = [index, row.indexOf("W") -1]
    
  })
  return cordinates
}
function attackableCoordinates(coordinate1, coordinate2){
  if(coordinate1[0] === coordinate2[0]) return true
  if(coordinate1[1] === coordinate2[1]) return true
  else if(Math.abs(coordinate1[0] - coordinate2[0]) === Math.abs(coordinate1[1] - coordinate2[1])){
      return true
    }
  return false
}
function queenAttack(board) {
  let coordinates = queenCoordinates(board)
  if(Object.keys(coordinates).length !== 2) return undefined
  return attackableCoordinates(coordinates["W"], coordinates["B"])
}
console.log(queenCoordinates("1________\n" +
                        "2________\n" +
                        "3___W____\n" +
                        "4________\n" +
                        "5________\n" +
                        "6______B_\n" +
                        "7________\n" +
                        "8________\n"))
// Diagonal Attack
console.log(queenAttack("1________\n" +
                        "2________\n" +
                        "3___W____\n" +
                        "4________\n" +
                        "5________\n" +
                        "6______B_\n" +
                        "7________\n" +
                        "8________\n") === true);

console.log(queenAttack("________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "_B______\n" +
                        "W_______\n") === true);
// Row Attack
console.log(queenAttack("________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "_B_____W\n" +
                        "________\n") === true);

console.log(queenAttack("BW______\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n") === true);
// Column Attack
console.log(queenAttack("________\n" +
                        "______W_\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "______B_\n" +
                        "________\n" +
                        "________\n") === true);

console.log(queenAttack("W_______\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "B_______\n") === true);

// No Attack
console.log(queenAttack("________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "__B_____\n" +
                        "W_______\n") === false);

console.log(queenAttack("________\n" +
                        "________\n" +
                        "______W_\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "____B___\n" +
                        "________\n") === false);

console.log(queenAttack("________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "_______B\n" +
                        "W_______\n") === false);
// Edge Cases
console.log(queenAttack("________\n" +
                        "________\n" +
                        "_____W__\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n") === undefined);

console.log(queenAttack("________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "_B______\n" +
                        "________\n") === undefined);

console.log(queenAttack("________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n") === undefined);