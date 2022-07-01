const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Endpoint = mongoose.model('Endpoint')
const k8s = require('@kubernetes/client-node')
const stringHelpers = require('../helpers/string.helpers')

router.get('/', async (req, res, next) => {
  try {
    Endpoint.find(req.query).exec((error, endpoints) => {
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
      async (error, endpoint) => {
        if (error) {
          next(error)
        } else {
          if (endpoint) {
            // Get secret values
            const kc = new k8s.KubeConfig()
            kc.loadFromDefault()

            const k8sApi = kc.makeApiClient(k8s.CoreV1Api)
            const data = (
              await k8sApi.readNamespacedSecret(
                endpoint.secretName,
                endpoint.namespace
              )
            ).body.data

            const secretData = []
            Object.keys(data).forEach((key) => {
              secretData.push({
                key: key,
                val: stringHelpers.b64toAscii(data[key])
              })
            })

            res.status(200).json({ ...endpoint.toObject(), secret: secretData })
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
