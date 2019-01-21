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

test(' compare returns 100% match for the same shallow array', t => {
  const lhs = [1,2,3]
  const rhs = [1,2,3]
  const result = compare(lhs, rhs)
  t.is(result.match, 100)
  t.is(result.diff, undefined)
})

test('compare returns 67% match for missing val in second array', t => {
  const lhs = [1,2,3]
  const rhs = [1,2]
  const result = compare(lhs, rhs)
  t.is(result.match, 67)
})

test('compare returns 67% match for extra val in second array', t => {
  const lhs = [1,2,3]
  const rhs = [1,2,3,4]
  const result = compare(lhs, rhs)
  t.is(result.match, 67)
})
