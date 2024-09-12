/**
 * @param {string} s
 * @return {boolean}
 */
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
