/**
 * code
 * 0 成功
 * 1 查找失败
 * 2 token 无效
 * 3 更新失败
 * 4 发布失败
 * 5 删除失败
 * 6 没有查询到用户
 * 7 评论失败
 * 8 登录失败
 * * 获取访问量失败
 */

const path = require('path')
const fs = require('fs')
const { generateToken } = require('../utils/token')
const { connect, database, userCollection } = require('../utils/mongo')

function fetchVisits(req, res) {
    connect((err, db) => {
        if (err) throw err
        const dbo = db.db(database)
        // 这里改成你自己的用户名 和登陆名一致
        const query = { user: 'admin' }
        const collection = dbo.collection(userCollection)
        // visits 自增1
        const updateContent = {
            $inc: { 
                visits: 1
            }
        }
        
        collection.updateOne(query, updateContent, err => {
            if (err) {
                res.send({
                    code: 9,
                    msg: '获取访问量失败'
                })
            } else {
                collection.findOne(query).then(result => {
                    res.send({
                        code: 0,
                        data: result.visits
                    })

                    db.close()
                })
            }
        })
    })
}

function login(req, res) {
    connect((err, db) => {
        if (err) throw err
        const dbo = db.db(database)
        const { user, password } = req.body
        const collection = dbo.collection(userCollection)
        collection.findOne({ user, password }).then(result => {
            if (!result) {
                res.send({
                    code: 6,
                    msg: '没有查询到该用户'
                })
            } else {
                const token = generateToken(user)
                const updateContent = {
                    $set: { 
                        token,
                    }
                }

                collection.updateOne({ user, password }, updateContent, err => {
                    if (err) {
                        res.send({
                            code: 7,
                            msg: '登陆失败，请重试'
                        })
                    } else {
                        res.send({
                            code: 0,
                            data: token
                        })
                    }

                    db.close()
                })
            }
        })
    })
}

function getIndexHTML(req, res) {
    fs.readFile(path.join(__dirname, '../../dist', 'index.html'), { encoding: 'utf-8' }, (err, data) => {
        if (err) throw err
        
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
        })

        res.end(data)
    })
}

module.exports = {
    fetchVisits,
    login,
    getIndexHTML,
}