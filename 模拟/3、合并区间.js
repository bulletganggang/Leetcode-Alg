/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
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
