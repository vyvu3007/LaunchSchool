/*
Input: 
- a number represent number of switches
Output: 
- an array of numbers are on after toggles

Rules:
- switches are numbered from 1 to n (n is input)
- switches are connected to lights that are off initialy
- switches are toggles n times, with increment by 1 each time starting at 1
- with each pass, switches number that can be divide by the nth around are toggles
- return the array that represent the lights that are on after n number of toggles

High level
- create a loop that run n times
  - loop through an array that represent any number can be divide by 
   - toggle all switches that match number with array above
- return the new array

HELPER FUNCTION generateArray(number)
- return a new array has length of number
  - array contains list of 0s

HELPER FUNCTION findToggleList(number)
- Create a an array contain list of number that can be divide by `number
- list should not contain 1 
- array length is number and start from 1
- return the above array

ALGORITHM:
- invoke generateArray(number) and asssign it to switches
- Iterate from 1 to number including number
  - initialize toggleList as the result of invoke findToggleList() pass in current number
  - iterate through toggleList with current element as toggleNum
    - iterate through `switches`
      - return a map array of current switch index + 1 that
      can be divide with current element of toggleList, current switch toggled
    - reassign the result of the iteration above to switches
- reutrn switches
        
*/

function generateArray(number){
    return [...Array(number)].map(num => num = 0)
}
function lightsOn(array) {
  return array.map((light, index) => light ? index + 1 : null)
  .filter(value => value !== null);
}

function toggleLights(number){
    let switches = generateArray(number)
    for(let index = 1; index <= number; index++){
        switches = switches.map((currentSwitch, id) => {        
            if((id + 1) % index === 0){
                return currentSwitch === 0 ? 1 : 0
            }
            return currentSwitch
        })
    }
    return  lightsOn(switches)
  
}
console.log(toggleLights(5))