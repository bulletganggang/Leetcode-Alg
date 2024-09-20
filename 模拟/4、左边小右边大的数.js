const arr = [1, 2, 3, 1, 2, 0, 5, 6];

const isOk = (arr) => {
  let maxArr = [],
    minArr = [];
  maxArr.push(arr[0]);
  minArr[arr.length - 1] = arr.at(-1);
  for (let i = 1; i < arr.length; i++) {
    const value = arr[i];
    maxArr.push(value > maxArr[i - 1] ? value : maxArr[i - 1]);
  }
  for (let i = arr.length - 2; i >= 0; i--) {
    const value = arr[i];
    minArr[i] = value < minArr[i + 1] ? value : minArr[i + 1];
  }
  for (const key in arr) {
    if (arr[key] >= maxArr[key] && arr[key] <= minArr[key]) {
      return true;
    }
  }
  return false;
};
