const reverse = (nums, start, end) => {
  while(start < end){
      [nums[start++], nums[end--]] = [nums[end], nums[start]];
  }
}

var rotate = function(nums, k) {
  k %= nums.length;
  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
};

const nums = [1,2,3,4,5,6,7], k = 3
rotate(nums, k)

console.log(nums)