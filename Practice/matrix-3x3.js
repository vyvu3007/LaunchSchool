/*
loop through the matrix
  loop through every array in matrix
    keep track of two indexes, switch them and assign the number at that posion to newARr


- init new array calls newMatric with 3 empty nested array
  - iterate through matrix starting at index = 0 to length of matrix
    - iterate through matric starting at jdx = 0  to length of current array
      - assign the current value of matrix at idx jdx position
      newMatrix jdx idx position
return the new matrix

*/ 
function transpose(matrix){
    let newMatrix = [...Array(matrix[0].length)].map(element => element = [])
    for(let idx = 0; idx < matrix.length; idx ++){
        for(let jdx = 0; jdx < matrix[idx].length; jdx++){
            newMatrix[jdx][idx] = matrix[idx][jdx]
        }
    }
    return newMatrix
}
const matrix = [
  [1, 5, 8],
  [4, 7, 2],
  [3, 9, 6]
];

const newMatrix = transpose([[1], [2], [3], [4]]);

console.log(newMatrix);      // [[1, 4, 3], [5, 7, 9], [8, 2, 6]]
//console.log(matrix);         // [[1, 5, 8], [4, 7, 2], [3, 9, 6]]


//[0][0] [1][0] [2][0]
//[0][1] [1][1] [2][1]
//[0][2] [1][2] [2][2

//[0][0] [0][1] [0][2]
// loop through array => loop through first index [idex] = 0 idx = 1
//add that to new array [1][0]