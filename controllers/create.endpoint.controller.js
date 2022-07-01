const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { envConstants } = require('../constants')
const k8s = require('@kubernetes/client-node')

const Endpoint = mongoose.model('Endpoint')
const timeHelpers = require('../helpers/time.helpers')
const uriHelpers = require('../helpers/uri.helpers')
const stringHelpers = require('../helpers/string.helpers')

router.post('/', async (req, res, next) => {
  try {
    const parsed = uriHelpers.parse(req.body.target)
    const secretName = `${req.body.name.replace(/\s/g, '-')}-secret`

    Endpoint.countDocuments({ secretName }, (err, count) => {
      if (count > 0) {
        next(new Error(`Secret with name ${secretName} already exists`))
      }
    })

    const secretData = { ...req.body.secret }
    Object.keys(secretData).forEach((key) => {
      secretData[key] = stringHelpers.to64(secretData[key])
    })

    var secretBody = {
      apiVersion: 'v1',
      kind: 'Secret',
      metadata: {
        name: secretName
      },
      data: secretData
    }

    const kc = new k8s.KubeConfig()
    kc.loadFromDefault()
    const k8sApi = kc.makeApiClient(k8s.CoreV1Api)

    const payload = {
      createdAt: timeHelpers.currentTime(),
      namespace: envConstants.NAMESPACE,
      name: req.body.name,
      icon: req.body.icon,
      type: req.body.type,
      target: req.body.target,
      category: req.body.category,
      secretName,
      domain: parsed.domain
    }

    await k8sApi
      .readNamespacedSecret(secretName, envConstants.NAMESPACE)
      .then(async () => {
        next(new Error('A secret with this name already exists'))
      })
      .catch(async () => {
        await k8sApi.createNamespacedSecret(envConstants.NAMESPACE, secretBody)
        Endpoint.create(payload)
          .then((endpoint) => {
            res.status(200).json(endpoint)
          })
          .catch((error) => {
            next(error)
          })
      })
  } catch (error) {
    next(error)
  }
})

module.exports = router
