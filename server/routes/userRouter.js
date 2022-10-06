const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleWare = require('../middleware/authMiddleWare')
const checkRole = require('../middleware/checkRoleMiddleWare')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/edit', checkRole('ADMIN'), userController.updateUser)
router.post('/profile', checkRole('ADMIN'), userController.setInfo)
router.get('/auth', authMiddleWare, userController.check)
router.get('/:id', userController.getOneUser )
router.get('/', userController.getAllUsers)

module.exports = router