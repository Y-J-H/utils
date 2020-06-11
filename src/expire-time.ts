/**
 * 到期时间格式化
 * @param due_time 到期时间
 */

export default function expireTime(due_time: string) {
  const due_year = due_time && due_time.split('-')[0]
  if (parseInt(due_year) >= 2040) {
    return '无限期'
  } else {
    return due_time
  }
}
