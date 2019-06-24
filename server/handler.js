const { generateToken, isVaildToken } = require('./token')
const { getClientIp } = require('./utils')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const url = 'mongodb://localhost:27017/'
const config = { useNewUrlParser: true }
// 保存文章数据的集合/表
const articleCollection = 'myBlogArticles'
let tagsCacheData = []
let tagsArticlesCacheData = {}
let totalCacheArticles = 0
// 标签数据是否改变
let isTagsChange = true

initData()

module.exports = {
    pushArticle(req, res) {
        MongoClient.connect(url, config, async (err, db) => {
            if (err) throw err
            const dbo = db.db('blog')
            const token = req.get('Authorization')
            // 验证 token
            const vaild = await isVaildToken(dbo, token)
            const collection = dbo.collection(articleCollection)
            if (!vaild) {
                res.send({
                    code: 1,
                    msg: '无效的 token'
                })

                db.close()
                return
            }

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

                collection.updateOne(query, updateContent, err => {
                    if (err) {
                        res.send({
                            code: 1,
                            msg: '更新失败'
                        })
                    } else {
                        updateTagsData()
                        isTagsChange = true
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
                    month: date.getMonth() + 1,
                    comments: [],
                }
                
                collection.insertOne(articleData, err => {
                    if (err) {
                        res.send({
                            code: 1,
                            msg: '发布失败'
                        })
                    } else {
                        updateTagsData()
                        getAllArticlesNum()
                        isTagsChange = true
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
            const query = req.query
            const size = ~~query.pageSize
            const index = ~~query.pageIndex
            dbo.collection(articleCollection).find().skip(size * (index - 1)).limit(size).toArray((err, result) => {
                if (err) {
                    res.send({
                        code: 0,
                        msg: '查找失败'
                    })
                } else {
                    res.send({
                        code: 0,
                        data: result,
                        total: totalCacheArticles,
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
            // ~~取整
            const size = ~~query.pageSize
            const index = ~~query.pageIndex
            const queryObj = {}
            const collection = dbo.collection(articleCollection)
            if (query.title) queryObj.title = new RegExp(query.title)
            if (query.year) queryObj.year = ~~query.year
            if (query.month) queryObj.month = ~~query.month
            if (query.tags) queryObj.tags = query.tags

            collection.find(queryObj).count((err, num) => {
                if (err) throw err
                collection.find(queryObj).skip(size * (index - 1)).limit(size).toArray((err, result) => {
                    if (err) {
                        res.send({
                            code: 0,
                            msg: '查找失败',
                            data: []
                        })
                    } else {
                        res.send({
                            code: 0,
                            data: result,
                            total: num,
                        })
                    }
                    
                    db.close()
                })
            })
        })
    },

    deleteArticle(req, res) {
        MongoClient.connect(url, config, async (err, db) => {
            if (err) throw err
            const dbo = db.db('blog')
            const token = req.get('Authorization')
            // 验证 token
            const vaild = await isVaildToken(dbo, token)
            const query = { _id: new ObjectID(req.body.id) }
            if (!vaild) {
                res.send({
                    code: 1,
                    msg: '无效的 token'
                })

                db.close()
                return
            }

            dbo.collection(articleCollection).deleteOne(query, err => {
                if (err) {
                    res.send({
                        code: 1,
                        msg: '删除失败'
                    })
                } else {
                    updateTagsData()
                    getAllArticlesNum()
                    res.send({
                        code: 0,
                        msg: '删除成功'
                    })
                }
                
                db.close()
            })
        })
    },

    fetchTagsData(req, res) {
        if (tagsCacheData.length && !isTagsChange) {
            res.send({
                code: 0,
                data: tagsCacheData
            })

            return 
        }

        updateTagsData(res)
    },

    fetchTagsArtilesData(req, res) {
        if (!tagsCacheData.length) {
            res.send({
                code: 0,
                msg: '没有标签数据',
                data: []
            })

            return
        }

        if (!isTagsChange) {
            res.send({
                code: 0,
                data: tagsArticlesCacheData
            })

            return 
        }

        isTagsChange = false
        searchTagsArticlesData(res)
    },

    login(req, res) {
        MongoClient.connect(url, config, (err, db) => {
            if (err) throw err
            const dbo = db.db('blog')
            const { user, password } = req.body
            const collection = dbo.collection('user')
            collection.findOne({ user, password }).then(result => {
                if (!result) {
                    res.send({
                        code: 1,
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
                                code: 1,
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
    },

    comment(req, res) {
        MongoClient.connect(url, config, (err, db) => {
            if (err) throw err
            const dbo = db.db('blog')
            const { comment, id } = req.body
            const query = { _id: new ObjectID(id) }
            const time = new Date()
            const ip = getClientIp(req)
            // 更新评论
            const updateContent = {
                $addToSet: { 
                    comments: {
                        comment,
                        time,
                        user: ip
                    }
                }
            }
            
            dbo.collection(articleCollection).updateOne(query, updateContent, err => {
                if (err) {
                    res.send({
                        code: 1,
                        msg: '评论失败'
                    })
                } else {
                    res.send({
                        code: 0,
                        msg: '评论成功',
                        data: {
                            time,
                            user: ip,
                        }
                    })
                }

                db.close()
            })
        })
    },

    fetchVisits(req, res) {
        MongoClient.connect(url, config, (err, db) => {
            if (err) throw err
            const dbo = db.db('blog')
            const query = { user: 'admin' }
            const collection = dbo.collection('user')
            // visits 自增1
            const updateContent = {
                $inc: { 
                    visits: 1
                }
            }
            
            collection.updateOne(query, updateContent, err => {
                if (err) {
                    res.send({
                        code: 1,
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
}

function initData() {
    // 更新并缓存标签数据
    updateTagsData()
    // 获取文章总数
    getAllArticlesNum()
}

// 更新标签信息
function updateTagsData(res) {
    MongoClient.connect(url, config, (err, db) => {
        if (err) throw err
        const dbo = db.db('blog')
        dbo.collection(articleCollection).find({ tags: new RegExp('') }).toArray((err, result) => {
            if (err) throw err
            let arry = []
            result.forEach(item => {
                arry.push(...item.tags)
            })

            arry = [...new Set(arry)]
            tagsCacheData = arry
            if (res) {
                res.send({
                    code: 0,
                    data: arry
                })
            }

            db.close()
        })
    })
}

// 搜索文章标签数据
function searchTagsArticlesData(res) {
    MongoClient.connect(url, config, (err, db) => {
        if (err) throw err
        const dbo = db.db('blog')
        const lastIndex = tagsCacheData.length - 1
        tagsArticlesCacheData = {}
        tagsCacheData.forEach((item, i) => {
            dbo.collection(articleCollection).find({ tags: item }).toArray((err, result) => {
                if (err) throw err
                tagsArticlesCacheData[item] = result.length
                if (res && i == lastIndex) {
                    res.send({
                        code: 0,
                        data: tagsArticlesCacheData
                    })
                }

                db.close()
            })
        })
    })
}

// 获取文章总数
function getAllArticlesNum() {
    MongoClient.connect(url, config, (err, db) => {
        if (err) throw err
        const dbo = db.db('blog')
        dbo.collection(articleCollection).find().count((err, result) => {
            totalCacheArticles = result
            db.close()
        })
    })
}