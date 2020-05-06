/**
 * 数组扁平化
 * @param arr 原始数组
 */
export default function flattenArray<T = any> (arr: T[]): T[] | T {
  return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flattenArray(val) : val), ([] as T[]))
}