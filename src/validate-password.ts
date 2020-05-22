interface IPassword {
  upper: boolean // 包含大写字母
  lower: boolean // 包含小写字母
  number: boolean // 包含数字
  character: boolean // 包含特殊字符
  illegalChar: boolean // 包含非法的字符
  count: number // 符合上面四项中的几项
  len: boolean // 长度是否符合
}

/**
 * 校验大写字母
 */
const upperLetterReg = /[A-Z]/

/**
 * 校验小写字母
 */
const lowerLetterReg = /[a-z]/

/**
 * 校验数字
 */
const numberReg = /[0-9]/

/**
 * 校验特殊字符
 * @param reg 自定义的特殊字符正则表达式
 */
const characterReg = (reg?: RegExp): RegExp => {
  return reg || /[$&:;<>*^`!@#%()_+=[{\]}\\|/'"~,.?-\s]/
}

/**
 *
 * @param value 校验的字符串
 * @param minLen 字符串最小长度
 * @param maxLen 字符串最大长度, 填0表示无上限
 * @param charReg 特殊字符正则
 * @return {} 返回一个Promise, resolve()值为 {
 *  upper, // 包含大写字母
 *  lower, // 包含小写字母
 *  number, // 包含数字
 *  character, // 包含特殊字符
 *  count, // 符合上面四项中的几项
 *  illegalChar, // 包含非法的字符
 *  len // 长度是否符合
 * }
 */
export default function validatePassword(
  value: string,
  minLen = 0,
  maxLen = 0,
  charReg?: RegExp
): IPassword {
  let upper = false
  let lower = false
  let number = false
  let character = false
  let illegalChar = false
  let len = true
  let count = 0
  const arr = value.split('')
  const arrLen = arr.length
  if (maxLen < minLen && maxLen !== 0) {
    // eslint-disable-next-line no-throw-literal
    throw new Error('密码校验时最大值不能小于最小值')
  }
  if (minLen) {
    len = arrLen >= minLen
  }
  if (len && maxLen) {
    len = arrLen <= maxLen
  }
  for (const item of arr) {
    if (upperLetterReg.test(item)) {
      !upper && ++count
      upper = true
    } else if (lowerLetterReg.test(item)) {
      !lower && ++count
      lower = true
    } else if (numberReg.test(item)) {
      !number && ++count
      number = true
    } else if (characterReg(charReg).test(item)) {
      !character && ++count
      character = true
    } else {
      illegalChar = true
      break
    }
  }
  return { upper, lower, number, character, illegalChar, count, len }
}
