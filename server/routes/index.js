const Router = require('express')
const router = new Router()
const ticketRouter = require('./ticketRouter')
const chatRouter = require('./chatRouter')
const currentRouter = require('./currentRouter')
const userRouter = require('./userRouter')
const ticketSettingsRouter = require('./ticketSettingsRouter')


router.use('/user', userRouter)
router.use('/tickets', ticketRouter)
router.use('/chat', chatRouter)
router.use('/current', currentRouter)
router.use('/ticketsettings', ticketSettingsRouter)

module.exports = router