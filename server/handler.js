const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const url = 'mongodb://localhost:27017/'
const config = { useNewUrlParser: true }

module.exports = {
    pushArticle(req, res) {
        MongoClient.connect(url, config, (err, db) => {
            if (err) throw err
            const dbo = db.db('blog')
            if (req.body.id) {
                const query = { _id: new ObjectID(req.body.id) }
                const body = req.body
                const updateContent = {
                    $set: { 
                        content: body.content,
                        title: body.title,
                        tags: body.tags
                    }
                }

                dbo.collection('user').updateOne(query, updateContent, err => {
                    if (err) {
                        res.send({
                            code: 1,
                            msg: '更新失败'
                        })
                    } else {
                        res.send({
                            code: 0,
                            data: '更新成功'
                        })
                    }

                    db.close()
                })

            } else {
                const date = new Date()
                const articleData = {
                    ...req.body,
                    date: date,
                    year: date.getFullYear(),
                    month: date.getMonth() + 1
                }
                
                dbo.collection('user').insertOne(articleData, err => {
                    if (err) {
                        res.send({
                            code: 1,
                            msg: '发布失败'
                        })
                    } else {
                        res.send({
                            code: 0,
                            data: '发布成功'
                        })
                    }

                    db.close()
                })
            }
        })
    },

    fetchAllArticles(req, res) {
        MongoClient.connect(url, config, (err, db) => {
            if (err) throw err
            const dbo = db.db('blog')

            dbo.collection('user').find({}).toArray((err, result) => {
                if (err) {
                    res.send({
                        code: 0,
                        msg: '查找失败'
                    })
                } else {
                    res.send({
                        code: 0,
                        data: result
                    })
                }
                
                db.close()
            })
        })
    },

    deleteArticle(req, res) {
        MongoClient.connect(url, config, (err, db) => {
            if (err) throw err
            const dbo = db.db('blog')
            dbo.collection('user').deleteOne({ _id: new ObjectID(req.body.id) }, err => {
                if (err) {
                    res.send({
                        code: 1,
                        msg: '删除失败'
                    })
                } else {
                    res.send({
                        code: 0,
                        msg: '删除成功'
                    })
                }
                
                db.close()
            })
        })
    },

    fetchArticleContent(req, res) {
        MongoClient.connect(url, config, (err, db) => {
            if (err) throw err
            const dbo = db.db('blog')
            dbo.collection('user').find({ _id: new ObjectID(req.query.id) }).toArray((err, result) => {
                if (err) {
                    res.send({
                        code: 0,
                        msg: '查找失败'
                    })
                } else {
                    res.send({
                        code: 0,
                        data: result[0]
                    })
                }
                
                db.close()
            })
        })
    },

    fetchAppointArticles(req, res) {
        MongoClient.connect(url, config, (err, db) => {
            if (err) throw err
            const dbo = db.db('blog')
            const query = req.query
            const queryObj = {}
            if (query.title) queryObj.title = new RegExp(query.title)
            if (query.year) queryObj.year = ~~query.year
            if (query.month) queryObj.month = ~~query.month
            if (query.tags) queryObj.tags = query.tags
            console.log(queryObj)
            dbo.collection('user').find(queryObj).toArray((err, result) => {
                if (err) {
                    res.send({
                        code: 0,
                        msg: '查找失败'
                    })
                } else {
                    res.send({
                        code: 0,
                        data: result
                    })
                }
                
                db.close()
            })
        })
    },
}