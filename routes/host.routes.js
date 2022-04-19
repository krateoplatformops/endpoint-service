const express = require('express')
const router = express.Router()

const createController = require('../controllers/create.host.controller')
const readController = require('../controllers/read.host.controller')
const deleteController = require('../controllers/delete.host.controller')

router.use('/', createController)
router.use('/', readController)
router.use('/', deleteController)

module.exports = router
