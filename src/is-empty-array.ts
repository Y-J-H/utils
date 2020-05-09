/* eslint-disable no-param-reassign */

import isObject from './is-object'

/**
 * 判断一个数组是否为空；判断数组的每一项之和是否为 0；判断数组每一项的某键的值之和是否为 0。
 * 使用场景：如判断图表所有项的数据都为 0 ，从而决定要不要渲染图表。
 * @param arr 数组
 * @param itemKey 数组项的某一个 key
 */
export default function isEmptyArray(arr: any[], itemKey?: string): boolean {
  if (!Array.isArray(arr))
    throw new TypeError('The object to be tested must be array!')
  if (arr.length === 0) return true

  let sum = 0
  if (itemKey) {
    sum = arr.reduce((init, item) => {
      if (isObject(item)) {
        const value = +(item as any)[itemKey] || 0
        init += value
      }
      return init
    }, 0)
  } else {
    sum = arr.reduce((init, item) => (init += +item), 0)
  }
  return sum === 0
}
