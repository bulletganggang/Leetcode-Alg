/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const len = nums.length;
  if (!len) return 0;
  if (len === 1) return nums[0];
  const dp = [];
  dp[0] = nums[0];
  dp[1] = Math.max(nums[1], dp[0]);
  for (let i = 2; i < len; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }
  return dp[len - 1];
};
