<template>
    <div class="view-content">
        <div class="content">
            <div class="back" @click="back">
                <Icon type="ios-arrow-back" style="font-size: 30px" />返回
            </div>
            <p class="title">{{ articleData.title }}</p>
            <div class="info">
                时间：{{ articleData.date }}
                <span style="margin-left: 30px;">标签：</span>
                <Tag v-for="(item, index) in articleData.tags" :key="index">{{ item }}</Tag>
            </div>
            <VueMarkdown class="markdown" :source="articleData.content"/>
        </div>
        <div class="div-comment">
            <p class="p-comment">评论</p>
            <div class="comment" v-for="(item, index) in articleData.comments" :key="index">
                <p class="comment-title">
                    {{ item.location }} 用户（{{ item.user }}）
                    <span class="span-time">{{ item.time }}</span>
                </p>
                <div>
                    <VueMarkdown class="markdown" :source="item.comment"/>
                </div>
            </div>
            <div class="div-reply">
                <p class="p-reply">请友善评论</p>
                <textarea class="ivu-input" v-model="comment" style="resize: none; height: 140px" />
                <div class="div-btn">
                    <Button @click="reply">回复</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

let addComment, fetchArticleDetail
let isFirst = true
export default {
    data() {
        return {
            comment: '',
            id: '',
        }
    },
    computed: {
        ...mapState([
            'articleData',
        ]),
    },
    asyncData({ store, route }) {
        // 只有第一次进入页面才调用 asyncData
        // 由于组件使用 keep-alive 缓存
        // 当进入页面会触发 activated() 钩子，所以再次进入页面在 activated() 钩子获取数据
        if (isFirst && route.query.id) {
            return store.dispatch('getArticleDetail', route.query.id)
        }

        return Promise.resolve()
    },
    mounted() {
        this.id = this.$route.query.id
        if (!this.id) {
            this.$router.push('/')
        }
    },
    activated() {
        if (isFirst) {
            isFirst = false
            return
        }
        
        this.$store.dispatch('getArticleDetail', this.$route.query.id)
    },
    methods: {
        getArticleDetail() {
            if (!fetchArticleDetail) {
                const api = require('@/api/client')
                fetchArticleDetail = api.fetchArticleDetail
            }
            
            fetchArticleDetail(this.id).then(res => {
                this.$store.commit('setArticleDetail', res.data)
            })
        },

        back() {
            this.$router.back()
        },

        reply() {
            if (!addComment) {
                const api = require('@/api/client')
                addComment = api.addComment
            }
            
            if (this.comment.length > 200 || this.comment.length == 0) {
                this.$Message.error('评论长度为1-200个字符')
                return
            }

            addComment({
                comment: this.comment,
                id: this.articleData._id,
            })
            .then(() => {
                this.comment = ''
                this.getArticleDetail()
            })
        }
    }
}
</script>

<style scoped>
.view-content {
    min-height: 100%;
}
.content {
    background: #fff;
    position: relative;
    padding: 20px;
    height: 100%;
}
.title {
    text-align: center;
    font-size: 24px;
    color: #333;
}
.info {
    font-size: 14px;
    padding: 5px 0;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
}
.back {
    font-size: 16px;
    color: #888;
    display: flex;
    align-items: center;
    width: 70px;
    cursor: pointer;
}
.back img {
    width: 20px;
    margin-right: 10px;
}


.p-comment {
    font-size: 18px;
    color: #333;
    margin-bottom: 20px;
}
.div-comment {
    background: #fff;
    margin-top: 20px;
    padding: 20px;
}
.comment {
    border: 1px solid #ddd;
    margin-bottom: 20px;
    padding: 10px;
}
.span-time {
    margin-left: 20px;
}
.comment-title {
    margin-bottom: 10px;
}
.p-reply {
    font-size: 14px;
    margin-bottom: 10px;
}
.div-btn {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
}
</style>
