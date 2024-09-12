/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
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

/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
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
