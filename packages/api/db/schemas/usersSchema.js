const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const ObjectId = require('mongodb').ObjectID

const userSchema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        login: String,
        password: String,
        email: { type: String, unique: true },
        role: {
            type: String,
            enum: ['user', 'admin', 'teacher'],
            default: 'user',
        },
        isDisabled: Boolean,
    },
    { timestamps: true }
)

userSchema.pre(
    'save',
    function (next) {
        const user = this
        user._id = ObjectId()
        user.isDisabled = false

        if (!user.isModified('password')) {
            return next()
        }
        bcrypt.hash(user.password, 10).then((hashedPassword) => {
            user.password = hashedPassword
            next()
        })
    },
    function (err) {
        next(err)
    }
)

module.exports = mongoose.model('Users', userSchema)
