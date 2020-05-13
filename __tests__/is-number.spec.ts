import { isNumber } from '../src'

describe('isNumber', () => {
  test('Correctly judge numeric data types', () => {
    expect(isNumber(1)).toEqual(true)
    expect(isNumber(1e2)).toEqual(true)
    expect(isNumber(0)).toEqual(true)
    expect(isNumber(-1)).toEqual(true)
    expect(isNumber('1')).toEqual(false)
    expect(isNumber(NaN)).toEqual(false)
    expect(isNumber({})).toEqual(false)
    expect(isNumber(undefined)).toEqual(false)
    expect(isNumber(null)).toEqual(false)
    expect(isNumber([0])).toEqual(false)
    expect(isNumber(Symbol())).toEqual(false)
  })
})
