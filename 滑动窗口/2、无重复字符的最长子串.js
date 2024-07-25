/**
 * @param {string} s
 * @return {number}
 */
const s = "abcabcbb";

var lengthOfLongestSubstring = function (s) {
  let curS = "";
  let max = 0;

  for (const str of s) {
    while (curS.indexOf(str) !== -1) {
      curS = curS.slice(1);
    }
    curS += str;
    max = Math.max(max, curS.length);
  }
  return max;
};

console.log(lengthOfLongestSubstring(s));
