import qs from '../src/qs'

describe('qs', () => {
  test(`stringifies a querystring object`, () => {
    expect(qs.stringifyQuery({ a:'b'})).toEqual('?a=b')
    expect(qs.stringifyQuery({ a: 1 })).toEqual('?a=1')
    expect(qs.stringifyQuery({ a: 1, b: 2 })).toEqual('?a=1&b=2')
    expect(qs.stringifyQuery({ a: 'A_Z' })).toEqual('?a=A_Z')
    expect(qs.stringifyQuery({ a: '€' })).toEqual('?a=%E2%82%AC')
    expect(qs.stringifyQuery({ a: '' })).toEqual('?a=%EE%80%80')
    expect(qs.stringifyQuery({ a: 'א' })).toEqual('?a=%D7%90')
    expect(qs.stringifyQuery({ a: '𐐷' })).toEqual('?a=%F0%90%90%B7')
  })

  test(`stringifies nested falsy values`, () => {
    expect(qs.stringifyQuery({ a: { b: { c: null } } })).toEqual('?a.b.c')
    expect(qs.stringifyQuery({ a: { b: { c: false } } })).toEqual('?a.b.c=false')
  })

  test(`stringifies a nested object`, () => {
    expect(qs.stringifyQuery({ a: { b: 'c' } })).toEqual('?a.b=c')
    expect(qs.stringifyQuery({ a: { b: { c: { d: 'e' } } } })).toEqual('?a.b.c.d=e')
  })

  test(`stringifies an array value`, () => {
    expect(qs.stringifyQuery({ a: ['b', 'c', 'd'] })).toEqual('?a%5B0%5D=b&a%5B1%5D=c&a%5B2%5D=d')
  })

  test(`test nulls`, () => {
    expect(qs.stringifyQuery({ a: 'b', c: null })).toEqual('?a=b&c')
  })

  test(`stringifies a nested array value`, () => {
    expect(qs.stringifyQuery({ a: { b: ['c', 'd'] } })).toEqual('?a.b%5B0%5D=c&a.b%5B1%5D=d')
  })

  test('stringifies an object inside an array', () => {
    expect(qs.stringifyQuery({ a: [{ b: 'c' }] })).toEqual('?a%5B0%5D.b=c')
    expect(qs.stringifyQuery({ a: [{ b: { c: [1] } }] })).toEqual('?a%5B0%5D.b.c%5B0%5D=1')
  })

  test('stringifies an array with mixed objects and primitives', () => {
    expect(qs.stringifyQuery({ a: [{ b: 1 }, 2, 3] })).toEqual('?a%5B0%5D.b=1&a%5B1%5D=2&a%5B2%5D=3')
    expect(qs.stringifyQuery({ a: ['b', 'c'] })).toEqual('?a%5B0%5D=b&a%5B1%5D=c')
  })

  test('stringifies an empty value', () => {
    expect(qs.stringifyQuery({ a: '' })).toEqual('?a=')
    expect(qs.stringifyQuery({ a: null })).toEqual('?a')
    expect(qs.stringifyQuery({ a: '', b: '' })).toEqual('?a=&b=')
    expect(qs.stringifyQuery({ a: null, b: '' })).toEqual('?a&b=')
    expect(qs.stringifyQuery({ a: { b: '' } })).toEqual('?a.b=')
    expect(qs.stringifyQuery({ a: { b: null } })).toEqual('?a.b')
  })

  test('drops keys with a value of undefined', () => {
    expect(qs.stringifyQuery({ a: { b: undefined, c: null } })).toEqual('?a.c')
  })

  test('url encodes values', () => {
    expect(qs.stringifyQuery({ a: 'b c' })).toEqual('?a=b%20c')
  })

  test('stringifies boolean values', () => {
    expect(qs.stringifyQuery({ 'my weird field': '~q1!2"\'w$5&7/z8)?' })).toEqual('?my%20weird%20field=~q1%212%22%27w%245%267%2Fz8%29%3F')
  })

  test('stringifies the weird object from qs', () => {
    expect(qs.stringifyQuery({ a: true })).toEqual('?a=true')
  })

  test('selects properties when filter=array', () => {
    expect(qs.stringifyQuery({ a: { b: [1, 2, 3, 4], c: 'd' }, c: 'f' })).toEqual('?a.b%5B0%5D=1&a.b%5B1%5D=2&a.b%5B2%5D=3&a.b%5B3%5D=4&a.c=d&c=f')
    expect(qs.stringifyQuery({ a: 'a', z: { zj: { zjb: 'zjb', zja: 'zja' }, zi: { zib: 'zib', zia: 'zia' } }, b: 'b' })).toEqual('?a=a&z.zj.zjb=zjb&z.zj.zja=zja&z.zi.zib=zib&z.zi.zia=zia&b=b')
  })
})

describe('qs', () => {
  test(`parses a simple string`, () => {
    expect(qs.parseQuery('?0=foo')).toEqual({ '0': 'foo' })
    expect(qs.parseQuery('foo=c++')).toEqual({ foo: 'c  ' })
    // qs.parseQuery('a[>=]=23').toEqual({ '0': 'foo' })
    // qs.parseQuery('a[<=>]==23').toEqual({ '0': 'foo' })
    // qs.parseQuery('a[==]=23').toEqual({ '0': 'foo' })
    expect(qs.parseQuery('foo')).toEqual({ foo: null })
    expect(qs.parseQuery('foo=')).toEqual({ foo: '' })
    expect(qs.parseQuery('foo=false')).toEqual({ foo: 'false' })
    expect(qs.parseQuery('foo = bar = baz')).toEqual({ 'foo ': ' bar = baz' })
    expect(qs.parseQuery('foo=bar=baz')).toEqual({ foo: 'bar=baz' })
    expect(qs.parseQuery('foo2=bar2&baz2=')).toEqual({ foo2: 'bar2', baz2: '' })
    expect(qs.parseQuery('foo=bar&baz')).toEqual({ foo: 'bar', baz: null })
    expect(qs.parseQuery('cht=p3&chd=t:60,40&chs=250x100&chl=Hello|World')).toEqual({ cht: 'p3', chd: 't:60,40', chs: '250x100', chl: 'Hello|World' })
  })

  test('test', () => {
    expect(qs.parseQuery('a[0]=b&a[1]=c')).toEqual({ a: ['b', 'c'] })
    expect(qs.parseQuery('a=b,c')).toEqual({ a: 'b,c' })
    expect(qs.parseQuery('?a.b.c')).toEqual({ a: { b: { c: null } } })
    expect(qs.parseQuery('?a%5B0%5D.b.c%5B0%5D=1')).toEqual({ a: [{ b: { c: ['1'] } }] })
    expect(qs.parseQuery('?a%5B0%5D.b=1&a%5B1%5D=2&a%5B2%5D=3')).toEqual({ a: [{ b: '1' }, '2', '3'] })
  })
})