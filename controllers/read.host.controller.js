const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Host = mongoose.model('Host')

router.get('/', async (req, res, next) => {
  try {
    Host.find(req.query, '-apiToken').exec((error, hosts) => {
      if (error) {
        next(error)
      } else {
        res.status(200).json(hosts)
      }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/domain/:domain', async (req, res, next) => {
  try {
    Host.findOne({ domain: req.params.domain }).exec((error, host) => {
      if (error) {
        next(error)
      } else {
        res.status(200).json(host)
      }
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
