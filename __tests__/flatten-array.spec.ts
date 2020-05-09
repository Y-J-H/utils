import { flattenArray } from '../src'

describe('flattenArray', () => {
  test('`should flatten `arguments` objects ', () => {
    const array = [1, [2, [3, [4]], 5]]
    expect(flattenArray(array)).toEqual([1, 2, 3, 4, 5])
  })
})
