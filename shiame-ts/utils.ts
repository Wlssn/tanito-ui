export function debounce (this: any, func: Function, delay = 400) {
  let time: any
  let context = this
  return function (...args: any[]) {
    if (time) {
      clearTimeout(time)
      time = null
    }
    time = setTimeout(() => {
      func.apply(context, args)
    }, delay)
  }
}
