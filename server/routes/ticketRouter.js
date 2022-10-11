const Router = require('express')
const ticketController = require('../controllers/ticketController')
const authMiddleWare = require('../middleware/authMiddleWare')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleWare')

router.post('/create', ticketController.create)
router.post('/', checkRole('ADMIN') , ticketController.updateTicket)
router.post('/:id', checkRole('ADMIN'), ticketController.updateTicket)
router.get('/all', checkRole('ADMIN', 'CURATOR'), ticketController.getAll)
router.get('/:id',  ticketController.getOne)


module.exports = router