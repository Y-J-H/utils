import isNumber from './is-number'

/**
 * 格式化秒 78s -> 1分18秒
 * @param value 任意值
 */
export default function formatSecond(value: any) {
  if (!isNumber(value)) return value
  const days = Math.floor(value / (60 * 60 * 24))
  const hours = Math.floor(value / (60 * 60)) % 24
  const minutes = Math.floor(value / 60) % 60
  const seconds = Math.floor(value % 60)

  let text = ''
  days && (text += `${days}天`)
  hours && (text += `${hours}小时`)
  minutes && (text += `${minutes}分`)
  seconds && (text += `${seconds}秒`)
  return text || '-'
}
