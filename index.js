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

const toCounts = (acc, { kind, item }) => {
  acc[kind] = (acc[kind] || 0) + 1
  if (item) {
    return { ...acc, [item.kind]: (acc[item.kind] || 0) + 1 }
  }
  return acc
}

module.exports = function compare (lhs, rhs) {
  const total = Array.isArray(lhs)
    ? getNumberOfItems(lhs)
    : Math.max(getNumberOfItems(lhs), getNumberOfItems(rhs))
  const result = {}
  if (total && lhs && rhs) {
    let changeValue = 0

    result.diff = diff(lhs, rhs)
    if (result.diff) {
      const { D = 0, N = 0, E = 0 } = result.diff.reduce(toCounts, {})
      changeValue = (Math.abs(D - N) || D) + (E * 0.5)
    }

    result.match = Math.round(100 - (changeValue / total * 100))
  } else {
    result.match = 0
  }
  return result
}
