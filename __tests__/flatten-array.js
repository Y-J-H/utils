import { flattenArray } from '../src/index.ts'

describe('flattenArray', () => {
  test('`should flatten `arguments` objects ', () => {
    var array = [1, [2, [3, [4]], 5]];
    expect(flattenArray(array)).toEqual([1, 2, 3, 4, 5])
  })
})
