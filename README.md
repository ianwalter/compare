# @ianwalter/compare
> A utility to calculate the match percentage and diff between two JavaScript
> objects

[![npm page][npmImage]][npmUrl]

## Installation

```
yarn add @ianwalter/compare
```

## Usage

```js
const compare = require('@ianwalter/compare')

const lhs = { a: 1, b: 2 }
const rhs = { a: 1, b: 3 }
const result = compare(lhs, rhs) // => {
//   match: 75,
//   diff: [{ kind: 'E', path: [ 'b' ], lhs: 2, rhs: 3 }]
// }
```

## License

Apache 2.0 with Commons Clause - See [LICENSE][licenseUrl]

&nbsp;

Created by [Ian Walter](https://iankwalter.com)

[npmImage]: https://img.shields.io/npm/v/@ianwalter/compare.svg
[npmUrl]: https://www.npmjs.com/package/@ianwalter/compare
[licenseUrl]: https://github.com/ianwalter/compare/blob/master/LICENSE
