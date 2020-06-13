/* eslint-disable no-undefined */
import isObject from './is-object'
import flattenArray from './flatten-array'
interface IDictionary {
  [key: string]: any
}

interface ILocation {
  host?: string
  origin: string
  pathname: string
  hash: string
  search: string
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

// Transform a[0]b[0] = 1 to { a: [{ b: [1] }] }
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

/**
 * vue 是使用 hash 模式去模拟 url 所以在这种情况下 search 都会在 hash 中
 * 标准格式的 URL 是 scheme://host[:port]/path/.../[;url-params][?query-string][#anchor]
 * anchor 中即 hash
 */
const getNewUrl = (location: ILocation, obj: IDictionary, title = '') => {
  const { origin, pathname, hash = '', search } = location
  let strQuery = ''
  let currentHash = hash
  let href = ''
  let oldQuery = {}
  let newStringifyQuery = ''
  if (search) {
    strQuery = search
    oldQuery = parseQuery(strQuery)
    newStringifyQuery = stringifyQuery(Object.assign(oldQuery, obj))
    href = `${origin}${pathname}${newStringifyQuery}${currentHash}`
  } else {
    const tempArr = currentHash.split('?')
    currentHash = tempArr[0]
    strQuery = tempArr.slice(1).join('?')
    oldQuery = parseQuery(strQuery)
    newStringifyQuery = stringifyQuery(Object.assign(oldQuery, obj))
    href = `${origin}${pathname}${currentHash}${newStringifyQuery}`
  }
  return href
}

/**
 *
 * @param location  window.location 对象
 * @param obj 需要存储到url上的query参数
 * @param title 是否更改浏览器title
 *
 */
const replaceState = (location: Location, obj: IDictionary, title = '') => {
  const { origin, pathname, hash = '', search } = location
  const href = getNewUrl({ origin, pathname, hash, search }, obj, title)
  if (window) {
    window.history.replaceState(obj, title, href)
  } else {
    throw new Error('window 对象不存在')
  }
}

const qs = {
  stringifyQuery,
  parseQuery,
  getNewUrl,
  replaceState
}

export default qs
