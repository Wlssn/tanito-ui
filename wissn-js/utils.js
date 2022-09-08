/**
 * 函数防抖壳
 * @param {Function} func 需要防抖的函数
 * @param {number} delay 延迟执行时间
 * @returns Function
 */
export function debounce (func, delay = 400) {
  let time = null
  let context = this
  return function (...args) {
    if (time) {
      clearTimeout(time)
      time = null
    }
    time = setTimeout(() => {
      func.apply(context, args)
    }, delay)
  }
}


