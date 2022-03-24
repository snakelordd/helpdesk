const Router = require('express')
const ticketSettingsController = require('../controllers/ticketSettingsController')
const router = new Router()

router.post('/add', ticketSettingsController.create)
router.post('/', ticketSettingsController.updateSetting)
router.get('/', ticketSettingsController.getAll)


module.exports = router