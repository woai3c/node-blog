<template>
    <div class="view-edit">
        <header>
            <input type="text" v-model="title" placeholder="请输入文章标题">
            <div class="btn-group">
                <Button type="error" @click="showTagModal">发布文章</Button>
                <Button type="default" @click="quit" class="btn-quit">退出</Button>
            </div>
        </header>
        <section>
            <textarea @scroll="syncScrollHeight" class="left" v-model="content"></textarea>
            <div class="right">
                <VueMarkdown class="markdown" :source="content"/>
            </div>
        </section>
        <div v-show="isShowModal" class="modal-bg">
            <div class="modal">
                <p class="modal-p">请添加标签</p>
                <div class="div-input">
                    <input class="ivu-input" style="margin-right: 10px; font-size: 14px;" v-model="tagVal"/>
                    <Button type="primary" @click="addTag">添加标签</Button>
                </div>
                <Tag @on-close="closeTag(index)" closable v-for="(item, index) in tagsData" :key="index">{{ item }}</Tag>
                <div class="btn-container">
                    <Button style="margin-right: 20px; border: 1px solid #ddd" @click="isShowModal = false">取消</Button>
                    <Button type="primary" @click="publish">发布</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let addArticle, updateArticle, fetchArticleDetail
export default {
    name: 'editor',
    data() {
        return {
            tagsData: [],
            isShowModal: false,
            content: '',
            title: '',
            id: '',
            rightEle: null,
            tagVal: '',
        }
    },
    mounted() {
        const api = require('@/api/client')
        addArticle = api.addArticle
        updateArticle = api.updateArticle
        fetchArticleDetail = api.fetchArticleDetail

        this.rightEle = this.$('.right')

        this.id = this.$route.query.id
        if (this.id) {
            this.getArticleDetail()
        }
    },
    methods: {
        getArticleDetail() {
            fetchArticleDetail(this.id).then(res => {
                const data = res.data
                this.content = data.content
                this.title = data.title
                this.tagsData = data.tags
            })
        },

        syncScrollHeight(e) {
            this.rightEle.scrollTop = e.target.scrollTop
        },

        publish() {
            const obj = {
                title: this.title,
                content: this.content,
                tags: this.tagsData,
            }

            let func = addArticle
            if (this.id) {
                obj.id = this.id
                func = updateArticle
            }
            func(obj).then(res => {
                this.$Message.success('发布成功')
                // 随机生成一个字符串，以便让 manage 页面刷新
                this.$router.push('manage?refresh=' + Math.random())
            })
        },

        quit() {
            this.$router.back()
        },

        showTagModal() {
            this.isShowModal = true
        },

        closeTag(i) {
            this.tagsData.splice(i, 1)
        },

        addTag(e) {
            if (this.tagVal) {
                this.tagsData.push(this.tagVal)
                this.tagVal = ''
            }
        }
    }
}
</script>

<style scoped>
.view-edit {
    height: 100vh;
}
/* 编辑器样式仿 CSDN */
header {
    height: 56px;
    background: #f3f3f3;
    display: flex;
    align-items: center;
    padding: 0 20px;
}
input {
    width: 100%;
    padding: 8px;
    font-size: 18px;
    line-height: 24px;
    background-color: #fff;
    border-radius: 3px;
    outline: 0;
    border: 1px solid #ddd;
    color: #666;
}
.btn-group {
    min-width: 180px;
    padding-left: 10px;
}
button {
    height: 40px;
    padding: 0 16px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    white-space: nowrap;
}
.btn-quit {
    background: #aaa;
    color: #fff;
}
.left {
    background: #eee;
}
.right {
    background: #fff;
}
section {
    height: calc(100% - 56px);
    display: flex;
}
section > * {
    overflow: auto;
    height: 100%;
    width: 50%;
    resize: none;
    padding: 20px;
}
textarea {
    font-size: 16px;
    line-height: 1.5;
    border: 0;
    color: #666;
    font-family: inherit;
    outline: 0;
}
.modal-p {
    font-size: 18px;
}
.div-input {
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.div-input button {
    height: 34px;
}
.ivu-input-wrapper  {
    width: 70%;
}
.ivu-btn-error {
    margin-right: 10px;
}
.btn-container {
    padding-top: 20px;
    border-top: 1px solid #ddd;
    margin-top: 20px;
}
</style>


