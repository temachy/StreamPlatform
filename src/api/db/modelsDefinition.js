const mongoose = require("mongoose")
const usersModel = require("./schemas/usersSchema")
const autoIncrement = require("mongoose-auto-increment")

function modelsDefinition() {
  autoIncrement.initialize(mongoose)

  usersModel.plugin(autoIncrement.plugin, "Users")
  const User = mongoose.model("Users", usersModel)
  // const testUser = new User({
  //   name: {
  //     firstName: "id",
  //     lastName: "id"
  //   }
  // })
  // testUser.save(err => {
  //   console.log("err", err)
  // })
}

module.exports = modelsDefinition
