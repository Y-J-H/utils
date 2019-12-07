/**
 * 是否为对象。格式为 `{}` | `() => {}` | `function () {}`
 *
 * @param value 输入值
 */
export default function isObject(value: any): value is object {
  const type = typeof value
  // eslint-disable-next-line no-eq-null
  return value != null && (type === 'object' || type === 'function')
}
