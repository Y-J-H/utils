import typeOf from './type-of'

/**
 * 判断是否为数字类型
 * @param value 任意值
 */
export default function isNumber(value: any) {
  return typeOf(value) === 'number' && isFinite(value)
}
