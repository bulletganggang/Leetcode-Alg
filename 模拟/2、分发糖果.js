/**
 * @param {number[]} ratings
 * @return {number}
 */
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
