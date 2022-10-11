const Router = require('express')
const currentController = require('../controllers/currentController')
const ticketController = require('../controllers/ticketController')
const router = new Router()



router.get('/', currentController.getMyCurrent)
router.post('/', currentController.setCurrent)

module.exports = router