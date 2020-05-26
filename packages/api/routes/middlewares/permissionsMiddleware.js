module.exports = (permittedRoles) => (req, res, next) => {
    const decodedToken = req.decoded
    if (permittedRoles.includes(decodedToken.role)) {
        return next()
    }

    return res.error({ message: 'You don`t have permissions' })
}
