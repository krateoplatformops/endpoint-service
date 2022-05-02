const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Endpoint = mongoose.model('Endpoint')

router.get('/', async (req, res, next) => {
  try {
    Endpoint.find(req.query, '-apiToken').exec((error, endpoints) => {
      if (error) {
        next(error)
      } else {
        res.status(200).json(endpoints)
      }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:prop/:value', async (req, res, next) => {
  try {
    Endpoint.findOne({ [req.params.prop]: req.params.value }).exec(
      (error, endpoint) => {
        if (error) {
          next(error)
        } else {
          if (endpoint) {
            res.status(200).json(endpoint)
          } else {
            res.status(404).json({ message: 'Endpoint not found' })
          }
        }
      }
    )
  } catch (error) {
    next(error)
  }
})

module.exports = router
