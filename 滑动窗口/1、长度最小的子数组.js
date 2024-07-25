/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */

const nums = [2, 3, 1, 2, 4, 3];
const target = 7;

var minSubArrayLen = function (target, nums) {
  let minLen = Infinity;
  let curSum = 0;
  const curArr = [];
  for (const num of nums) {
    curArr.push(num);
    curSum += num;
    while (curSum >= target) {
      minLen = Math.min(minLen, curArr.length);
      const firstNum = curArr.shift();
      curSum -= firstNum;
    }
  }
  return minLen === Infinity ? 0 : minLen;
};

console.log(minSubArrayLen(target, nums));
