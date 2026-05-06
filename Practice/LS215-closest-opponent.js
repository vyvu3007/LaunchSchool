/*
Input: an object represent opponents and their position
Output: a position

rules:
- return the position of the closest opponent
- if two opponents have the same distance, return the higher opponent
- if position of opponent is null, ignore

Data structure:
- a number for the closest distance
- a string represent the closest opponent

Algorithm:
1. with every positions of the opponents
  a. check if the position is the smallest compare to final position
  b. keep track of the opponent with the smallest distance 
  c. if there are two opponents with the same smallest distance, 
  the closest opponent is the one with higher position 
2. return the opponent with the smallest distance

Low level
1. init `smallestDistance` as an positive infinity number
2. init `closetOpponent` as an empty string
3. with each values in positions
  a. compare the final position minus current value with the smallest distance
    a1. update smallestDistance if the value of smallestDistance is larger
  b. if equal comapre the current value and value at index of `closestOpponent` in `position`
    assign `closest opponent to the one with greater value.
4. return `closestOpponent`

 */




function findClosestOpponent(positions, position) {
  let smallestDistance = Infinity
  let closestOpponent = ""
  for(let key in positions){
    let value = positions[key]
    let distance = Math.abs(position - value)
    if(distance < smallestDistance) {
        smallestDistance = distance
        closestOpponent = key
    }
    if(distance === smallestDistance){
       closestOpponent = positions[closestOpponent] > value ? closestOpponent : key
    }
  }
  return positions[closestOpponent]
}

console.log(findClosestOpponent({
  "Opponent 1" : 1,
  "Opponent 2" : 15,
  "Opponent 3" : 37
}, 10)); // 15

console.log(findClosestOpponent({
  "Opponent 1a" : 1,
  "Opponent 1b" : 5
}, 3)); // 5

console.log(findClosestOpponent({
  "Opponent 1a" : 1, "Opponent 1b" : 5,
  "Opponent 1c" : 50, "Opponent 1d" : null, "Opponent 1e" : 100
}, 150)); // 100