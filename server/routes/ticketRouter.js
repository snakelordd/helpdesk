const Router = require('express')
const ticketController = require('../controllers/ticketController')
const router = new Router()

router.post('/create', ticketController.create)
router.post('/', ticketController.updateTicket)
router.post('/:id', ticketController.updateTicket)
router.get('/', ticketController.getAll)
router.get('/:id', ticketController.getOne)


module.exports = router