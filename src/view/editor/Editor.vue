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
        <Modal v-model="isShowModal" @on-ok="publish">
            <p class="modal-p">请添加标签</p>
            <div class="div-input">
                <Input v-model="tagVal"/>
                <Button type="primary" @click="addTag">添加标签</Button>
            </div>
            <Tag @on-close="closeTag(index)" closable v-for="(item, index) in tagsData" :key="index">{{ item }}</Tag>
        </Modal>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { pushArticle, fetchArticleContent } from '../../api'

export default {
    name: 'editor',
    components: {
        VueMarkdown
    },
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
    created() {
        const data = this.$route.params.articleData
        if (data) {
            this.content = data.content
            this.title = data.title
            this.tagsData = data.tags
            this.id = data._id
        }
    },
    mounted() {
        this.rightEle = this.$('.right')
    },
    methods: {
        syncScrollHeight(e) {
            this.rightEle.scrollTop = e.target.scrollTop
        },

        publish() {
            const obj = {
                title: this.title,
                content: this.content,
                tags: this.tagsData,
            }

            if (this.id) obj.id = this.id
            pushArticle(obj).then(res => {
                if (res.data.code == 0) {
                    this.$Message.success('发布成功')
                    this.quit()
                } else {
                    this.$Message.error(res.data.msg)
                }
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
</style>


