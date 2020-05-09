import typeOf from './type-of'

/**
 * 是否为对象。格式为 `{}` | `() => {}` | `function () {}`
 * 同 lodash/is-object
 *
 * @param value 输入值
 */
export default function isObject(value: any): value is object {
  const type = typeOf(value)
  // eslint-disable-next-line no-eq-null
  return value != null && (type === 'object' || type === 'function')
}
