/**
 * 查找数组对象的某个下标
 * @param {Array} ary 查找的数组
 * @param {Function} fn 判断的方法
 * @returns {number} 返回找到的下标，找不到返回 -1
 */
export const findIndex = (ary, fn) => {
  if (Array.prototype.findIndex) {
    return ary.findIndex(fn)
  }

  let index = -1
  ary.some((item, i, arr) => {
    if (fn(item, i, arr)) {
      index = i
      return true
    }
    return false
  })

  return index
}
