/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
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
