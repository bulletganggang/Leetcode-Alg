/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums = nums.sort((a, b) => a - b);
  const res = [];
  for (const key in nums) {
    const value = nums[key];
    if (value > 0) break;
    if (value === nums[key - 1]) continue;

    let i = parseInt(key) + 1,
      j = nums.length - 1;
    while (i < j) {
      if (nums[i] + nums[j] + value === 0) {
        res.push([nums[i], nums[j], value]);
        i++, j--;
        while (nums[i] === nums[i - 1]) i++;
        while (nums[j] === nums[j + 1]) j--;
      } else if (nums[i] + nums[j] + value < 0) {
        i++;
      } else {
        j--;
      }
    }
  }
  return res;
};
