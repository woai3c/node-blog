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

const { isVaildToken } = require('../utils/token')
const { getClientIp, ipToCity, formatIP } = require('../utils/ip')
const { connect, articleCollection, database } = require('../utils/mongo')
const { updateTagsData, searchTagsArticlesData } = require('../utils/article')
const ObjectID = require('mongodb').ObjectID
const { cache } = require('../utils/cache')

function addArticle(req, res) {
    connect(async (err, db) => {
        if (err) throw err
        const dbo = db.db(database)
        const collection = dbo.collection(articleCollection)
        const token = req.get('Authorization')
        const vaild = await isVaildToken(dbo, token) // 验证 token
        
        if (!vaild) {
            res.send({
                code: 2,
                msg: 'token 失效，请重新登陆'
            })

            db.close()
            return
        }

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
                    code: 4,
                    msg: '发布失败'
                })
            } else {
                updateTagsData()
                cache.setTagsStatus(true)
                res.send({
                    code: 0,
                    data: '发布成功'
                })
            }

            db.close()
        })
    })
}

function updateArticle(req, res) {
    connect(async (err, db) => {
        if (err) throw err
        const dbo = db.db(database)
        const collection = dbo.collection(articleCollection)
        const token = req.get('Authorization')
        const vaild = await isVaildToken(dbo, token) // 验证 token

        if (!vaild) {
            res.send({
                code: 2,
                msg: 'token 失效，请重新登陆'
            })

            db.close()
            return
        }

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
                    code: 3,
                    msg: '更新失败'
                })
            } else {
                updateTagsData()
                cache.setTagsStatus(true)
                res.send({
                    code: 0,
                    data: '更新成功'
                })
            }

            db.close()
        })
    })
}

function fetchArticleDetail(req, res) {
    connect((err, db) => {
        if (err) throw err
        const dbo = db.db(database)
        dbo.collection(articleCollection).findOne({ _id: new ObjectID(req.query.id) }).then(result => {
            if (!result) {
                res.send({
                    code: 1,
                    msg: '查找失败',
                    data: []
                })
            } else {
                result.comments.forEach(comment => {
                    comment.user = formatIP(comment.user)
                })

                res.send({
                    code: 0,
                    data: result,
                })
            }
        })
    })
}

function fetchArticles(req, res) {
    connect((err, db) => {
        if (err) throw err
        const dbo = db.db(database)
        const query = req.query
        const size = ~~query.pageSize // ~~取整
        const index = ~~query.pageIndex
        const queryObj = {}
        const collection = dbo.collection(articleCollection)
        if (query.title) queryObj.title = new RegExp(query.title)
        if (query.year) queryObj.year = ~~query.year
        if (query.month) queryObj.month = ~~query.month
        if (query.tags) queryObj.tags = query.tags

        collection.find(queryObj).count((err, num) => {
            if (err) throw err
            collection.find(queryObj)
                        .project({ content: 0, comments: 0 })
                        .skip(size * (index - 1))
                        .limit(size)
                        .toArray((err, result) => {
                            if (err) {
                                res.send({
                                    code: 1,
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
}

function deleteArticle(req, res) {
    connect(async (err, db) => {
        if (err) throw err
        const dbo = db.db(database)
        const token = req.get('Authorization')
        // 验证 token
        const vaild = await isVaildToken(dbo, token)
        const query = { _id: new ObjectID(req.body.id) }
        if (!vaild) {
            res.send({
                code: 2,
                msg: 'token 失效，请重新登陆'
            })

            db.close()
            return
        }

        dbo.collection(articleCollection).deleteOne(query, err => {
            if (err) {
                res.send({
                    code: 5,
                    msg: '删除失败'
                })
            } else {
                updateTagsData()
                res.send({
                    code: 0,
                    msg: '删除成功'
                })
            }
            
            db.close()
        })
    })
}

function fetchTagsData(req, res) {
    const tagsData = cache.getTagsData()
    if (tagsData.length && !cache.getTagsStatus()) {
        res.send({
            code: 0,
            data: tagsData
        })

        return 
    }

    updateTagsData(res)
}

function fetchTagsArtilesData(req, res) {
    if (!cache.getTagsData().length) {
        res.send({
            code: 0,
            msg: '没有标签数据',
            data: []
        })

        return
    }

    if (!cache.getTagsStatus()) {
        res.send({
            code: 0,
            data: cache.getTagsArticlesData()
        })

        return 
    }

    cache.setTagsStatus(false)
    searchTagsArticlesData(res)
}

function addComment(req, res) {
    connect((err, db) => {
        if (err) throw err
        const dbo = db.db(database)
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
                    user: ip,
                    location: ipToCity(ip),
                }
            }
        }
        
        dbo.collection(articleCollection).updateOne(query, updateContent, err => {
            if (err) {
                res.send({
                    code: 8,
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
}

module.exports = {
    addArticle,
    updateArticle,
    fetchArticleDetail,
    fetchArticles,
    fetchArticles,
    deleteArticle,
    fetchTagsData,
    fetchTagsArtilesData,
    addComment,
}