/**
 *
 * @param Coins number of Ncoins
 * @returns the number with commas
 */

export const separator = (Coins) => {
  var str = Coins.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
};
