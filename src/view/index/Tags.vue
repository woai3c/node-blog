<template>
    <div>
        <ul @click="gotoContent">
            <li v-for="(item, index) in articlesData" :key="index" class="content-li">
                <p class="p-title" :data-index="index">{{ item.title }}</p>
                <p class="date">{{ item.date }}</p>
            </li>
        </ul>
        <Page v-if="totalArticles" show-total class="page" :page-size="pageSize" :total="totalArticles" @on-change="pageChange"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { fetchAllArticles } from '@/api'
import { timestampToDate } from '@/utils'

export default {
    props: {
        articlesData: {
            type: Array,
            default: () => []
        },
        pageIndex: {
            type: Number,
            default: 1,
        },
        pageSize: {
            type: Number,
            default: 10,
        },
        totalArticles: {
            type: Number,
            default: 0,
        },
    },
    methods: {
        gotoContent(e) {
            const target = e.target
            if (target.className == 'p-title') {
                this.$router.push({name: 'content', query: {id: this.articlesData[target.dataset.index]._id}})
            }
        },

        pageChange(index) {
            this.$emit('change', index)
        },
    }
}
</script>

<style scoped>
.content-li {
    background: #fff;
    padding: 20px;
    border: 1px solid #dedede;
    margin-bottom: -1px;
    display: flex;
    justify-content: space-between;
}
.p-title {
    font-size: 18px;
    color: #666;
    cursor: pointer;
}
.date {
    color: #bcbcbc;
    font-size: 12px;
    margin-top: 10px;
}
.tag-title {
    color: #333;
    font-size: 20px;
    margin-bottom: 20px;
}
.page {
    margin-top: 20px;
}
</style>
