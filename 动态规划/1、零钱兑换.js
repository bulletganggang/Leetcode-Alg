/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const dp = [0];
  for (let i = 1; i <= amount; i++) {
    dp[i] = Infinity;
  }
  for (let i = 1; i <= amount; i++) {
    for (const val of coins) {
      if (i >= val) {
        dp[i] = Math.min(dp[i], dp[i - val] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
};
