const Router = require('express')
const chatController = require('../controllers/chatController')
const router = new Router()

router.post('/', chatController.newMsg )
router.get('/:id', chatController.getMsg)

module.exports = router