const sortArr = [5, 1, 9, 3, 7, 2, 10, 4, 8, 6]
const binarySearchArr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

// 插入排序
// 外层一个for循环，对每个值，都与前面已经排序好的值相比，找到合适的位置插入
function InsertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const x = arr[i]
    let j = i-1   //可以发现arr[j+1]永远都是x应该插入的位置
    while (j>=0) {
      // x比前面的数小，往前面走
      if (x<arr[j]) {
        arr[j+1]=arr[j]
        j--
      }
      else break
    }
    // 找到合适的位置，插入
    arr[j+1] = x
  }
  console.log('InsertSort',arr);
}

// InsertSort(sortArr)


// 希尔排序
// 交换交换
function ShellSort(arr,n) {
  let gap = n
  while(gap>1)
  {
    gap=parseInt(gap/2)
    for (let i = 0; i < n-gap; i++) {
      if (arr[i]>arr[i+gap]) {
        [arr[i],arr[i+gap]] = [arr[i+gap],arr[i]] 
      }
    }
  }
  console.log('ShellSort',arr);
}

// ShellSort(sortArr,10)


// 选择排序
// 外层一个for循环，每次都让最小值插入当前位置
// 内层一个for循环，每次都找到最小值
function SelectSort(arr) {
  for (let i = 0; i < arr.length -1 ; i++) {
    // 定义当前下标
    let min = i
    for (let j = i+1; j < arr.length; j++) {
      // 找出最小值的下标
      if (arr[j]<arr[min]) min=j
    }
    // 将当前下标和最小值下标交换，保证升序
    if (min!==i) [arr[i],arr[min]] = [arr[min],arr[i]] 
  }
  console.log('SelectSort',arr);
}

// SelectSort(sortArr)


// 冒泡排序
// 左右两边对比交换
function BubbleSort(arr) {
  for (let i = 0; i < arr.length-1; i++) {
    let flag = 0
    for (let j = 0; j < arr.length -1 -i; j++) {
      if (arr[j]>arr[j+1])
      {
        [arr[j+1],arr[j]] = [arr[j],arr[j+1]] 
        flag=1
      }
    }
    if (!flag) break
  }
  console.log('BubbleSort',arr);
}

// BubbleSort(sortArr)


// 快排
function quickSort(array) {
  // 递归基线条件：当数组长度为 0 或 1 时，返回数组本身
  if (array.length <= 1) {
    return array;
  }

  // 选择一个基准元素（通常是数组的第一个元素）
  const pivot = array[0];

  // 将数组分为两部分：小于基准元素的部分和大于基准元素的部分
  const left = [];
  const right = [];
  for (let i = 1; i < array.length; i++) {
    if (array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }

  // 对两部分分别进行快速排序
  const sortedLeft = quickSort(left);
  const sortedRight = quickSort(right);

  // 将排序后的两部分合并为一个排序后的数组
  return [...sortedLeft, pivot, ...sortedRight];
}

// console.log(quickSort(sortArr))


// 二分查找
function binarySearch(array, target) {
  // 确定搜索范围的左右边界
  let left = 0;
  let right = array.length - 1;

  // 循环搜索，直到找到目标元素或搜索范围为空
  while (left <= right) {
    // 计算中间索引
    const mid = Math.floor((left + right) / 2);

    // 检查中间元素是否为目标元素
    if (array[mid] === target) {
      return mid;
    }

    // 如果目标元素小于中间元素，则在左半部分搜索
    else if (array[mid] > target) {
      right = mid - 1;
    }

    // 如果目标元素大于中间元素，则在右半部分搜索
    else {
      left = mid + 1;
    }
  }

  // 如果没有找到目标元素，返回 -1
  return -1;
}

// console.log(binarySearch(binarySearchArr,10));
// console.log(binarySearch(binarySearchArr,3));
// console.log(binarySearch(binarySearchArr,5));
// console.log(binarySearch(binarySearchArr,13));