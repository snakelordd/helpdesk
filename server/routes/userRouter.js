const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleWare = require('../middleware/authMiddleWare')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleWare, userController.check)
router.get('/:id', userController.getOneUser )
router.get('/', userController.getAllUsers)

module.exports = router