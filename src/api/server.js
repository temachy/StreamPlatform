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

mongoose.connect(db.url, { useNewUrlParser: true })
modelsDefinition()

const mongoDb = mongoose.connection
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: 'mySuperSecret' }))
// swagger.setAppHandler(app)
app.use('/', express.static(path.join(__dirname, '..', 'ui', 'build')))
console.log('swaggerDocument', swaggerDocument)

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

/**
 * @swagger
 * /login:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
