var removeDuplicates = function (nums) {
  if (nums.length === 0) {
    return 0;
  }
  let slow = 0,
    fast = 0;
  while (fast < nums.length) {
    if (nums[fast] !== nums[slow]) {
      // 维护 nums[0..slow] 无重复
      nums[++slow] = nums[fast];
    }
    fast++;
  }
  // 数组长度为索引 + 1
  return slow + 1;
};

const nums = [1, 1, 2];

console.log(removeDuplicates(nums));
