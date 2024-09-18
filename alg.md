# 算法

边写边做笔记，方便准备面试的时候复习

题目大部分来自[面试经典 150 题 - 学习计划 - 力扣（LeetCode）全球极客挚爱的技术成长平台](https://leetcode.cn/studyplan/top-interview-150/)，如果有题目不在其中可能太难或者太简单。小部分来自我个人觉得有价值或者很经典的题目

## 数组 & 字符串 & 双指针

### 合并两个有序数组

[88. 合并两个有序数组 - 力扣（LeetCode）](https://leetcode.cn/problems/merge-sorted-array/)

**错误代码**

太久没做算法都忘光了。。。

请注意，双指针，一个一个走，一个到达终点，另外一个继续走

以下代码就是忘了处理当 i 或者 j 到达最大的情况

```js
var merge = function (nums1, m, nums2, n) {
  let i = 0,
    j = 0;
  const mergeSum = [];
  while (i < m || j < n) {
    if (nums1[i] <= nums2[j]) {
      mergeSum.push(nums1[i++]);
    } else {
      mergeSum.push(nums2[j++]);
    }
  }

  for (let i = 0; i != m + n; ++i) {
    nums1[i] = mergeSum[i];
  }
};
```

![gif1](https://assets.leetcode-cn.com/solution-static/88/1.gif)

**正确代码**

```js
var merge = function (nums1, m, nums2, n) {
  let i = 0,
    j = 0;
  const mergeSum = [];
  while (i < m || j < n) {
    if (i === m) {
      mergeSum.push(nums2[j++]);
    } else if (j === n) {
      mergeSum.push(nums1[i++]);
    } else if (nums1[i] < nums2[j]) {
      mergeSum.push(nums1[i++]);
    } else {
      mergeSum.push(nums2[j++]);
    }
  }

  for (let i = 0; i != m + n; ++i) {
    nums1[i] = mergeSum[i];
  }
};
```

**正确代码，空间复杂度能做到 O(1)**

思路来源：[双指针技巧秒杀七道链表题目 | labuladong 的算法笔记](https://labuladong.online/algo/essential-technique/linked-list-skills-summary/#%E5%90%88%E5%B9%B6%E4%B8%A4%E4%B8%AA%E6%9C%89%E5%BA%8F%E9%93%BE%E8%A1%A8)

```js
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
```

### 移除元素

[27. 移除元素 - 力扣（LeetCode）](https://leetcode.cn/problems/remove-element/?envType=study-plan-v2&envId=top-interview-150)

**错误代码**

这个代码的问题是，在循环中使用 `nums.splice(i, 1)` 会导致数组 `nums` 的长度发生变化，而循环的索引 `i` 却按照原始长度进行迭代，这可能会导致一些元素被跳过或重复处理。

比如[0,1,2,2,3,0,4,2]，删除 2

当 i=2 时，删除了 2，此时数组变成了[0,1,2,3,0,4,2]，i+1 变成了 3

可是 i=2 的时候依旧为 2，没有成功删除

```js
var removeElement = function (nums, val) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val) {
      nums.splice(i, 1);
    }
  }
  return nums.length;
};
```

**正确代码**

倒着来循环就不会有这样的问题了

比如[0,1,2,2,3,0,4,2]，删除 2

当 i=3 时，删除了 2，此时数组变成了[0,1,2,3,0,4]，i-1 变成了 2，依旧可以正确删除

后面的只是会前进，但是前面没有删除的不会有影响

```js
var removeElement = function (nums, val) {
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] === val) {
      nums.splice(i, 1);
    }
  }
  return nums.length;
};
```

也可以使用双指针

第一种思路是快慢指针

快指针遇到不是需要删除的数，快慢指针都走一步

快指针遇到需要删除的数，快指针走一步

```js
var removeElement = function (nums, val) {
  const n = nums.length;
  let left = 0;
  for (let right = 0; right < n; right++) {
    if (nums[right] !== val) {
      nums[left] = nums[right];
      left++;
    }
  }
  return left;
};
```

第二种思路是左右指针

当左指针小于右指针的时候

如果左指针遇到需要删除的数，变为右指针此时的数，右指针左走一步，**记住左指针此时是不会变的，因为有可能变为右指针的数依旧是需要删除的数**

如果左指针没遇到需要删除的数，就右走一步

相遇的时候就说明数组处理完毕了，右指针右边都是需要删除的数

```js
var removeElement = function (nums, val) {
  let left = 0,
    right = nums.length;
  while (left < right) {
    if (nums[left] === val) {
      nums[left] = nums[right - 1];
      right--;
    } else {
      left++;
    }
  }
  return left;
};
```

更多可以参考以下文档

[双指针技巧秒杀七道数组题目 | labuladong 的算法笔记](https://labuladong.github.io/algo/di-yi-zhan-da78c/shou-ba-sh-48c1d/shuang-zhi-fa4bd/)

### 删除有序数组中的重复项

[26. 删除有序数组中的重复项 - 力扣（LeetCode）](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/?envType=study-plan-v2&envId=top-interview-150)

**正确代码**

没啥好说的。。。用的是快慢指针，注意返回的是 s+1 就好，因为 s 是下标，从 0 计算，返回的是长度，从 1 计算，所以记得＋ 1

![img](https://labuladong.github.io/algo/images/%E6%95%B0%E7%BB%84%E5%8E%BB%E9%87%8D/1.gif)

```js
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
```

### 删除有序数组中的重复项 II

[80. 删除有序数组中的重复项 II - 力扣（LeetCode）](https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/?envType=study-plan-v2&envId=top-interview-150)

**正确代码**

依旧没啥好说的。。这还是一道中等题。。

```js
var removeDuplicates = function (nums) {
  if (nums.length == 0) {
    return 0;
  }
  let s = 0;
  for (let f = 1; f < nums.length; f++) {
    if (
      nums[s] !== nums[f] ||
      (nums[s] === nums[f] && nums[f + 1] !== nums[s])
    ) {
      nums[++s] = nums[f];
    }
  }
  return s + 1;
};
```

### 多数元素

[169. 多数元素 - 力扣（LeetCode）](https://leetcode.cn/problems/majority-element/description/?envType=study-plan-v2&envId=top-interview-150)

太久没刷题，脑袋转不过来。。

题目要求的是大于数组一半长度的元素，排序之后找中间的那个数就好了。。

**我的代码，对的，但是有点多余**

```js
var majorityElement = function (nums) {
  let maxN = 0,
    maxT = 0;
  let tempN = 0,
    tempT = 0;
  nums.sort();
  for (let i in nums) {
    if (tempN !== nums[i]) {
      tempN = nums[i];
      tempT = 1;
    } else {
      tempT++;
    }

    if (maxT < tempT) {
      maxT = tempT;
      maxN = tempN;
    }
  }
  return maxN;
};
```

**别人的代码，主打一个简洁**

```js
var majorityElement = function (nums) {
  nums.sort();
  return nums[Math.floor(nums.length / 2)];
};
```

还有用哈希表写的，会用 C++的哈希表不会用 js 的。。

这种哈希表可以做到时间复杂度为 O(n)、空间复杂度为 O(n)

```js
var majorityElement = function (nums) {
  let half = nums.length / 2;
  let map = new Map();

  for (let num of nums) {
    if (map.has(num)) {
      let currNum = map.get(num);
      map.set(num, currNum + 1);
    } else {
      map.set(num, 1);
    }

    if (map.get(num) > half) return num;
  }
};
```

### 轮转数组

[189. 轮转数组 - 力扣（LeetCode）](https://leetcode.cn/problems/rotate-array/?envType=study-plan-v2&envId=top-interview-150)

**正确代码**

数组翻转做过好几次了，不知道是哪个大神想出来的神仙想法，总的来说就是翻转三次

第一次翻转整个数组

第二次反转数组中 0-k 的数

第三次翻转数组 k 后面所有数

```js
const reverse = (nums, start, end) => {
  while (start < end) {
    [nums[start++], nums[end--]] = [nums[end], nums[start]];
  }
};

var rotate = function (nums, k) {
  k %= nums.length;
  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
};
```

这句话真的是太妙了，js 比 c++多的一点

```js
[nums[start++], nums[end--]] = [nums[end], nums[start]];
```

### 买卖股票的最佳时机

[121. 买卖股票的最佳时机 - 力扣（LeetCode）](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/?envType=study-plan-v2&envId=top-interview-150)

[一个方法团灭 LeetCode 股票买卖问题 | labuladong 的算法笔记](https://labuladong.online/algo/dynamic-programming/stock-problem-summary/)

看别人写的很复杂很难。。和 dp 有关

不过第一题还是挺简单的，不需要 dp 也行，一次循环中找到最低的价格，然后将每次遍历的数和当前找到的最低价格相减就可以获得最大利润

**正确代码**

```js
var maxProfit = function (prices) {
  let minP = 1e9,
    maxP = -1;
  for (let price of prices) {
    minP = Math.min(minP, price);
    maxP = Math.max(maxP, price - minP);
  }
  return maxP;
};
```

顺便说下 let of 和 let in

let of 中的 i 是数组里面的**值 value**

let in 中的 i 是数组里面的**下标 key**

### 跳跃游戏

[55. 跳跃游戏 - 力扣（LeetCode）](https://leetcode.cn/problems/jump-game/description/?envType=study-plan-v2&envId=top-interview-150)

本质是个贪心算法，问你最远能不能到，就不断计算能跳到的最远距离

farthest = Math.max(farthest, i + nums[i]) 其实就是更新 dp 的最大值，最后判断 dp 最大值是否大于数组长度-1，即是否能到达

需要注意的是，if (farthest <= i) 此时说明可能碰到了 0，卡住跳不动了，直接 return false，因为这个判断语句是在已经取过 max 之后的，如果还是小于 i，就说明走不动了

**正确代码**

```js
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
```

### 跳跃游戏 II

[45. 跳跃游戏 II - 力扣（LeetCode）](https://leetcode.cn/problems/jump-game-ii/description/?envType=study-plan-v2&envId=top-interview-150)

使用贪心算法

![img](https://labuladong.github.io/pictures/jumpGame/1.jpg)

比如上图这种情况，我们站在索引 0 的位置，可以向前跳 1，2 或 3 步，你说应该选择跳多少呢？

**显然应该跳 2 步到索引 2，因为 nums[2] 的可跳跃区域涵盖了索引区间 [3..6]，比其他的都大**。

这就是思路，我们用 `i` 和 `end` 标记了可以选择的跳跃步数，`farthest` 标记了所有选择 `[i..end]` 中能够跳到的最远距离，`jumps` 记录跳跃次数。

**正确代码**

```js
var jump = function (nums) {
  const n = nums.length;
  let end = 0,
    farthest = 0,
    jumps = 0;
  for (let i = 0; i < n - 1; i++) {
    farthest = Math.max(nums[i] + i, farthest);
    if (end === i) {
      jumps++;
      end = farthest;
    }
  }
  return jumps;
};
```

farthest = Math.max(nums[i] + i, farthest); 获取每一段中走最远的距离

if (end === i) 如果 end===i 说明这一段中走到尽头了，就更新一下

### 除自身以外数组的乘积

[238. 除自身以外数组的乘积 - 力扣（LeetCode）](https://leetcode.cn/problems/product-of-array-except-self/description/?envType=study-plan-v2&envId=top-interview-150)

前缀和 \* 后缀和，好久没有看到他们两个都想不起来了。。

**正确代码**

```js
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
```

### 加油站

[134. 加油站 - 力扣（LeetCode）](https://leetcode.cn/problems/gas-station/description/?envType=study-plan-v2&envId=top-interview-150)

看下面解法吧

[当老司机学会了贪心算法 🤔 (qq.com)](https://mp.weixin.qq.com/s/k-z_oewAqMYc3vpmOm4gEQ)

### 反转字符串中的单词

[151. 反转字符串中的单词 - 力扣（LeetCode）](https://leetcode.cn/problems/reverse-words-in-a-string/description/?envType=study-plan-v2&envId=top-interview-150)

我觉得挺好玩的，不难，但是可以锻炼到 js 中的一些方法，比如 trim(),split(),filter(),join()

**正确代码**

```js
var reverseWords = function (s) {
  const arr = s.trim().split(" ");
  arr.reverse();
  const newArr = arr.filter((item) => item !== "");
  return newArr.join(" ");
};
```

### 两数之和

[1. 两数之和 - 力扣（LeetCode）](https://leetcode.cn/problems/two-sum/description/)

唯一真神，记得大一第一次遇见的时候写都写不出来哈哈

方法有很多，这里采取哈希表 map

```js
var twoSum = function (nums, target) {
  const map = new Map();
  for (const i in nums) {
    if (map.has(nums[i])) {
      return [map.get(nums[i]), i];
    }
    map.set(target - nums[i], i);
  }
};
```

### 验证回文串

[125. 验证回文串 - 力扣（LeetCode）](https://leetcode.cn/problems/valid-palindrome/description/?envType=study-plan-v2&envId=top-interview-150)

最使用 api 的一集，核心就是一句话，去除首位空格，字符串全部小写，转为数组，再去除不是字母数字的字符，然后使用左右双指针即可

```js
var isPalindrome = function (s) {
  s = s
    .trim()
    .toLowerCase()
    .split("")
    .filter(
      (ele) =>
        (ele <= "Z" && ele >= "A") ||
        (ele <= "z" && ele >= "a") ||
        (ele <= "9" && ele >= "0")
    );
  let l = 0,
    r = s.length - 1;
  while (l <= r) {
    if (s[l] === s[r]) {
      l++;
      r--;
    } else {
      return false;
    }
  }
  return true;
};
```

### 判断子序列

[392. 判断子序列 - 力扣（LeetCode）](https://leetcode.cn/problems/is-subsequence/description/?envType=study-plan-v2&envId=top-interview-150)

继续双指针，一开始还以为是最长公共子序列，但发现问题在于 s 是不是 t 的子序列，s 的长度<=t 的长度，那一次遍历即可

```js
var isSubsequence = function (s, t) {
  let i = 0,
    j = 0;
  while (j < t.length) {
    if (s[i] === t[j]) i++;
    j++;
  }
  return i === s.length;
};
```

### 两数之和 II - 输入有序数组

[167. 两数之和 II - 输入有序数组 - 力扣（LeetCode）](https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/description/?envType=study-plan-v2&envId=top-interview-150)

感觉比两数之和还简单，因为是有序的，所以使用左右指针即可，而且人家刚好也要求常数级的额外空间，不能使用 map 之类的数据结构

```js
var twoSum = function (numbers, target) {
  let l = 0,
    r = numbers.length - 1;
  while (l < r) {
    if (numbers[l] + numbers[r] === target) {
      return [l + 1, r + 1];
    } else if (numbers[l] + numbers[r] < target) {
      l++;
    } else {
      r--;
    }
  }
};
```

### 验证回文串 II

[LCR 019. 验证回文串 II](https://leetcode.cn/problems/RQku0D/description/)
有点不知道这是 dp 还是贪心，核心思路就是

1. 设定左右指针，将二者分别指向字符串的两边。
2. 依次比较左右指针对应的字符是否相等。
   - 如果相等，继续比较剩下的字符。
   - 如果不相等，则分两种情况，只要有一种情况是回文字符串即可：
     - 删除左边的 left 指针指向的元素，判断 s[left+1, right] 是否回文。
     - 删除右边的 right 指针指向的元素，判断 s[left, right-1] 是否回文。

```js
var validPalindrome = function (s) {
  let left = 0,
    right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) {
      return (
        isPalindrome(s, left + 1, right) || isPalindrome(s, left, right - 1)
      );
    } else {
      left++;
      right--;
    }
  }
  return true;
};

const isPalindrome = (s, l, r) => {
  while (l < r) {
    if (s[l++] !== s[r--]) {
      return false;
    }
  }
  return true;
};
```

### 三数之和

这是个很棒的题，使用的是双指针＋排序

题目说不要求返回数组的顺序，所以思路是，首先对数组进行排序，一个 for 循环遍历，两个指针在 for 循环的数组区间内不断进行两数之和运算

```js
var threeSum = function (nums) {
  nums = nums.sort((a, b) => a - b);
  const res = [];
  for (const key in nums) {
    const value = nums[key];
    if (value > 0) break;
    if (value === nums[key - 1]) continue;

    let i = parseInt(key) + 1,
      j = nums.length - 1;
    while (i < j) {
      if (nums[i] + nums[j] + value === 0) {
        res.push([nums[i], nums[j], value]);
        i++, j--;
        while (nums[i] === nums[i - 1]) i++;
        while (nums[j] === nums[j + 1]) j--;
      } else if (nums[i] + nums[j] + value < 0) {
        i++;
      } else {
        j--;
      }
    }
  }
  return res;
};
```

## 滑动窗口

### 长度最小的子数组

[209. 长度最小的子数组 - 力扣（LeetCode）](https://leetcode.cn/problems/minimum-size-subarray-sum/description/?envType=study-plan-v2&envId=top-interview-150)

标准的滑动窗口题目
当窗口内的数大了，将当前窗口的大小和最小窗口值比较替换，同时缩小窗口
当窗口内的数小了，就扩大窗口

```js
var minSubArrayLen = function (target, nums) {
  let minLen = Infinity;
  let curSum = 0;
  const curArr = [];
  for (const num of nums) {
    curArr.push(num);
    curSum += num;
    while (curSum >= target) {
      minLen = Math.min(minLen, curArr.length);
      const firstNum = curArr.shift();
      curSum -= firstNum;
    }
  }
  return minLen === Infinity ? 0 : minLen;
};
```

### 无重复字符的最长子串

[3. 无重复字符的最长子串 - 力扣（LeetCode）](https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/?envType=study-plan-v2&envId=top-interview-150)

做了两题感觉要有个公式模板了
一个滑动窗口，一个 for 循环，在 for 循环中判断当前字符是否在滑动窗口内，**如果在就一直删除第一个字符，直到滑动窗口中没有当前字符**，不在就添加
需要注意的是判断的时机，以及记录最大/小的值的时候

```js
var lengthOfLongestSubstring = function (s) {
  let curS = "";
  let max = 0;

  for (const str of s) {
    while (curS.indexOf(str) !== -1) {
      curS = curS.slice(1);
    }
    curS += str;
    max = Math.max(max, curS.length);
  }
  return max;
};
```

### 最小覆盖子串

[76. 最小覆盖子串 - 力扣（LeetCode）](https://leetcode.cn/problems/minimum-window-substring/description/?envType=study-plan-v2&envId=top-interview-150)

很棒，第一次靠自己做出了困难题，但是也可以看出来，滑动窗口是有套路的，讲下做题思路吧

首先一个 tMap 存储 t 中所有出现的字符，然后就是经典套路 for 循环，判断当前字符是否在 t 中出现，当然这题难一点情况复杂一点，需要操作 tMap
如果出现，那么就在 tMap 中将这个数的数量-1，如果不出现，就不管

然后就是经典套路 while 循环，判断当前滑动窗口是否含有所有的字符，这里判断依靠的是 tMap 中的数是不是都小于等于 0，是的话说明已经全部出现过了，此时就不断缩小窗口，直到 tMap 中存在数大于 0

所以其实一套流程下来，可以发现套路还是挺明显的，for + while 循环，全部出现就缩小窗口，否则就扩大窗口

```js
var minWindow = function (s, t) {
  if (t.length > s.length) {
    return "";
  }

  const tMap = new Map();
  let curStr = "";
  let minStr = "";

  for (const str of t) {
    tMap.set(str, tMap.get(str) + 1 || 1);
  }

  for (const str of s) {
    curStr += str;
    if (t.indexOf(str) !== -1) {
      tMap.set(str, tMap.get(str) - 1);
    }

    // 找出当前滑动窗口是否含有所有的字符
    while (isAllIn(tMap)) {
      if (!minStr || minStr.length > curStr.length) {
        minStr = curStr;
      }
      const str = curStr[0];
      if (t.indexOf(str) !== -1) {
        tMap.set(str, tMap.get(str) + 1);
      }
      curStr = curStr.slice(1);
    }
  }
  return minStr;
};

const isAllIn = (tMap) => {
  for (const t of tMap) {
    if (t[1] > 0) {
      return false;
    }
  }
  return true;
};
```

## 哈希表

### 同构字符串 & 单词规律

[205. 同构字符串 - 力扣（LeetCode）](https://leetcode.cn/problems/isomorphic-strings/description/?envType=study-plan-v2&envId=top-interview-150)

[290. 单词规律 - 力扣（LeetCode）](https://leetcode.cn/problems/word-pattern/description/?envType=study-plan-v2&envId=top-interview-150)

两题很类似，放一起了，根本思想就是，**一一对应**

既然要一一对应，那我 map 中的 kv 就对应着两个字符串的值不就好了？

如果遍历过程中，遇到了已经有 v 的，说明之前遍历的时候就遇到并且存储了下来

那如果新遇到的 v 和存储的 v 不一样就说明不是一一对应，直接返回 false 即可，如果一样就没问题

单词的也差不多，split 一下变为数组，再继续一一对应

```javascript
var isIsomorphic = function (s, t) {
  const sMap = new Map();
  const tMap = new Map();
  for (const key in s) {
    if (sMap.has(s[key])) {
      if (sMap.get(s[key]) !== t[key]) return false;
    }
    sMap.set(s[key], t[key]);
  }
  for (const key in t) {
    if (tMap.has(t[key])) {
      if (tMap.get(t[key]) !== s[key]) return false;
    }
    tMap.set(t[key], s[key]);
  }
  return true;
};

var wordPattern = function (s, t) {
  const sMap = new Map();
  const tMap = new Map();
  t = t.split(" ");
  if (s.length !== t.length) return false;
  for (const key in s) {
    if (sMap.has(s[key])) {
      if (sMap.get(s[key]) !== t[key]) return false;
    }
    sMap.set(s[key], t[key]);
  }
  for (const key in t) {
    if (tMap.has(t[key])) {
      if (tMap.get(t[key]) !== s[key]) return false;
    }
    tMap.set(t[key], s[key]);
  }
  console.log(sMap, tMap);
  return true;
};
```

### 最长连续序列

[128. 最长连续序列 - 力扣（LeetCode）](https://leetcode.cn/problems/longest-consecutive-sequence/?envType=study-plan-v2&envId=top-interview-150)

这道题其实挺有意思的，我一开始的思路是，使用 map，记录当前数和当前数 -/+ 1，然后遍历的过程中遇到当前值在 map 中已经有了，说明是连续的数，给它加一下。但实际操作过程中很不好写

下面正确代码方法很不错，使用 set 而不是 map，并且不关心-1，只关心+1，一次遍历就能解决

```js
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
```

## 模拟

### 比较版本号

[165. 比较版本号 - 力扣（LeetCode）](https://leetcode.cn/problems/compare-version-numbers/description/)

感觉像是前端笔试或者面试会遇到的题，毕竟感觉和前端关系还挺大的

细节注意，有可能版本号长度不一样，少的补 0，得到的是字符，比较的话要转为数字

```js
var compareVersion = function (version1, version2) {
  const v1 = version1.split(".");
  const v2 = version2.split(".");
  const maxLen = Math.max(v1.length, v2.length);
  while (v1.length < maxLen) {
    v1.push("0");
  }
  while (v2.length < maxLen) {
    v2.push("0");
  }
  for (const key in v1) {
    const val1 = parseInt(v1[key]);
    const val2 = parseInt(v2[key]);
    if (val1 > val2) {
      return 1;
    } else if (val1 < val2) {
      return -1;
    }
  }
  return 0;
};
```

### 分发糖果

[135. 分发糖果 - 力扣（LeetCode）](https://leetcode.cn/problems/candy/description/?envType=study-plan-v2&envId=top-interview-150)

贪心算法，前后两次遍历，从前往后遍历的时候，得到第二个数比第一个数大的话，应该获得多少糖果，此次忽略了第三个数

从后往前遍历的时候，得到第二个数比第三个数大的话，应该获得多少糖果，左右两边情况都考虑到了

此时获取前后两个数组的数取 max 即可

```js
var candy = function (ratings) {
  const left = [],
    right = [];
  let res = 0;

  for (const key in ratings) {
    if (!key) left.push(1);
    if (ratings[key] > ratings[key - 1]) {
      left.push(left[key - 1] + 1);
    } else {
      left.push(1);
    }
  }

  for (const key in ratings.reverse()) {
    if (!key) right.push(1);
    if (ratings[key] > ratings[key - 1]) {
      right.push(right[key - 1] + 1);
    } else {
      right.push(1);
    }
  }
  right.reverse();

  for (const key in left) {
    res += Math.max(left[key], right[key]);
  }
  return res;
};
```

### 合并区间

[56. 合并区间 - 力扣（LeetCode）](https://leetcode.cn/problems/merge-intervals/description/?envType=study-plan-v2&envId=top-interview-150)

这种区间题基本就都是排序

![](assets\合并区间1.jpg)

排序完之后，找第一段区间的右值和第二段区间的左值做对比，如果大于，那说明区间可以延续

![](assets\合并区间2.jpg)

需要注意的是，有可能第二段区间比第一段区间还小，所以需要判断下两段区间的右值大小

```js
var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);

  let res = [];
  res.push(intervals[0]);

  for (let i = 1; i < intervals.length; i++) {
    const curr = intervals[i];
    let last = res[res.length - 1];
    if (curr[0] <= last[1]) {
      last[1] = Math.max(last[1], curr[1]);
    } else {
      res.push(curr);
    }
  }

  return res;
};
```

# 数据结构

## 栈

### 有效的括号

[20. 有效的括号 - 力扣（LeetCode）](https://leetcode.cn/problems/valid-parentheses/description/)

经典又熟悉的题目呀，使用栈就能解决，注意下最后返回的条件，stack 为空就行了

```js
var isValid = function (s) {
  const stack = [];
  for (const value of s) {
    if (value === "(" || value === "{" || value === "[") {
      stack.push(value);
    } else {
      const pop = stack.pop();
      if (
        (value === ")" && pop !== "(") ||
        (value === "]" && pop !== "[") ||
        (value === "}" && pop !== "{")
      ) {
        return false;
      }
    }
  }
  return !stack.length;
};
```

### 最小栈

[155. 最小栈 - 力扣（LeetCode）](https://leetcode.cn/problems/min-stack/description/?envType=study-plan-v2&envId=top-interview-150)

也不难，使用另外一个栈辅助即可，专门用来存放每次 push 进来的时候**当前栈的最小值**

```js
var MinStack = function () {
  this.stack = [];
  this.minStack = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  this.stack.push(val);
  if (!this.minStack.length) {
    this.minStack.push(val);
  } else {
    const min = this.minStack.at(-1);
    this.minStack.push(Math.min(min, val));
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.stack.pop();
  this.minStack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack.at(-1);
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.minStack.at(-1);
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
```

### 逆波兰表达式求值

[150. 逆波兰表达式求值 - 力扣（LeetCode）](https://leetcode.cn/problems/evaluate-reverse-polish-notation/description/?envType=study-plan-v2&envId=top-interview-150)

也不难，每次遇到符号的时候，就把栈顶的两个数取出来计算，需要注意的地方可能就是**向零截断** ，意思是小于 0 的时候要用 ceil，大于 0 的时候要用 floor

```js
var evalRPN = function (tokens) {
  const stack = [];
  const type = ["+", "-", "*", "/"];
  for (const token of tokens) {
    if (!type.includes(token)) {
      stack.push(token);
    } else {
      if (stack.length >= 2) {
        const b = stack.pop();
        const a = stack.pop();
        const res = cal(a, b, token);
        stack.push(res);
      } else {
        return 0;
      }
    }
  }
  return stack[0];
};

const cal = (a, b, type) => {
  switch (type) {
    case "+":
      return parseInt(a) + parseInt(b);
    case "-":
      return parseInt(a) - parseInt(b);
    case "*":
      return parseInt(a) * parseInt(b);
    case "/":
      const res = parseInt(a) / parseInt(b);
      return res >= 0 ? Math.floor(res) : Math.ceil(res);
    default:
      break;
  }
};
```

## 链表

### 环形链表

[141. 环形链表 - 力扣（LeetCode）](https://leetcode.cn/problems/linked-list-cycle/description/?envType=study-plan-v2&envId=top-interview-150)

快慢指针，快指针走两步，慢指针走一步，快指针 !== null 的时候和慢指针相遇，就说明有环

```js
var hasCycle = function (head) {
  let fast = head,
    slow = head;
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
    if (slow === fast) return true;
  }
  return false;
};
```

### 合并两个有序链表

[21. 合并两个有序链表 - 力扣（LeetCode）](https://leetcode.cn/problems/merge-two-sorted-lists/description/?envType=study-plan-v2&envId=top-interview-150)

感觉链表有个很麻烦的点，就在于需要用个虚拟头节点 dummy，进行一些奇奇怪怪的操作

这题也不难，双指针，哪个小放哪个，等某个链表全放完了可能另一个链表还有数并且都是大的，就全部放进去

```js
var mergeTwoLists = function (list1, list2) {
  let head1 = list1,
    head2 = list2;
  let dummy = new ListNode(-1),
    list = dummy;
  while (head1 !== null && head2 !== null) {
    if (head1.val < head2.val) {
      list.next = head1;
      head1 = head1.next;
    } else {
      list.next = head2;
      head2 = head2.next;
    }
    list = list.next;
  }
  if (head1 !== null) {
    list.next = head1;
  }
  if (head2 !== null) {
    list.next = head2;
  }
  return dummy.next;
};
```

### 两数相加

[2. 两数相加 - 力扣（LeetCode）](https://leetcode.cn/problems/add-two-numbers/description/?envType=study-plan-v2&envId=top-interview-150)

这题也不难，思路基本都是对的，想着是，n1 n2 都在的时候，一起加，某个链表走到尽头的时候，另外一个链表可能还有值，就拿着进位数 t 继续加，当然还有更加简便的写法，我这么写属实看上去复杂了

这里特别需要注意的是`list.next = new ListNode(p)`给这个坑死了，一开始没有创建 node 节点导致一直报错，next 需要为一个 node 节点，所以应该拿着 p 去注册 node，再进行绑定

```js
var addTwoNumbers = function (l1, l2) {
  let n1 = l1,
    n2 = l2;
  let dummy = new ListNode(-1),
    list = dummy;
  let p = 0,
    t = 0;

  while (n1 !== null && n2 !== null) {
    p = (n1.val + n2.val + t) % 10;
    t = Math.floor((n1.val + n2.val + t) / 10);
    n1 = n1.next;
    n2 = n2.next;
    list.next = new ListNode(p);
    list = list.next;
  }
  while (n1 !== null) {
    p = (n1.val + t) % 10;
    t = Math.floor((n1.val + t) / 10);
    n1 = n1.next;
    list.next = new ListNode(p);
    list = list.next;
  }
  while (n2 !== null) {
    p = (n2.val + t) % 10;
    t = Math.floor((n2.val + t) / 10);
    n2 = n2.next;
    list.next = new ListNode(p);
    list = list.next;
  }
  if (t) {
    const node = new ListNode(t);
    list.next = node;
  }
  return dummy.next;
};
```

### 反转链表

[206. 反转链表 - 力扣（LeetCode）](https://leetcode.cn/problems/reverse-linked-list/description/)

这个特别像二叉树的后序遍历，应该是一样的思想，后序遍历可以拿着最新的节点的值，来完成一些操作

这里我们就一直遍历，遍历到链表结尾的前一个，然后开始做某些操作

1. node.next.next = node，也就是链表结尾指向链表结尾的前一个，我们这里就完成了前一个数指向的改变
2. node.next = null，让链表结尾的前一个指向为空，而不是指向链表结尾，避免成环

![](assets\反转链表1.jpg)
![](assets\反转链表2.jpg)

```js
var reverseList = function (head) {
  if (head === null || head.next === null) {
    return head;
  }
  const last = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return last;
};
```

### 反转链表 II

[92. 反转链表 II - 力扣（LeetCode）](https://leetcode.cn/problems/reverse-linked-list-ii/solutions/634701/fan-zhuan-lian-biao-ii-by-leetcode-solut-teyq/?envType=study-plan-v2&envId=top-interview-150)

反转链表某一部分，就记录下 pre，succ，然后把 pre.next 拿去反转一下，再将反转过后的链表和 pre，succ 连接一下，为了记录反转链表的头尾，还会用到 left 和 right 节点

咋说呢，感觉思路不难，但是实现起来一些细节挺困难麻烦的

![](assets\反转链表 II.png)

```js
var reverseBetween = function (head, left, right) {
  // 因为头节点有可能发生变化，使用虚拟头节点可以避免复杂的分类讨论
  const dummyNode = new ListNode(-1);
  dummyNode.next = head;

  let pre = dummyNode;
  // 第 1 步：从虚拟头节点走 left - 1 步，来到 left 节点的前一个节点
  // 建议写在 for 循环里，语义清晰
  for (let i = 0; i < left - 1; i++) {
    pre = pre.next;
  }

  // 第 2 步：从 pre 再走 right - left + 1 步，来到 right 节点
  let rightNode = pre;
  for (let i = 0; i < right - left + 1; i++) {
    rightNode = rightNode.next;
  }

  // 第 3 步：切断出一个子链表（截取链表）
  let leftNode = pre.next;
  let curr = rightNode.next;

  // 注意：切断链接
  pre.next = null;
  rightNode.next = null;

  // 第 4 步：同第 206 题，反转链表的子区间
  reverseLinkedList(leftNode);

  // 第 5 步：接回到原来的链表中
  pre.next = rightNode;
  leftNode.next = curr;
  return dummyNode.next;
};

const reverseLinkedList = (head) => {
  let pre = null;
  let cur = head;

  while (cur) {
    const next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
};
```

### 删除链表的倒数第 N 个结点

[19. 删除链表的倒数第 N 个结点 - 力扣（LeetCode）](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/?envType=study-plan-v2&envId=top-interview-150)

思路不难，但是一开始没有思考清楚情况，所以还是导致写的时候出现了问题

删除倒数第 n 个节点，我们知道如何找到第 n 个节点

双指针，fast 先走 n 步，然后一起走，fast 走到尽头，那么 slow 就是倒数的第 n 个节点

![](assets\删除链表的倒数第 N 个结点.jpeg)

我在写的时候粗心了，想着要删除的是 slow 节点，那我让 slow 变为删除节点前一个就可以了，就让 fast 不走到链表结尾，而是链表结尾的前一个就好了，但实际写的时候会报错

我忽略了一个操作，可以让 slow 不从 head 开始遍历，而是像 dummy 一样，在 head 的前一位开始遍历。由于多了一位，所以当 fast 为 null 的时候，slow 刚好在删除节点的前一位

然后删除，我也处理得不好，一开始让`slow.next = fast`这个判断是错误的，fast 不一定是删除节点的下一个数，我被题的图片绕进去了。

如果 n 很大，那么 slow 和 fast 就差了 n 个数，很多很多个数，我们只删除一个，那其余的数都被忽略了，所以正确做法是`slow.next = slow.next.next`

```js
var removeNthFromEnd = function (head, n) {
  const dummy = new ListNode(-1);
  dummy.next = head;

  let slow = dummy,
    fast = head;
  while (n--) {
    fast = fast.next;
  }
  while (fast !== null) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
};
```

## 二叉树

### 对称二叉树

[101. 对称二叉树 - 力扣（LeetCode）](https://leetcode.cn/problems/symmetric-tree/?envType=study-plan-v2&envId=top-interview-150)

仿佛回到大二的时候，福利题了属于是

题很简单，就记住，二叉树遍历是为了干什么？什么情况下结束遍历(base case 是什么)？

```js
var isSymmetric = function (root) {
  return root && traverse(root.left, root.right);
};

const traverse = (left, right) => {
  if (!left && !right) return true;
  if (!left || !right || left.val !== right.val) return false;
  return traverse(left.left, right.right) && traverse(left.right, right.left);
};
```
