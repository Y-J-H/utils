import { uniqueArray } from '../src'

describe('uniqueArray', () => {
  test('many same object can be unique', () => {
    const tempObj = { a: 1 }
    const tempArr = [1, 2]
    const tempSet = new Set([1, 2])
    let tempMap = new Map()
    tempMap.set(tempSet, tempArr)
    const array = [1, 1, 'a', 'a', null, null, undefined, undefined, tempObj, tempObj, tempArr, tempArr, tempSet, tempSet, tempMap, tempMap]
    const resultArr = [1, 'a', null, undefined,tempObj, tempArr, tempSet, tempMap]
    expect(uniqueArray(array)).toEqual(resultArr)
  })
})
