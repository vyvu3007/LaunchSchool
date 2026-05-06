/*
INPUT: a number represent number of digits of fibonacci number
OUTPUT: index of the first fibonacci number sastify condition

generate list of binonacci number end with number of input digits
select the index of the first number
- init fibonacci = [1, 1]
- iterate fron index = 2 to infinity
  - first iteration generate number = 1 push to fibonacci
  - after that mumber equal fibonacci at index -1 + index -2
  - run the loop until 

*/
function fibonacci(number){
  let fibonacci = [1,1]
  for(let index = 2; index < number; index++){
    fibonacci.push(fibonacci[index - 1] + fibonacci[index -2])

  }
  console.log(fibonacci[fibonacci.length -1])
}

fibonacci(20);       // 6765
fibonacci(50);       // 12586269025
fibonacci(75);       // 2111485077978050