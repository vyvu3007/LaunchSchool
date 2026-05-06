function longestSubstring(str) {
  let longest = 0;
  let start = 0;
  let seen = {};
  
  for (let end = 0; end < str.length; end++) {
    let char = str[end];
    
    // If character was seen and is in current window
    if (seen[char] !== undefined && seen[char] >= start) {
      start = seen[char] + 1;  // Move start past the duplicate
    }
    
    seen[char] = end;  // Update character's last position
    longest = Math.max(longest, end - start + 1);  // Update longest
  }
  
  return longest;
}

// Test cases:
console.log(longestSubstring("abcabcbb"));    // 3 ("abc")
console.log(longestSubstring("bbbbb"));       // 1 ("b")
console.log(longestSubstring("pwwkew"));      // 3 ("wke")
console.log(longestSubstring(""));            // 0
console.log(longestSubstring("abcdef"));      // 6 ("abcdef")
console.log(longestSubstring("dvdf"));        // 3 ("vdf")