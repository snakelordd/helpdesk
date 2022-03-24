require('dotenv').config()

const express = require('express')
const sequelize = require('./db')
const PORT = process.env.PORT
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorhandlingMiddleWare')
const fileUpload = require('express-fileupload')

const app = express()
app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)

const start = async ()=> {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=> console.log(`startedon ${PORT}`))
    } catch(e) {
        console.log(e)
    }

}

start()