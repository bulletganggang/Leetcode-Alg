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
var merge = function(nums1, m, nums2, n) {
    let i=0,j=0
    const mergeSum = []
    while(i<m || j<n)
    {
    	if(nums1[i]<=nums2[j])
        {
            mergeSum.push(nums1[i++])
        }
        else
        {
            mergeSum.push(nums2[j++])
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
var merge = function(nums1, m, nums2, n) {
    let i=0,j=0
    const mergeSum = []
    while(i<m || j<n)
    {
        if(i===m)
        {
            mergeSum.push(nums2[j++])
        }
        else if(j===n)
        {
            mergeSum.push(nums1[i++])
        }
        else if(nums1[i]<nums2[j])
        {
            mergeSum.push(nums1[i++])
        }
        else
        {
            mergeSum.push(nums2[j++])
        }
    }

    for (let i = 0; i != m + n; ++i) {
        nums1[i] = mergeSum[i];
    }
};
```

**正确代码，空间复杂度能做到O(1)**

思路来源：[双指针技巧秒杀七道链表题目 | labuladong 的算法笔记](https://labuladong.online/algo/essential-technique/linked-list-skills-summary/#%E5%90%88%E5%B9%B6%E4%B8%A4%E4%B8%AA%E6%9C%89%E5%BA%8F%E9%93%BE%E8%A1%A8)

```js
var merge = function(nums1, m, nums2, n) {
    // 两个指针分别初始化在两个数组的最后一个元素（类似拉链两端的锯齿）
    var i = m - 1, j = n - 1;
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

比如[0,1,2,2,3,0,4,2]，删除2

当i=2时，删除了2，此时数组变成了[0,1,2,3,0,4,2]，i+1变成了3

可是i=2的时候依旧为2，没有成功删除

```js
  var removeElement = function(nums, val) {
    for(let i=0;i<nums.length;i++)
    {
        if(nums[i]=== val)
        {
            nums.splice(i,1)
        }
    }
    return nums.length
  };
```



**正确代码**

倒着来循环就不会有这样的问题了

比如[0,1,2,2,3,0,4,2]，删除2

当i=3时，删除了2，此时数组变成了[0,1,2,3,0,4]，i-1变成了2，依旧可以正确删除

后面的只是会前进，但是前面没有删除的不会有影响

```js
var removeElement = function(nums, val) {
    for(let i=nums.length-1;i>=0;i--)
    {
        if(nums[i] === val)
        {
            nums.splice(i,1)
        }
    }
    return nums.length
};
```



也可以使用双指针

第一种思路是快慢指针

快指针遇到不是需要删除的数，快慢指针都走一步

快指针遇到需要删除的数，快指针走一步

```js
var removeElement = function(nums, val) {
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
var removeElement = function(nums, val) {
    let left = 0, right = nums.length;
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

没啥好说的。。。用的是快慢指针，注意返回的是s+1就好，因为s是下标，从0计算，返回的是长度，从1计算，所以记得＋1

![img](https://labuladong.github.io/algo/images/%E6%95%B0%E7%BB%84%E5%8E%BB%E9%87%8D/1.gif)

```js
var removeDuplicates = function(nums) {
    if (nums.length === 0) {
        return 0;
    }
    let slow = 0, fast = 0;
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
```



### 多数元素

[169. 多数元素 - 力扣（LeetCode）](https://leetcode.cn/problems/majority-element/description/?envType=study-plan-v2&envId=top-interview-150)



太久没刷题，脑袋转不过来。。

题目要求的是大于数组一半长度的元素，排序之后找中间的那个数就好了。。

**我的代码，对的，但是有点多余**

```js
var majorityElement = function(nums) {
    let maxN=0,maxT=0
    let tempN=0,tempT=0
    nums.sort()
    for(let i in nums)
    {
        if(tempN !== nums[i])
        {
            tempN = nums[i]
            tempT=1
        }
        else 
        {
            tempT++
        }

        if(maxT<tempT)
        { 
            maxT = tempT
            maxN = tempN
        }
    }
    return maxN
};
```

**别人的代码，主打一个简洁**

```js
var majorityElement = function (nums) {
  nums.sort();
  return nums[Math.floor(nums.length / 2)];
};
```

还有用哈希表写的，会用C++的哈希表不会用js的。。

这种哈希表可以做到时间复杂度为 O(n)、空间复杂度为 O(n)

```js
var majorityElement = function (nums) {
    let half = nums.length / 2;
    let map = new Map;

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

第二次反转数组中0-k的数

第三次翻转数组k后面所有数

```js
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
```

这句话真的是太妙了，js比c++多的一点

```js
[nums[start++], nums[end--]] = [nums[end], nums[start]];
```



### 买卖股票的最佳时机

[121. 买卖股票的最佳时机 - 力扣（LeetCode）](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/?envType=study-plan-v2&envId=top-interview-150)

[一个方法团灭 LeetCode 股票买卖问题 | labuladong 的算法笔记](https://labuladong.online/algo/dynamic-programming/stock-problem-summary/)



看别人写的很复杂很难。。和dp有关

不过第一题还是挺简单的，不需要dp也行，一次循环中找到最低的价格，然后将每次遍历的数和当前找到的最低价格相减就可以获得最大利润

**正确代码**

```js
var maxProfit = function(prices) {
    let minP = 1e9,maxP = -1
    for(let price of prices)
    {
        minP = Math.min(minP,price)
        maxP = Math.max(maxP,price - minP)
    }
    return maxP
};
```

顺便说下let of和let in

let of 中的 i 是数组里面的**值value**

let in 中的 i 是数组里面的**下标key**



### 跳跃游戏

[55. 跳跃游戏 - 力扣（LeetCode）](https://leetcode.cn/problems/jump-game/description/?envType=study-plan-v2&envId=top-interview-150)



本质是个贪心算法，问你最远能不能到，就不断计算能跳到的最远距离

farthest = Math.max(farthest, i + nums[i]) 其实就是更新dp的最大值，最后判断dp最大值是否大于数组长度-1，即是否能到达

需要注意的是，if (farthest <= i) 此时说明可能碰到了 0，卡住跳不动了，直接return false，因为这个判断语句是在已经取过max之后的，如果还是小于i，就说明走不动了

**正确代码**

```js
var canJump = function(nums) {
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
```

farthest = Math.max(nums[i] + i, farthest); 获取每一段中走最远的距离

if (end === i) 如果end===i说明这一段中走到尽头了，就更新一下



### 除自身以外数组的乘积

[238. 除自身以外数组的乘积 - 力扣（LeetCode）](https://leetcode.cn/problems/product-of-array-except-self/description/?envType=study-plan-v2&envId=top-interview-150)



前缀和 * 后缀和，好久没有看到他们两个都想不起来了。。



**正确代码**

```js
var productExceptSelf = function(nums) {
    let lnum = [1],rnum=[]
    for(let i =1;i<nums.length;i++)
    {
        lnum[i] = lnum[i-1] *nums[i-1]
    }
    rnum[nums.length-1] = 1
    for(let i =nums.length-2;i>=0;i--)
    {
        rnum[i] = rnum[i+1] *nums[i+1]
    }
    for(let i in nums)
    {
        nums[i] = lnum[i] * rnum[i]
    }
    return nums
};
```



### 加油站

[134. 加油站 - 力扣（LeetCode）](https://leetcode.cn/problems/gas-station/description/?envType=study-plan-v2&envId=top-interview-150)



看下面解法吧

[当老司机学会了贪心算法 🤔 (qq.com)](https://mp.weixin.qq.com/s/k-z_oewAqMYc3vpmOm4gEQ)



### 反转字符串中的单词

[151. 反转字符串中的单词 - 力扣（LeetCode）](https://leetcode.cn/problems/reverse-words-in-a-string/description/?envType=study-plan-v2&envId=top-interview-150)



我觉得挺好玩的，不难，但是可以锻炼到js中的一些方法，比如trim(),split(),filter(),join()



**正确代码**

```js
var reverseWords = function(s) {
  const arr = s.trim().split(' ')
  arr.reverse()
  const newArr = arr.filter(item => item !== '')
  return newArr.join(' ')
};
```



### 两数之和

[1. 两数之和 - 力扣（LeetCode）](https://leetcode.cn/problems/two-sum/description/)

唯一真神，记得大一第一次遇见的时候写都写不出来哈哈



方法有很多，这里采取哈希表map

```js
var twoSum = function(nums, target) {
  const map = new Map()
  for (const i in nums) {
    if (map.has(nums[i])) {
      return [map.get(nums[i]),i]
    }
    map.set(target - nums[i], i)
  }
};
```



### 验证回文串

[125. 验证回文串 - 力扣（LeetCode）](https://leetcode.cn/problems/valid-palindrome/description/?envType=study-plan-v2&envId=top-interview-150)



最使用api的一集，核心就是一句话，去除首位空格，字符串全部小写，转为数组，再去除不是字母数字的字符，然后使用左右双指针即可

```js
var isPalindrome = function(s) {
  s = s.trim().toLowerCase().split('').filter(ele => (ele <= 'Z' && ele >= 'A') || (ele <= 'z' && ele >= 'a') || (ele <= '9' && ele >= '0'))
  let l = 0, r = s.length -1
  while(l <= r)
  {
    if (s[l] === s[r]) {
      l++
      r--
    } else {
      return false
    }
  }
  return true
};
```

