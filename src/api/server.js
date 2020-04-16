const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
// const swagger = require('swagger-node-express')
const path = require('path')
const app = express()
const db = require('./config/db')
const routes = require('./routes/routes')
const mongoose = require('mongoose')
const modelsDefinition = require('./db/modelsDefinition')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swaggerSettings')
const logger = require('./utils/logger')
mongoose.connect(db.url, { useNewUrlParser: true })
modelsDefinition()

const mongoDb = mongoose.connection
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: 'mySuperSecret' }))

app.use('/', express.static(path.join(__dirname, '..', 'ui', 'build')))

app.use((req, res, next) => {
    logger.info(req.originalUrl)
    next()
})

mongoDb.on('error', console.error.bind(console, 'connection error:'))
mongoDb.once('open', function () {
    app.use(routes.router)
    app.use(
        '/swaggerDocs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument, { explorer: true })
    )

    app.listen(3002, (err) => {
        if (err) {
            throw err
        }

        console.log('We are live on ' + 3002)
    })
})

process.on('uncaughtException', () => {
    process.exit()
})

process.on('SIGTERM', () => {
    process.exit()
})
