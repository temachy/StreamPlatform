const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const db = require("./config/db")
const routes = require("./routes/routes")
const mongoose = require("mongoose")
const modelsDefinition = require("./db/modelsDefinition")
mongoose.connect(db.url, { useNewUrlParser: true })
modelsDefinition()

const mongoDb = mongoose.connection
app.use(bodyParser.urlencoded({ extended: true }))

mongoDb.on("error", console.error.bind(console, "connection error:"))
mongoDb.once("open", function() {
  app.use(routes.router)
  app.listen(3002, () => {
    console.log("We are live on " + 3002)
  })
})
