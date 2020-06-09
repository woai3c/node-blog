const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'
const config = { useNewUrlParser: true }
const articleCollection = 'myBlogArticles' // 保存文章数据的集合/表
const database = 'blog' // 数据库名称
const userCollection = 'user' // 保存用户信息的集合/表
let mongodbClient
let db

function connect(callback) {
    MongoClient.connect(url, config, callback)
}

function createDB() {
    return new Promise((resolve, reject) => {
        if (db) {
            resolve(db)
        } else {
            MongoClient.connect(url, config, function(err, client) {
                if (err) reject(err)

                mongodbClient = client
                db = mongodbClient.db(database)

                process.on('exit', (code) => {
                    dbClose()
                })

                resolve(db)
            })
        }
    })
}

function dbClose() {
    if (mongodbClient && mongodbClient.isConnected()) {
        mongodbClient.close()
    }
}

module.exports = {
    createDB,
    connect,
    articleCollection,
    database,
    userCollection,
}