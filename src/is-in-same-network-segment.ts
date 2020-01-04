// refer: https://www.jb51.net/article/98387.htm
/**
 * 判断两个 ip 是否在同一网段
 * @param value1 IP1
 * @param value2 IP2
 * @param netmask 子网掩码
 */
export default function isInSameNetworkSegment(
  value1: string,
  value2: string,
  netmask: string
): boolean {
  const ip1 = value1.split('.')
  const ip2 = value2.split('.')
  const nm = netmask.split('.')
  let ip1_2s = ''
  let ip2_2s = ''
  let inm2s = ''
  let index = 0

  for (index = 0; index < 4; index++) {
    const ip_1 = parseInt(ip1[index]).toString(2)
    const ip_2 = parseInt(ip2[index]).toString(2)
    const n_m = parseInt(nm[index]).toString(2)
    let tIndex = 0
    for (tIndex = 0; tIndex < 8 - ip_1.length; tIndex++) {
      ip1_2s += '0'
    }
    ip1_2s += ip_1
    for (tIndex = 0; tIndex < 8 - ip_2.length; tIndex++) {
      ip2_2s += '0'
    }
    ip2_2s += ip_2
    for (tIndex = 0; tIndex < 8 - n_m.length; tIndex++) {
      inm2s += '0'
    }
    inm2s += n_m
  }

  const len = inm2s.length
  const ip_12 = ip1_2s.split('')
  const ip_22 = ip2_2s.split('')
  const n_m_2 = inm2s.split('')
  for (index = 0; index < len; index++) {
    if (n_m_2[index] === '1') {
      if (ip_12[index] !== ip_22[index]) {
        return false
      }
    }
  }
  return true
}
