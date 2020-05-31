<template>
    <div class="view-content">
        <div class="content">
            <div class="back" @click="back">
                <img src="../../assets/back.png">返回
            </div>
            <p class="title">{{ articleData.title }}</p>
            <div class="info">
                时间：{{ date }}
                <span style="margin-left: 30px;">标签：</span>
                <Tag v-for="(item, index) in articleData.tags" :key="index">{{ item }}</Tag>
            </div>
            <VueMarkdown class="markdown" :source="articleData.content"/>
        </div>
        <div class="div-comment">
            <p class="p-comment">评论</p>
            <div class="comment" v-for="(item, index) in articleData.comments" :key="index">
                <p class="comment-title">
                    用户：<span>{{ item.user }}</span>
                    <span class="span-time">{{ item.time }}</span>
                </p>
                <div>
                    <VueMarkdown class="markdown" :source="item.comment"/>
                </div>
            </div>
            <div class="div-reply">
                <p class="p-reply">请友善评论</p>
                <Input type="textarea" :rows="6" v-model="comment"/>
                <div class="div-btn">
                    <Button @click="reply">回复</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { mapState } from 'vuex'
import { timestampToDate, formatIP } from '@/utils'
import { addComment, fetchArticleDetail } from '@/api'

export default {
    name: 'artileContent',
    components: {
        VueMarkdown
    },
    data() {
        return {
            date: '',
            comment: '',
            articleData: {},
        }
    },
    created() {
        this.getArticleDetail(this.$route.params.id)
    },
    methods: {
        getArticleDetail(id) {
            fetchArticleDetail(id).then(res => {
                const data = res.data
                this.articleData = data
                this.date = timestampToDate(data.date)
                data.comments.forEach(item => {
                    item.time = timestampToDate(item.time)
                    item.user = formatIP(item.user)
                })
            })
        },

        back() {
            this.$router.back()
        },

        reply() {
            if (this.comment.length > 200 || this.comment.length == 0) {
                this.$Message.error('评论长度为1-200个字符')
                return
            }

            addComment({
                comment: this.comment,
                id: this.articleData._id,
            })
            .then(res => {
                const data = res.data
                this.$route.params.articleData.comments.push({
                    user: formatIP(data.user),
                    comment: this.comment,
                    time: timestampToDate(data.time)
                })

                this.comment = ''
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
