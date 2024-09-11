/**
 * @param {string[]} tokens
 * @return {number}
 */
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
