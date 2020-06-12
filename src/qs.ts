/* eslint-disable no-undefined */
import isObject from './is-object'
import flattenArray from './flatten-array'
interface IDictionary {
  [key: string]: any
}

const encodeReserveRE = /[!'()*]/g
const encodeReserveReplacer = (c: string) => `%${c.charCodeAt(0).toString(16)}`
const commaRE = /%2C/g
const brackets = /(\[[^[\]]*])/

/**
 * @param str
 * 参考链接: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
 *          https://github.com/vuejs/vue-router/blob/231f4a5851/src/util/query.js
 */
const encode = (str: string | number): string => {
  return encodeURIComponent(str)
    .replace(encodeReserveRE, encodeReserveReplacer)
    .replace(commaRE, ',')
}

const decode = (val = '') => {
  return decodeURIComponent(val)
}

const addPrefix = (prefix: string, val: string): string => {
  return prefix ? `${prefix}.${val}` : val
}

// Transform a.b.c = 1, a.b.c = 2 to a.b.c = [ 1, 2 ]
const formatterArrVal = (quote: any, val: any) => {
  let tempQuote = quote
  if (tempQuote === undefined) {
    tempQuote = val
  } else if (Array.isArray(tempQuote)) {
    tempQuote.push(val)
  } else {
    tempQuote = [tempQuote, val]
  }
  return tempQuote
}

// Transform [a, b, c] to a.b.c
const keyArrToObject = (res: IDictionary, keys: string[], val: any) => {
  const key = keys.shift() || ''
  if (brackets.test(key)) {
    const k = key.split('[').shift() || ''
    const segment = key.match(brackets)
    if (!segment) {
      throw new Error('params error')
    }
    const str = segment[0]
    const i = str.substring(1, str.length - 1)
    if (res[k] === undefined) {
      res[k] = []
    }
    if (keys.length > 0) {
      if (res[k][i] === undefined) {
        res[k][i] = {}
      }
      keyArrToObject(res[k][i], keys, val)
    } else {
      res[k].push(val)
    }
  } else {
    if (keys.length > 0) {
      if (res[key] === undefined) {
        res[key] = {}
      }
      keyArrToObject(res[key], keys, val)
    } else {
      res[key] = formatterArrVal(res[key], val)
    }
  }
}

const stringifyList = (obj: IDictionary, prefix: string): any[] => {
  return Object.keys(obj).map(key => {
    const val = obj[key]
    const tempKey = addPrefix(prefix, key)
    if (val === undefined) {
      return ''
    }
    if (val === null) {
      return encode(tempKey)
    }
    if (Array.isArray(val)) {
      let result: any[] = []
      val.forEach((val2, index) => {
        if (val2 === undefined) {
          return ''
        }
        if (val2 === null) {
          result.push(encode(`${tempKey}[${index}]`))
        } else if (isObject(val2)) {
          const pre = `${tempKey}[${index}]`
          result = result.concat(stringifyList(val2, pre))
        } else {
          result.push(`${encode(`${tempKey}[${index}]`)}=${encode(val2)}`)
        }
      })
      return result.join('&')
    }
    if (isObject(val)) {
      return stringifyList(val, tempKey)
    }
    return `${encode(tempKey)}=${encode(val)}`
  })
}

const stringifyQuery = (obj: IDictionary): string => {
  if (!isObject(obj)) {
    throw new Error('stringifyQuery param must be object')
  }
  const res = flattenArray(stringifyList(obj, ''))
    .filter((x: string | string[]) => x.length > 0)
    .join('&')
  return res ? `?${res}` : ''
}

const parseQuery = (query: string): IDictionary => {
  const res = {}
  let tempQuery = query
  tempQuery = tempQuery.trim().replace(/^(\?|#|&)/, '')
  if (!tempQuery) {
    return res
  }

  tempQuery.split('&').forEach(item => {
    const parts = item.replace(/\+/g, ' ').split('=')
    const keys = decode(parts.shift()).split('.')
    const value = parts.length > 0 ? decode(parts.join('=')) : null
    keyArrToObject(res, keys, value)
  })
  return res
}

const qs = {
  stringifyQuery,
  parseQuery
}

export default qs
