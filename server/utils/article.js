const { cache } = require('../utils/cache')
const { articleCollection, createDB } = require('../utils/mongo')
const { handleError } = require('../utils/log')

function initArticleConfig() {
    // 更新并缓存标签数据
    updateTagsData()
    updateYears()
}

// 更新标签信息
function updateTagsData(res) {
    createDB().then(db => {
        db.collection(articleCollection).find({ tags: new RegExp('') }).toArray((err, result) => {
            if (err) handleError(err)
            let arry = []
            result.forEach(item => {
                arry.push(...item.tags)
            })

            arry = [...new Set(arry)]
            cache.setTagsData(arry)
            if (res) {
                res.send({
                    code: 0,
                    data: arry
                })
            }
        })
    })
    .catch(err => { handleError(err) })
}

// 搜索文章标签数据
function searchTagsArticlesData(res) {
    createDB().then(db => {
        const tagsData = cache.getTagsData()
        const lastIndex = tagsData.length - 1
        tagsData.forEach((item, i) => {
            db.collection(articleCollection).find({ tags: item }).toArray((err, result) => {
                if (err) handleError(err)
                cache.setTagsArticlesData(item, result.length)
                if (res && i == lastIndex) {
                    res.send({
                        code: 0,
                        data: cache.getTagsArticlesData()
                    })
                }
            })
        })
    })
    .catch(err => { handleError(err) })
}

// 更新年份信息
function updateYears(res) {
    createDB()
    .then(db => {
        db.collection(articleCollection).find().toArray((err, result) => {
            if (err) handleError(err)
            const s = new Set()
            result.forEach(item => {
                s.add(item.year)
            })

            const arry = [...s]
            cache.setYears(arry)
            if (res) {
                res.send({
                    code: 0,
                    data: arry
                })
            }
        })
    })
    .catch(err => { handleError(err) })
}

module.exports = {
    initArticleConfig,
    updateTagsData,
    searchTagsArticlesData,
    updateYears,
}