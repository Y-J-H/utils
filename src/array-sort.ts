/**
 * 数组排序{type} asc：从小到大 desc：从大到小
 * @param arr 排序数组
 * @param type 排序方式
 */

export default function arraySort(arr: any, type = 'desc') {
  return arr.sort((a: number, b: number) => {
    switch (type) {
      case 'asc':
        return a - b;
      case 'desc':
        return b - a;
      default:
        return arr;
    }
  })
}
