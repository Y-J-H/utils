/**
 * 数组去重
 * @param arr 原始数组
 */
export default function uniqueArray<T = any>(arr: T[]): T[] {
  if (Array.hasOwnProperty('from')) {
    return Array.from(new Set(arr))
  } else {
    const n: any = {}, r = [];
    for (var i = 0; i < arr.length; i++) {
      if (!n[arr[i]]) {
        n[arr[i]] = true
        r.push(arr[i])
      }
    }
    return r;
  }
}
