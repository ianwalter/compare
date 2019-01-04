const compare = require('..')

test('compare returns 100% match for the same shallow objects', () => {
  const lhs = { a: 1, b: 2 }
  const rhs = { a: 1, b: 2 }
  const result = compare(lhs, rhs)
  expect(result.match).toBe(100)
  expect(result.diff).toBe(undefined)
})

test('compare returns 75% match for objects with different second val', () => {
  const lhs = { a: 1, b: 2 }
  const rhs = { a: 1, b: 3 }
  const result = compare(lhs, rhs)
  expect(result.match).toBe(75)
  expect(result.diff[0].kind).toBe('E')
  expect(result.diff[0].path).toEqual(['b'])
  expect(result.diff[0].lhs).toBe(2)
  expect(result.diff[0].rhs).toBe(3)
})

test('compare returns 50% match for objects with different second prop', () => {
  const lhs = { a: 1, b: 2 }
  const rhs = { a: 1, c: 2 }
  const result = compare(lhs, rhs)
  expect(result.match).toBe(50)
  expect(result.diff[0].kind).toBe('D')
  expect(result.diff[0].path).toEqual(['b'])
  expect(result.diff[0].lhs).toBe(2)
  expect(result.diff[1].kind).toBe('N')
  expect(result.diff[1].path).toEqual(['c'])
  expect(result.diff[1].rhs).toBe(2)
})

test('compare returns 100% match for the same shallow array', () => {
  const lhs = [1,2,3]
  const rhs = [1,2,3]
  const result = compare(lhs, rhs)
  expect(result.match).toBe(100)
  expect(result.diff).toBe(undefined)
})

test('compare returns 67% match for missing val in second array', () => {
  const lhs = [1,2,3]
  const rhs = [1,2]
  const result = compare(lhs, rhs)
  expect(result.match).toBe(67)
})

test('compare returns 67% match for extra val in second array', () => {
  const lhs = [1,2,3]
  const rhs = [1,2,3,4]
  const result = compare(lhs, rhs)
  expect(result.match).toBe(67)
})
