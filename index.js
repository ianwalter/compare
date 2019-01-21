const { diff } = require('deep-diff')

function getNumberOfItems (src, acc = 0) {
  if (typeof src === 'object') {
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

const toValue = (acc, change) => (acc += change.kind === 'A' ? 1 : 0.5)

module.exports = function compare (lhs, rhs) {
  const numberOfItems = getNumberOfItems(lhs)
  const result = { diff: diff(lhs, rhs) }
  const numberOfChanges = result.diff ? result.diff.reduce(toValue, 0) : 0
  result.match = Math.round(100 - (numberOfChanges / numberOfItems * 100))
  return result
}
