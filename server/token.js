const jwt = require('jsonwebtoken')
const key = 'secretKey'

function generateToken(data) {
    const token = jwt.sign({
        data,
        exp: Math.floor(Date.now() / 1000) + (3600 * 24 * 7), // 有效期一周
    }, key)

    return token
}

module.exports = {
    key,
    generateToken,
}