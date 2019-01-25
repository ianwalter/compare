const { diff } = require('deep-diff')

function getNumberOfItems (src, acc = 0) {
  if (src && typeof src === 'object') {
    const items = Array.isArray(src) ? src : Object.values(src)
    for (let item of items) {
      if (typeof item === 'object') {
        acc += getNumberOfItems(item)
      }
      acc++
    }
  }
  return acc
}

const toCountsForArray = (acc, { item }) => ({
  ...acc,
  [item.kind]: (acc[item.kind] || 0) + 1
})
const toCounts = (acc, { kind }) => ({ ...acc, [kind]: (acc[kind] || 0) + 1 })
const getRelativeValue = (D, N) => Math.abs(D - N) || D

module.exports = function compare (lhs, rhs) {
  const isArray = Array.isArray(lhs)
  const lhsCount = getNumberOfItems(lhs)
  const total = isArray ? lhsCount : Math.max(lhsCount, getNumberOfItems(rhs))
  const result = {}
  if (total && lhs && rhs) {
    let changeValue = 0

    result.diff = diff(lhs, rhs)
    if (result.diff) {
      if (isArray) {
        const { D = 0, N = 0 } = result.diff.reduce(toCountsForArray, {})
        changeValue = getRelativeValue(D, N)
      } else {
        const { D = 0, N = 0, E = 0 } = result.diff.reduce(toCounts, {})
        changeValue = getRelativeValue(D, N) + (E * 0.5)
      }
    }

    result.match = Math.round(100 - (changeValue / total * 100))
  } else {
    result.match = 0
  }
  return result
}
