/**
 * 验证数据类型。此方法作为最后一个可选择的判断数据类型的方法：
 * 比如对于字符串，可直接 typeof value === 'string'
 * 对于数组，可直接 Array.isArray(value)
 * @param value 任何数据
 */
export default function typeOf(value: any): string {
  const maps: any = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
    '[object Symbol]': 'symbol'
  }
  return maps[Object.prototype.toString.call(value)]
}
