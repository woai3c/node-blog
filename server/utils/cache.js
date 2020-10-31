class Cache {
    constructor() {
        this.years = []
        this.tagsData = []
        this.tagsArticlesData = {}
        this.isTagsChange = true // 标签数据是否改变
    }

    getTagsStatus() {
        return this.isTagsChange
    }

    setTagsStatus(status) {
        this.isTagsChange = status
    }

    getTagsArticlesData() {
        return this.tagsArticlesData
    }

    setTagsArticlesData(tag, len) {
        this.tagsArticlesData[tag] = len
    }

    getYears() {
        return this.years
    }

    setYears(data) {
        this.years = data
    }

    getTagsData() {
        return this.tagsData
    }

    setTagsData(data) {
        this.tagsData = data
    }
}

const cache = new Cache()
module.exports = {
    cache
}