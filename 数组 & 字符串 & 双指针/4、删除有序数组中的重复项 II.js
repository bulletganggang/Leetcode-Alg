var removeDuplicates = function(nums) {
  if (nums.length == 0) {
    return 0;
  }
  let s=0
  for(let f=1;f<nums.length;f++)
  {
      if((nums[s] !== nums[f]) || (nums[s] === nums[f] && nums[f+1] !== nums[s]))
      {
          nums[++s] = nums[f]
      }
  }
  return s+1
};

const nums = [1,1,1,2,2,3]

console.log(removeDuplicates(nums))