<template>
    <div class="view-manage">
        <div class="content">
            <div class="article-header">
                <p>全部文章（{{ totalArticles }}）</p>
                <Button class="btn-publish" type="primary" @click="gotoEditor">发布文章</Button>
                <Button to="/index" style="margin-left: 20px">返回首页</Button>
            </div>
            <div class="div-search">
                <p>筛选：</p>
                <Dropdown trigger="click" @on-click="getYear">
                    <Button class="btn">
                        {{ year }}
                        <Icon type="ios-arrow-down"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem v-for="(item, index) in years" :name="item" :key="index">{{ item }}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown trigger="click" @on-click="getMonth">
                    <Button class="btn">
                        {{ month }}
                        <Icon type="ios-arrow-down"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem v-for="(item, index) in months" :name="item" :key="index">{{ item }}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown trigger="click" @on-click="getTag">
                    <Button class="btn btn-tag">
                        {{ tag }}
                        <Icon type="ios-arrow-down"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem v-for="(item, index) in tags" :name="item" :key="index">{{ item }}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Input class="keyword" placeholder="请输入标题关键词" v-model="keyword"/>
                <Button class="btn-search" type="primary" @click="searchArticles">搜索</Button>
            </div>
            <ul class="div-list">
                <li class="li-article" v-for="(item, index) in articlesData" :key="index" :data-index="index" @click="articleOP">
                    <p class="p-title">{{ item.title }}</p>
                    <p>{{ item.date }}</p>
                    <div class="btn-group">
                        <Button type="error">删除</Button>
                        <Button type="primary">编辑</Button>
                    </div>
                </li>
            </ul>
            <Page v-if="totalArticles" show-total class="page" :page-size="pageSize" :total="totalArticles" @on-change="pageChange"/>
        </div>
        <Modal v-model="isShowModal" width="360" class="delete-modal">
            <p slot="header" style="color:#f60;text-align:center">
                <span class="delete-title">删除确认</span>
            </p>
            <div>
                <p class="delete-p">是否要删除该文章？</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" @click="del">删除</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { mapState } from 'vuex'

let fetchArticles, deleteArticle
export default {
    name: 'manage',
    data() {
        return {
            isShowModal: false,
            index: 0,
            year: '年份',
            month: '月份',
            tag: '标签',
            keyword: '',
            months: ['月份', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            pageSize: 10,
            pageIndex: 1,
        }
    },
    computed: {
        ...mapState([
            'years',
            'tags',
            'articlesData',
            'totalArticles',
        ]),
    },
    asyncData({ store, route }) {
        return Promise.all([
            store.dispatch('getYears'),
            store.dispatch('getTagsData'),
            store.dispatch('getArticles', {
                pageSize: 10,
                pageIndex: 1,
            })
        ])
    },
    mounted() {
        const api = require('@/api/client')
        fetchArticles = api.fetchArticles
        deleteArticle = api.deleteArticle
    },
    methods: {
        initData() {
            this.searchArticles()
            this.$store.dispatch('getTagsData')
            this.$store.dispatch('getYears')
        },

        getYear(y) {
            this.pageIndex = 1
            this.year = y
        },

        getMonth(m) {
            this.pageIndex = 1
            this.month = m
        },

        getTag(t) {
            this.pageIndex = 1
            this.tag = t
        },

        articleOP(e) {
            const target = e.target
            const text = target.innerText
            const index = e.currentTarget.dataset.index
            this.index = index
            if (text == '删除') {
                this.isShowModal = true
            } else if (text == '编辑') {
                this.$router.push('editor?id=' + this.articlesData[index]._id)
            } else if (target.className == 'p-title') {
                this.$router.push('content?id=' + this.articlesData[index]._id)
            }
        },

        pageChange(index) {
            this.pageIndex = index
            this.searchArticles()
        },

        gotoEditor() {
            this.$router.push('editor?refresh=' + Math.random())
        },

        del() {
            this.isShowModal = false
            deleteArticle({ id: this.articlesData[this.index]._id }).then(res => {
                this.$Message.success('删除成功')
                this.initData()
            })
        },

        searchArticles() {
            fetchArticles({
                tags: this.tag == '标签'? '' : this.tag,
                year: this.year == '年份'? '' : this.year,
                month: this.month == '月份'? '' : this.month,
                title: this.keyword,
                pageSize: this.pageSize,
                pageIndex: this.pageIndex,
            })
            .then(res => {
                this.$store.commit('setArticles', res)
            })
        }
    }
}
</script>

<style scoped>
/* 样式仿CSDN */
button {
    min-width: 80px;
}
.view-manage {
    background: #eee;
    font-size: 14px;
    overflow: auto;
    height: 100vh;
}
.content {
    min-height: 100%;
    width: 1000px;
    margin: auto;
    background: #fff;
    padding: 20px;
}
.div-search {
    margin-top: 16px;
    padding: 16px;
    font-size: 14px;
    background-color: #f2f5f7;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.btn {
    text-align: left;
}
.btn-tag {
    width: 200px;
}
.ivu-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
}
.ivu-btn-error {
    margin-right: 10px;
}
.keyword {
    width: 200px;
}
.li-article {
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dotted #ddd;
}
.p-title {
    font-size: 16px;
    width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
}
.li-article button {
    font-size: 16px;
}
.page {
    margin-top: 20px;
}
.article-header {
    display: flex;
    align-items: center;
}
.btn-publish {
    margin-left: 20px;
}
.delete-modal button {
    width: 100%;
}
.delete-p {
    font-size: 16px;
    text-align: center;
    padding: 20px 0;
}
.delete-title {
    font-size: 20px;
}
</style>
