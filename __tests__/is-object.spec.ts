import { isObject } from '../src'

describe('isObject', () => {
  test('Correctly judge object data types', () => {
    expect(isObject(1)).toEqual(false)
    expect(isObject(NaN)).toEqual(false)
    expect(isObject(undefined)).toEqual(false) 
    expect(isObject(null)).toEqual(false) 
    // new 出来的系列都是true
    expect(isObject(new Number(0))).toEqual(true)
    expect(isObject(new Boolean(false))).toEqual(true)
    expect(isObject(new Map())).toEqual(true)
    expect(isObject(new Set())).toEqual(true)
    expect(isObject({})).toEqual(true) 
    expect(isObject(new Function())).toEqual(true)
  })
})
