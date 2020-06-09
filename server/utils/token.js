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

function isVaildToken(db, token) {
    return new Promise(resolve => {
        let result
        try {
            result = jwt.verify(token, key)
        } catch(e) {
            resolve(false)
        }

        const { exp } = result
        const current = Math.floor(Date.now() / 1000)
        if (current > exp) {
            resolve(false)
        }

        db.collection(userCollection).findOne({ token }).then(res => {
            if (res) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    })
}

module.exports = {
    generateToken,
    isVaildToken
}