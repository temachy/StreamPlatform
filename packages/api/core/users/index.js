const bcrypt = require('bcrypt')

function checkUserPassword(receivedPassword, userPassword) {
    return new Promise((res, reg) => {
        bcrypt.compare(receivedPassword, userPassword, function(err, isMatch) {
            if (err) return reg(err)
            res(isMatch)
        })
    })
}

module.exports = {
    checkUserPassword,
}
