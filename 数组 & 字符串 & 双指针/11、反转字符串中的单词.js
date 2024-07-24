var reverseWords = function (s) {
  const arr = s.trim().split(" ");
  arr.reverse();
  const newArr = arr.filter((item) => item !== "");
  return newArr.join(" ");
};

const s = "  hello world  ";

console.log(reverseWords(s));
