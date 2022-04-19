const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Host = mongoose.model('Host')
const timeHelpers = require('../helpers/time.helpers')
// const stringHelpers = require('../helpers/string.helpers')

router.post('/', async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      secretName: req.body.provider + '-' + req.body.domain,
      createdAt: timeHelpers.currentTime()
    }

    Host.create(payload)
      .then((host) => {
        res.status(200).json(host)
      })
      .catch((error) => {
        next(error)
      })
  } catch (error) {
    next(error)
  }
})

module.exports = router
