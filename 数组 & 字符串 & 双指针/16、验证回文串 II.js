/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
  let left = 0,
    right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) {
      return (
        isPalindrome(s, left + 1, right) || isPalindrome(s, left, right - 1)
      );
    } else {
      left++;
      right--;
    }
  }
  return true;
};

const isPalindrome = (s, l, r) => {
  while (l < r) {
    if (s[l++] !== s[r--]) {
      return false;
    }
  }
  return true;
};
