/**
 * 表格中删除一定数据后，计算下次请求的页码数
 * @param page        当前页码数
 * @param size        每页的数量
 * @param total       总数
 * @param deleteCount 删除的数量，默认为1
 */
export default function computedNextPage(
  page: number,
  size: number,
  total: number,
  deleteCount = 1
): number {
  if (page === 1) {
    return 1
  }
  if (total - deleteCount <= (page - 1) * size) {
    return page - 1
  }
  return page
}
