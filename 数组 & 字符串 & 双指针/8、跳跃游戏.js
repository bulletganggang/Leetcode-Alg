var canJump = function (nums) {
  let n = nums.length;
  let farthest = 0;
  for (let i = 0; i < n - 1; i++) {
    // 不断计算能跳到的最远距离
    farthest = Math.max(farthest, i + nums[i]);
    // 可能碰到了 0，卡住跳不动了
    if (farthest <= i) {
      return false;
    }
  }
  return farthest >= n - 1;
};

const nums = [2, 3, 1, 1, 4];

console.log(canJump(nums));
