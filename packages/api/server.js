const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const app = express()
const db = require('./config/db')
const routes = require('./routes/routes')
const mongoose = require('mongoose')
const modelsDefinition = require('./db/modelsDefinition')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swaggerSettings')
const logger = require('./utils/logger')
const http = require('http').createServer(app)
const mediaServer = require('./mediaServer')
const io = require('socket.io')(http, { origins: '*:*' })
require('dotenv').config()
mongoose.connect(db.url, { useNewUrlParser: true })
modelsDefinition()

const mongoDb = mongoose.connection
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: 'mySuperSecret' }))

app.use('/', express.static(path.join(__dirname, '..', 'ui', 'build')))
app.use('/', express.static(path.join(__dirname, '..', 'api', 'mediaFiles')))
app.use((req, res, next) => {
    logger.info(req.originalUrl)
    next()
})

const port = process.env.PORT || 3002

mongoDb.on('error', console.error.bind(console, 'connection error:'))
mongoDb.once('open', function () {
    app.use(routes.router)
    app.use(
        '/swaggerDocs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument, { explorer: true })
    )

    http.listen(port, (err) => {
        if (err) {
            throw err
        }

        console.log('We are live on ' + port)
    })
})

process.on('uncaughtException', () => {
    process.exit()
})

process.on('SIGTERM', () => {
    process.exit()
})
let localData
io.on('connection', (socket) => {
    socket.on('dataTranslation', (data) => {
        try {
            console.log('Blob', data)

            socket.broadcast.emit('dataBroadcast', data)
        } catch (err) {
            console.log('err', err)
        }
    })
    socket.on('getStream', (data) => {
        console.log('localData', localData)
        socket.emit('sendOffer', localData)
    })
    socket.on('make-answer', (data) => {
        console.log('sendAnswerToHost', data)

        // socket.emit('sendOffer', localData)
    })
})
io.on('disconnect', (socket) => {
    stream.close()
})
mediaServer(process.env.FFMPEG_PATH)
