
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-drag-hierarchy-tree.cjs.production.min.js')
} else {
  module.exports = require('./react-drag-hierarchy-tree.cjs.development.js')
}
