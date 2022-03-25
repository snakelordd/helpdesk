const Router = require('express')
const ticketSettingsController = require('../controllers/ticketSettingsController')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleWare')

router.post('/add', checkRole('ADMIN'), ticketSettingsController.create)
router.post('/', checkRole('ADMIN'), ticketSettingsController.updateSetting)
router.get('/',  checkRole('ADMIN'), ticketSettingsController.getAll)


module.exports = router