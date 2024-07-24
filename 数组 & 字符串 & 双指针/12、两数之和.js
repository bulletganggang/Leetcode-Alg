var twoSum = function (nums, target) {
  const map = new Map();
  for (const i in nums) {
    if (map.has(nums[i])) {
      return [map.get(nums[i]), i];
    }
    map.set(target - nums[i], i);
  }
};

const nums = [3, 2, 4],
  target = 6;

console.log(twoSum(nums, target));
