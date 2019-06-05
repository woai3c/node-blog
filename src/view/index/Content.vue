<template>
    <div class="view-content">
        <p class="title">{{ title }}</p>
        <div class="info">
            时间：{{ date }}
            <span style="margin-left: 30px;">标签：</span>
            <Tag v-for="(item, index) in tags" :key="index">{{ item }}</Tag>
        </div>
        <VueMarkdown class="markdown" :source="content"/>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { mapState } from 'vuex'
import { timestampToDate } from '../../utils'

export default {
    data() {
        return {
            content: '',
            title: '',
            date: '',
            tags: ''
        }
    },
    components: {
        VueMarkdown
    },
    created() {
        const data = this.$route.params.articleData
        if (data) {
            this.content = data.content
            this.title = data.title
            this.tags = data.tags
            this.date = timestampToDate(data.date)
        }
    }
}
</script>

<style scoped>
.view-content {
    background: #fff;
    padding: 20px;
    min-height: 100%;
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
</style>
