const express = require('express')
const router = express.Router()
const filesController = require('../controllers/filesController')

/* GET users listing. */
router.get('/', filesController.availableEndpoints)
router.get('/list', filesController.getFiles)
router.get('/data', filesController.getAndTransformFiles)

module.exports = router
