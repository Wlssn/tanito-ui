const common = require('./common')
const store = require('./store')
const date = require('./date')
const array = require('./array')

module.exports = $$ = {
  ...common,
  ...date,
  ...store,
  ...array
}
