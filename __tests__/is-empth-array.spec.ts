import { isEmptyArray } from '../src'

const emptyArray1 = []

const emptyArray2 = [
  {
    value: 0
  },
  {
    value: 0
  }
]

describe('isEmptyArray', () => {
  test("should throw an error while the first argument isn't array", () => {
    expect(() => isEmptyArray(1)).toThrow()
    expect(() => isEmptyArray(true)).toThrow()
    expect(() => isEmptyArray('string')).toThrow()
    expect(() => isEmptyArray(undefined)).toThrow()
    expect(() => isEmptyArray(null)).toThrow()
    expect(() => isEmptyArray({})).toThrow()
  })

  test('should check the empty array correctly', () => {
    expect(isEmptyArray(emptyArray1)).toEqual(true)
    expect(isEmptyArray(emptyArray2, 'value')).toEqual(true)
  })
})
