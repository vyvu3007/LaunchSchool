/*
 return true if string contains properly balanced parenthese
 -require matching pair

 A
 - initalize leftParanthesedCount and rightParanthesedCount
 - Iterate through string, increment according parantheses when encounter
 - if at anypoint rightParenrtheses > leftParenthese return false
 - return true

*/



// function isBalanced(string){
//   let parenthesesCount = 0
//   let falsy = true
//   string.split("").forEach(char => {
//     if(char === "(") parenthesesCount++
//     else if (char === ")") parenthesesCount--
    
//     if (parenthesesCount < 0) falsy = false
//   })
//   return (parenthesesCount === 0 && falsy)
// }



console.log(isBalanced('What (is) this?'));        // true
console.log(isBalanced('What is) this?'));         // false
console.log(isBalanced('What (is this?'));         // false
console.log(isBalanced('((What) (is this))?'));    // true
console.log(isBalanced('((What)) (is this))?'));   // false
console.log(isBalanced('Hey!'));                   // true
console.log(isBalanced(')Hey!('));                 // false
console.log(isBalanced('What ((is))) up('));       // false
