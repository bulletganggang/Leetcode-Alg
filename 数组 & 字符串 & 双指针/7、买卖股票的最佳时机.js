var maxProfit = function(prices) {
  let minP = 1e9,maxP = -1
  for(let price of prices)
  {
      minP = Math.min(minP,price)
      maxP = Math.max(maxP,price - minP)
  }
  return maxP
};

console.log(maxProfit([7,1,5,3,6,4]))