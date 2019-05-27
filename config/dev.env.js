'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  address: {
    api: "'https://api.tusminutas.cl/api/'",
    spa: '"http://localhost:7070/"'
  }
})
