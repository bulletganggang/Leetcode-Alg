var merge = function (nums1, m, nums2, n) {
  // 两个指针分别初始化在两个数组的最后一个元素（类似拉链两端的锯齿）
  var i = m - 1,
    j = n - 1;
  // 生成排序的结果（类似拉链的拉锁）
  var p = nums1.length - 1;
  // 从后向前生成结果数组，类似合并两个有序链表的逻辑
  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[p--] = nums1[i--];
    } else {
      nums1[p--] = nums2[j--];
    }
  }
  // 可能其中一个数组的指针走到尽头了，而另一个还没走完
  // 因为我们本身就是在往 nums1 中放元素，所以只需考虑 nums2 是否剩元素即可
  while (j >= 0) {
    nums1[p--] = nums2[j--];
  }
};

const nums1 = [1, 2, 3, 0, 0, 0],
  m = 3,
  nums2 = [2, 5, 6],
  n = 3;
merge(nums1, m, nums2, n);

console.log(nums1);
