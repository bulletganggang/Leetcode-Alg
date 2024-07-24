var productExceptSelf = function (nums) {
  let lnum = [1],
    rnum = [];
  for (let i = 1; i < nums.length; i++) {
    lnum[i] = lnum[i - 1] * nums[i - 1];
  }
  rnum[nums.length - 1] = 1;
  for (let i = nums.length - 2; i >= 0; i--) {
    rnum[i] = rnum[i + 1] * nums[i + 1];
  }
  for (let i in nums) {
    nums[i] = lnum[i] * rnum[i];
  }
  return nums;
};

const nums = [1, 2, 3, 4];

console.log(productExceptSelf(nums));
