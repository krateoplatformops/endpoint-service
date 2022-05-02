const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Endpoint = mongoose.model('Endpoint')
const timeHelpers = require('../helpers/time.helpers')
const uriHelpers = require('../helpers/uri.helpers')

router.post('/', async (req, res, next) => {
  try {
    const parsed = uriHelpers.parse(req.body.target)

    const payload = {
      ...req.body,
      secretName: `endpoint-${req.body.name}`,
      createdAt: timeHelpers.currentTime(),
      domain: parsed.domain
    }

    Endpoint.create(payload)
      .then((endpoint) => {
        res.status(200).json(endpoint)
      })
      .catch((error) => {
        next(error)
      })
  } catch (error) {
    next(error)
  }
})

module.exports = router
