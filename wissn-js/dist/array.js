/**
 * 将类数组转为数组
 * @param {array[]} array 类数组
 * @returns Array
 */
function ArrayLike2Array(array) {
  return Array.prototype.slice.call(array)
}

module.exports = {
  ArrayLike2Array
}