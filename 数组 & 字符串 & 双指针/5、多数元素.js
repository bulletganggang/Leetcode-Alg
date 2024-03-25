var majorityElement = function (nums) {
  nums.sort();
  return nums[Math.floor(nums.length / 2)];
};

const nums = [2,2,1,1,1,2,2]

console.log(majorityElement(nums))