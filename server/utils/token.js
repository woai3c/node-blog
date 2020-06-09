const jwt = require('jsonwebtoken')
const { userCollection } = require('./mongo')
const key = 'secretKey' // 密钥

function generateToken(data) {
    const token = jwt.sign({
        data,
        exp: Math.floor(Date.now() / 1000) + (3600 * 24 * 7), // 有效期一周
    }, key)

    return token
}

async function isVaildToken(db, token) {
    let result
    try {
        result = jwt.verify(token, key)
    } catch(e) {
        console.log(e)
        return false
    }

    const { exp } = result
    const current = Math.floor(Date.now() / 1000)
    if (current > exp) {
        return false
    }

    const res = await db.collection(userCollection).findOne({ token })
    if (res) {
        return true
    }
 
    return false
}

module.exports = {
    generateToken,
    isVaildToken
}