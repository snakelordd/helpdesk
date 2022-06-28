const Router = require('express')
const currentController = require('../controllers/currentController')
const ticketController = require('../controllers/ticketController')
const router = new Router()



router.get('/:currentId', currentController.getMyCurrent)

module.exports = router