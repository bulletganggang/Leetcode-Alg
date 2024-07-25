/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
const s = "ADOBECODEBANC",
  t = "ABC";

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

console.log(minWindow(s, t));
