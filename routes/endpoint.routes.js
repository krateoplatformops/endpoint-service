const express = require('express')
const router = express.Router()

const createController = require('../controllers/create.endpoint.controller')
const readController = require('../controllers/read.endpoint.controller')
const deleteController = require('../controllers/delete.endpoint.controller')

router.use('/', createController)
router.use('/', readController)
router.use('/', deleteController)

module.exports = router
