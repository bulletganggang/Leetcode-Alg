var isPalindrome = function(s) {
  s = s.trim().toLowerCase().split('').filter(ele => (ele <= 'Z' && ele >= 'A') || (ele <= 'z' && ele >= 'a') || (ele <= '9' && ele >= '0'))
  let l = 0, r = s.length -1
  while(l <= r)
  {
    if (s[l] === s[r]) {
      l++
      r--
    } else {
      return false
    }
  }
  return true
};

const s = "  A man, a plan, a canal: Panama  "

console.log(isPalindrome(s))