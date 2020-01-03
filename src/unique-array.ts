/**
 * 数组去重
 * @param arr 原始数组
 */
export default function uniqueArray<T = any>(arr: T[]): T[] {
  return Array.from(new Set(arr))
}
