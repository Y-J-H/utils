import isNumber from './is-number'

/**
 * 转化数字 19234 -> 1.92W
 * @param value 任意值
 */
export default function numFormat(value: any) {
  if (!isNumber(value)) return value
  if (value > 10000) {
    return `${(value / 10000).toFixed(2)}W`
  }
  return value
}
