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
const { articleCollection, createDB } = require('../utils/mongo')
const { updateTagsData, searchTagsArticlesData } = require('../utils/article')
const ObjectID = require('mongodb').ObjectID
const { cache } = require('../utils/cache')
const log = require('../utils/log')
const { serialize } = require('../utils/format')

function addArticle(req, res) {
    createDB()
    .then(async (db) => {
        const collection = db.collection(articleCollection)
        const token = req.get('Authorization')
        const vaild = await isVaildToken(db, token) // 验证 token
        
        if (!vaild) {
            res.send({
                code: 2,
                msg: 'token 失效，请重新登陆'
            })

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
        })
    })
    .catch(err => { throw err })
}

function updateArticle(req, res) {
    createDB()
    .then(async (db) => {
        const collection = db.collection(articleCollection)
        const token = req.get('Authorization')
        const vaild = await isVaildToken(db, token) // 验证 token

        if (!vaild) {
            res.send({
                code: 2,
                msg: 'token 失效，请重新登陆'
            })

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
        })
    })
    .catch(err => { throw err })
}

function fetchArticleDetail(req, res) {
    createDB().then(db => {
        db.collection(articleCollection).findOne({ _id: new ObjectID(req.query.id) }).then(result => {
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
    .catch(err => { throw err })
}

function fetchArticles(req, res) {
    createDB().then(db => {
        const query = req.query
        const size = ~~query.pageSize // ~~取整
        const index = ~~query.pageIndex
        const queryObj = {}
        const collection = db.collection(articleCollection)
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
                        })
        })
    })
    .catch(err => { throw err })
}

function deleteArticle(req, res) {
    createDB()
    .then(async (db) => {
        const token = req.get('Authorization')
        // 验证 token
        const vaild = await isVaildToken(db, token)
        const query = { _id: new ObjectID(req.body.id) }
        if (!vaild) {
            res.send({
                code: 2,
                msg: 'token 失效，请重新登陆'
            })
            return
        }

        db.collection(articleCollection).deleteOne(query, err => {
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
        })
    })
    .catch(err => { throw err })
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
    createDB().then(db => {
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
        
        db.collection(articleCollection).updateOne(query, updateContent, err => {
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
        })
    })
    .catch(err => { throw err })
}

module.exports = {
    addArticle,
    updateArticle,
    fetchArticleDetail,
    fetchArticles,
    deleteArticle,
    fetchTagsData,
    fetchTagsArtilesData,
    addComment,
}