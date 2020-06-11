const { cache } = require('../utils/cache')
const { articleCollection, createDB } = require('../utils/mongo')

function initArticleConfig() {
    // 更新并缓存标签数据
    updateTagsData()
}

// 更新标签信息
function updateTagsData(res) {
    createDB().then(db => {
        db.collection(articleCollection).find({ tags: new RegExp('') }).toArray((err, result) => {
            if (err) throw err
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
    .catch(err => { throw err })
}

// 搜索文章标签数据
function searchTagsArticlesData(res) {
    createDB().then(db => {
        const tagsData = cache.getTagsData()
        const lastIndex = tagsData.length - 1
        tagsData.forEach((item, i) => {
            db.collection(articleCollection).find({ tags: item }).toArray((err, result) => {
                if (err) throw err
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
    .catch(err => { throw err })
}

module.exports = {
    initArticleConfig,
    updateTagsData,
    searchTagsArticlesData,
}