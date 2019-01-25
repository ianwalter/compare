import test from 'ava'
import compare from '.'

test('compare returns 100% match for the same shallow objects', t => {
  const lhs = { a: 1, b: 2 }
  const rhs = { a: 1, b: 2 }
  const result = compare(lhs, rhs)
  t.is(result.match, 100)
  t.is(result.diff, undefined)
})

test('compare returns 75% match for objects with different second val', t => {
  const lhs = { a: 1, b: 2 }
  const rhs = { a: 1, b: 3 }
  const result = compare(lhs, rhs)
  t.is(result.match, 75)
  t.is(result.diff[0].kind, 'E')
  t.deepEqual(result.diff[0].path, ['b'])
  t.is(result.diff[0].lhs, 2)
  t.is(result.diff[0].rhs, 3)
})

test('compare returns 50% match for objects with different second prop', t => {
  const lhs = { a: 1, b: 2 }
  const rhs = { a: 1, c: 2 }
  const result = compare(lhs, rhs)
  t.is(result.match, 50)
  t.is(result.diff[0].kind, 'D')
  t.deepEqual(result.diff[0].path, ['b'])
  t.is(result.diff[0].lhs, 2)
  t.is(result.diff[1].kind, 'N')
  t.deepEqual(result.diff[1].path, ['c'])
  t.is(result.diff[1].rhs, 2)
})

test('compare returns 25% match for 3 added props to rhs', t => {
  const lhs = { a: 1 }
  const rhs = { a: 1, b: 2, c: 3, d: 4 }
  const result = compare(lhs, rhs)
  t.is(result.match, 25)
})

test('compare returns 20% match for 4 removed props from rhs', t => {
  const lhs = { a: 1, b: 2, c: 3, d: 4, e: 5 }
  const rhs = { a: 1 }
  const result = compare(lhs, rhs)
  t.is(result.match, 20)
})

test(' compare returns 100% match for the same shallow array', t => {
  const lhs = [1, 2, 3]
  const rhs = [1, 2, 3]
  const result = compare(lhs, rhs)
  t.is(result.match, 100)
  t.is(result.diff, undefined)
})

test('compare returns 67% match for missing val in second array', t => {
  const lhs = [1, 2, 3]
  const rhs = [1, 2]
  const result = compare(lhs, rhs)
  t.is(result.match, 67)
})

test('compare returns 67% match for extra val in second array', t => {
  const lhs = [1, 2, 3]
  const rhs = [1, 2, 3, 4]
  const result = compare(lhs, rhs)
  t.is(result.match, 67)
})

test('compare returns 0% match when given null lhs', t => {
  const lhs = null
  const rhs = [1, 2, 3, 4]
  const result = compare(lhs, rhs)
  t.is(result.match, 0)
})

test('compare returns 0% match when given empty Array lhs', t => {
  const lhs = []
  const rhs = [1, 2, 3, 4]
  const result = compare(lhs, rhs)
  t.is(result.match, 0)
})

test('compare returns 0% match when given empty Object lhs', t => {
  const lhs = {}
  const rhs = { a: 1, c: 2 }
  const result = compare(lhs, rhs)
  t.is(result.match, 0)
})

test('compare returns 0% match when given null rhs', t => {
  const lhs = { a: 1, c: 2 }
  const rhs = null
  const result = compare(lhs, rhs)
  t.is(result.match, 0)
})

test('compare returns 0% match when given empty Object rhs', t => {
  const lhs = { a: 1, c: 2 }
  const rhs = {}
  const result = compare(lhs, rhs)
  t.is(result.match, 0)
})

test('compare returns 0% match when given empty Array rhs', t => {
  const lhs = [1, 2, 3, 4]
  const rhs = []
  const result = compare(lhs, rhs)
  t.is(result.match, 0)
})

test('compare returns 50% match when adding 2 Object items to Array rhs', t => {
  const lhs = [{ a: 1 }, { b: 2 }]
  const rhs = [{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }]
  const result = compare(lhs, rhs)
  t.is(result.match, 50)
})

test('compare returns 75% match when removing nested Object prop rhs', t => {
  const lhs = [{ a: 1 }, { b: 2 }]
  const rhs = [{ a: 1 }, {}]
  const result = compare(lhs, rhs)
  t.is(result.match, 75)
})

test('compare returns 67% match when nested prop changed on rhs', t => {
  const lhs = { a: 1, b: { c: 3 } }
  const rhs = { a: 1, b: { d: 4 } }
  const result = compare(lhs, rhs)
  t.is(result.match, 67)
})
