<template>
    <div>
        <ul @click="gotoContent">
            <li v-for="(item, index) in articlesData" :key="index" class="content-li">
                <p class="p-title" :data-index="index">{{ item.title }}</p>
                <div class="abstract">
                    摘要：{{ item.content }}
                </div>
                <p class="date">{{ item.date }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { fetchAllArticles } from '../../api'
import { timestampToDate } from '../../utils'

export default {
    computed: mapState([
        'articlesData'
    ]),
    created() {
        fetchAllArticles().then(res => {
            res = res.data
            if (res.code == 0) {
                const data = res.data
                data.forEach(item => {
                    item.date = timestampToDate(item.date)
                })
                
                this.$store.commit('setArticlesData', data)
                this.$store.commit('setArticlesNum', data.length)
            }
        })
    },
    methods: {
        gotoContent(e) {
            const target = e.target
            if (target.className == 'p-title') {
                this.$router.push({name: 'content', params: {articleData: this.articlesData[target.dataset.index]}})
            }
        }
    }
}
</script>

<style scoped>
.content-li {
    background: #fff;
    padding: 20px;
    border: 1px solid #dedede;
    margin-bottom: -1px;
}
.p-title {
    font-size: 20px;
    color: #555;
    cursor: pointer;
}
.abstract {
    font-size: 14px;
    color: #333;
    line-height: 2;
    height: 82px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    margin-top: 10px;
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
</style>
