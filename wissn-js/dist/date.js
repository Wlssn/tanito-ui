/**
 * 获取日期
 * @param {String} date 'yyyy-MM-dd [HH:mm:ss]' 格式日期
 * @returns 
 */
function getDate(date) {
  let _d = date ? new Date(date) : new Date()
  let year = _d.getFullYear()
  let month = _d.getMonth() + 1 > 10 ? _d.getMonth() + 1 : '0' + (_d.getMonth() + 1)
  let day = _d.getDate() > 10 ? _d.getDate() : '0' + (_d.getDate())
  let YMD = [year, month, day].join('-')
  let HMS = _d.toLocaleTimeString()
  return {
    year,
    month,
    day,
    YMD,
    HMS,
  }
}
// console.log(getDate())

/**
 * 获取指定日期 前后日期
 * @param {Number} length 返回日期数量
 * @param {Number} direction 日期递增(1) 递减(0)
 * @param {String} date 日期
 * @returns ['yyyy-MM-dd']
 */
function getSpecifyDate(length, direction, date = Date.now()) {
  let result = []
  for (var i = 0; i < length; i++) {
    direction ?
    result.push(
      new Date(new Date(date).setDate(new Date().getDate() + i)).toLocaleDateString().replaceAll('/', '-')
    )
    :
    result.push(
      new Date(new Date(date).setDate(new Date().getDate() - i)).toLocaleDateString().replaceAll('/', '-')
    )
  }
  return direction ? result : result.reverse()
}
// console.log(getSpecifyDate(7, 1, '2022-08-02'))

module.exports = {
  getDate,
  getSpecifyDate
}
