/**
 * @param {number[]} nums
 * @return {number}
 */

var longestConsecutive = function (nums) {
  // 转化成哈希集合，方便快速查找是否存在某个元素
  let set = new Set();
  for (let num of nums) {
    set.add(num);
  }

  let res = 0;

  for (let num of set) {
    if (set.has(num - 1)) {
      // num 不是连续子序列的第一个，跳过
      continue;
    }
    // num 是连续子序列的第一个，开始向上计算连续子序列的长度
    let curNum = num;
    let curLen = 1;

    while (set.has(curNum + 1)) {
      curNum += 1;
      curLen += 1;
    }
    // 更新最长连续序列的长度
    res = Math.max(res, curLen);
  }

  return res;
};
