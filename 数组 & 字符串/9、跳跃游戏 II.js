var jump = function(nums) {
  const n = nums.length;
  let end = 0, farthest = 0, jumps = 0;
  for (let i = 0; i < n - 1; i++) {
      farthest = Math.max(nums[i] + i, farthest);
      if (end === i) {
          jumps++;
          end = farthest;
      }
  }
  return jumps;
};

const nums = [2,3,1,1,4]

console.log(jump(nums));