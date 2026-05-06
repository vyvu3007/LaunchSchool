function isValidBrackets(str) {
  const stack = [];
  const pairs = {
    ')': '(',
    '}': '{',
    ']': '['
  };

  for (let char of str) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      // char is a closing bracket
      if (stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

console.log(isValidBrackets("(talk)"))
console.log(isValidBrackets("()[]{}"))
console.log(isValidBrackets("{[()]}"))
console.log(isValidBrackets("(]"))
console.log(isValidBrackets("([)]"))
console.log(isValidBrackets("{[]}"))






