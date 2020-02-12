const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
  {
    name: {
      firstName: String,
      lastName: String
    },
    password: String,
    email: {type:String,unique:true},
    role: {
      type: String,
      enum: ["user", "admin", "teacher"],
      default: "user"
    }
  },
  { timestamps: true }
)

module.exports = userSchema
