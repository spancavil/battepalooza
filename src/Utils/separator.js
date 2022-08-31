/**
 *
 * @param Number number without commas
 * @returns the number with commas
 */

export const separator = (Number) => {
  var str = Number.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
};
