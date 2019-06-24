<template>
    <div class="app">
        <keep-alive :include="keepAliveData">
            <router-view/>
        </keep-alive>
        <div class="loading" v-show="isShowLoading">
            <Spin size="large"></Spin>
        </div>
    </div>
</template>

<script>
import { fetchAppointArticles, fetchTagsData, fetchVisits } from './api'
import { mapState } from 'vuex'
import { timestampToDate, formatVisits } from './utils'

export default {
    data() {
        return {
            isShowLoading: false,
            keepAliveData: ['manage'],
            loadingCount: 0,
        }
    },
    computed: {
        ...mapState([
            'articlesNum',
            'tags',
            'articlesData',
            'year',
            'month',
            'tag',
            'keyword',
            'pageSize',
            'pageIndex',
            'totalArticles',
        ]),
    },
    created() {
        // 添加请求拦截器
        this.$axios.interceptors.request.use(config => {
            this.addLoading()
            if (localStorage.getItem('token')) {
                config.headers['Authorization'] = localStorage.getItem('token')
            }
            
            return config
        }, error => {
            this.isShowLoading = false
            this.loadingCount = 0
            this.$Message.error('网络异常，请稍后再试')
            return Promise.reject(error)
        })

        // 添加响应拦截器
        this.$axios.interceptors.response.use(response => {
            this.isCloseLoading()
            const res = response.data
            if (res.code == 0) {
                return res
            }

            console.log(res.msg)
            this.$Message.error(res.msg)
            return Promise.reject(new Error(res.msg || 'Error'))
        }, error => {
            this.isShowLoading = false
            this.loadingCount = 0
            this.$Message.error('网络异常，请稍后再试')
            return Promise.reject(error)
        })

        // 获取访问次数
        fetchVisits().then(res => {
            this.$store.commit('setVisits', formatVisits(res.data))
        })
    },
    watch: {
        $route(to, from) {
            const fname = from.name
            const tname = to.name
            if (from.meta.isPublish || (fname != 'editor' && fname != 'content' && tname == 'manage')) {
                from.meta.isPublish = false
                this.$store.commit('setPageIndex', 1)
                fetchAppointArticles({
                    tags: this.tag == '标签'? '' : this.tag,
                    year: this.year == '年份'? '' : this.year,
                    month: this.month == '月份'? '' : this.month,
                    title: this.keyword,
                    pageSize: this.pageSize,
                    pageIndex: this.pageIndex,
                })
                .then(res => {
                    const data = res.data
                    data.forEach(item => {
                        item.date = timestampToDate(item.date)
                    })

                    this.$store.commit('setTotalArticles', res.total)
                    this.$store.commit('setArticlesData', data)
                })

                fetchTagsData().then(res => {
                    this.$store.commit('setTags', ['标签', ...res.data])
                })
            }
        }
    },
    methods: {
        addLoading() {
            this.isShowLoading = true
            this.loadingCount++
        },

        isCloseLoading() {
            this.loadingCount--
            if (this.loadingCount == 0) {
                this.isShowLoading = false
            }
        }
    }
}
</script>

<style>
/* reset */
body, p, div, table, tr, th, td, thead, tbody, ul, li, ol, a, section, header, footer, article, aside, textarea {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
li {
    list-style: none;
}
/* global style */
body {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
    background: #eee;
    font-size: 14px;
}
a {
    text-decoration: none;
    color: #7d8b8d;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}

/* loading */
.loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(255,255,255,.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

/* markdown style */
.markdown {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
    font-size: 16px;
    line-height: 1.5;
    word-wrap: break-word;
}
.markdown>:first-child {
    margin-top: 0!important;
}
.markdown h1,
.markdown h2 {
    border-bottom: 1px solid #eaecef;
    padding-bottom: .3em;
}
.markdown h1,
.markdown h2, 
.markdown h3, 
.markdown h4, 
.markdown h5, 
.markdown h6 {
    font-weight: 600;
    line-height: 1.25;
    margin-bottom: 16px;
    margin-top: 24px;
}
code, 
pre, 
tt {
    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
    font-size: 14px;
}
.markdown pre {
    background-color: #f6f8fa;
    border-radius: 3px;
    font-size: 85%;
    line-height: 1.45;
    overflow: auto;
    padding: 16px;
    color: #24292e;
    font-size: 14px;
    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
    margin: 0;
    margin-bottom: 1em;
}
.markdown code {
    background-color: transparent;
    border: 0;
    display: inline;
    line-height: inherit;
    margin: 0;
    max-width: auto;
    overflow: visible;
    padding: 0;
    word-wrap: normal;
}
.markdown table {
    display: block;
    overflow: auto;
    width: 100%;
    margin-bottom: 15px;
}
.markdown table tr {
    background-color: #fff;
    border-top: 1px solid #c6cbd1;
}
.markdown table td,
.markdown table th {
    border: 1px solid #dfe2e5;
    padding: 6px 13px;
}
.markdown p {
    margin-bottom: 1em;
}
.markdown li {
    word-wrap: break-all;
    list-style: disc;
}
.markdown ol,
.markdown ul {
    padding-left: 2em;
}
.markdown blockquote, 
.markdown details, 
.markdown dl, 
.markdown ol, 
.markdown p, 
.markdown pre, 
.markdown table, 
.markdown ul {
    margin-bottom: 16px;
    margin-top: 0;
}
.markdown a {
    color: #0366d6;
    text-decoration: none;
}
</style>
