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
  for (let i = 1; i <= length; i++) {
    direction ?
    result.push(
      new Date(new Date(date).setDate(new Date().getDate() + i)).toLocaleDateString().replaceAll('/', '-').split('-').map(item => +item < 10 ? item = 0 + item: item).join('-')
    )
    :
    result.push(
      new Date(new Date(date).setDate(new Date().getDate() - i)).toLocaleDateString().replaceAll('/', '-').split('-').map(item => +item < 10 ? item = 0 + item: item).join('-')
    )
  }
  return direction ? result : result.reverse()
}

module.exports = {
  getDate,
  getSpecifyDate
}
let r = '2023-1-9'.split('-').map(item => +item < 10 ? item = 0 + item: item)
console.log(r)