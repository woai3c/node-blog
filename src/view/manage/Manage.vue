<template>
    <div class="view-manage">
        <div class="content">
            <div class="article-header">
                <p>全部文章（{{ articleNum }}）</p>
                <Button class="btn-publish" type="primary" @click="gotoEditor">发布文章</Button>
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
                <Input class="keyword" placeholder="请输入标题关键词"/>
                <Button class="btn-search" type="primary">搜索</Button>
            </div>
            <ul class="div-list">
                <li class="li-article" v-for="(item, index) in articleData" :key="index" :data-id="item.id" @click="articleOP">
                    <p class="p-title">{{ item.title }}</p>
                    <p>{{ item.date }}</p>
                    <div class="btn-group">
                        <Button type="error">删除</Button>
                        <Button type="primary">编辑</Button>
                    </div>
                </li>
            </ul>
            <Page class="page" :page-size="8" :total="100" @on-change="pageChange"/>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            articleNum: 0,
            year: '年份',
            month: '月份',
            tag: '分类',
            years: [
                '2019',
                '2018',
                '2017',
            ],
            months: [
                '12',
                '11',
                '10',
            ],
            tags: [
                '前端',
                '后端',
                'IOS',
            ]
        }
    },
    computed: {
        articleData() {
            return this.$store.state.articleData
        }
    },
    methods: {
        getYear(y) {
            this.year = y
        },

        getMonth(m) {
            this.month = m
        },

        getTag(t) {
            this.tag = t
        },

        articleOP(e) {
            const target = e.target
            const text = target.innerText
            if (text == '删除') {
                console.log(e.currentTarget.dataset.id)
            } else if (text == '编辑') {
                this.$router.push({name: 'editor', params: {id: e.currentTarget.dataset.id}})
            } else if (target.className == 'p-title') {
                this.$router.push({name: 'content', params: {id: e.currentTarget.dataset.id}})
            }
        },

        pageChange(p) {
            console.log(p)
        },

        gotoEditor() {
            this.$router.push({name: 'editor'})
        }
    },
    mounted() {
        const loginViewStyle = this.$('.view-manage').style
        loginViewStyle.height = `${document.documentElement.clientHeight}px`
        window.onresize = () => {
            loginViewStyle.height = `${document.documentElement.clientHeight}px`
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
</style>
