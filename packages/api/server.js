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
mediaServer(process.env.FFMPEG_PATH)
