<template>
    <div class="view-index">
        <header>
            <ul class="tags">
                <li @click="gotoPage('index')">首页</li>
                <li @click="gotoPage('about')">关于</li>
            </ul>
        </header>
        <section class="main">
            <div class="content">
                <router-view></router-view>
            </div>
            <div class="sidebar">
                <div class="introduction">
                    <div>
                        <img src="../../assets/person.jpg" alt="我的照片">
                    </div>
                    <p>woai3c</p>
                    <div class="my-link">
                        <a target="_blank" href="https://github.com/woai3c">
                            <svg class="octicon octicon-mark-github v-align-middle" height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
                        </a>
                        <a target="_blank" href="https://www.zhihu.com/people/tan-guang-zhi-19/activities">
                            <img src="../../assets/zhihu.jpg" alt="知乎">
                        </a>
                    </div>
                </div>
                <div class="tag-header">
                    我的标签
                </div>
                <ul @click="toggleTag">
                    <li v-for="(item, index) in sidebarData" :key="index" class="sidebar-li">
                        {{ item.tag }}({{ item.nums }})
                    </li>
                </ul>
            </div>
        </section>
        <footer>
            <p @click="gotoLogin">Copyright ©2019 woai3c</p>
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sidebarData: [
                {
                    tag: '前端',
                    nums: 10
                },
                {
                    tag: '后端',
                    nums: 15
                },
                {
                    tag: '测试',
                    nums: 2
                },
                {
                    tag: '人工智能',
                    nums: 19
                },
                {
                    tag: '大数据',
                    nums: 1
                },
            ]
        }
    },
    created() {

    },
    methods: {
        gotoPage(name) {
            this.$store.commit('setCurrentTag', '')
            this.$router.push(name)
        },

        toggleTag(e) {
            this.$store.commit('setCurrentTag', e.target.innerHTML.trim().split('(')[0])
            this.$router.push('index')
        },

        gotoLogin() {
            this.$router.push('manage')
        }
    }
}
</script>

<style scoped>
.view-index {
    background: #eee;
}
header,
footer {
    background: #333;
    text-align: center;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    font-size: 18px;
}
.main {
    width: 1200px;
    margin: 20px auto;
    min-height: 707px;
    display: flex;
    justify-content: space-between;
}
.tags {
    display: flex;
    margin: auto;
    width: 1200px;
}
.tags li {
    width: 100px;
    cursor: pointer;
}
li {
    font-size: 20px;
}

.content {
    width: 890px;
}
.sidebar {
    width: 290px;
    color: #7d8b8d;
}


.sidebar-li {
    padding: 15px;
    background: #fff;
    border: 1px solid #dedede;
    border-top: 0;
    cursor: pointer;
    font-size: 16px;
}
.sidebar-li:hover {
    background: #dedede;
    color: #fff;
}
.tag-header {
    background: #333;
    border: 1px solid #dedede;
    border-bottom: 0;
    color: #fff;
    padding: 15px;
    font-size: 16px;
}
.introduction {
    margin-bottom: 10px;
    font-size: 16px;
}
.introduction a {
    display: inline-block;
}
.my-link {
    display: flex;
    align-items: center;
    margin: 20px 0;
}
.my-link a {
    width: 34px;
    height: 34px;
    margin-right: 20px;
}
.my-link img {
    width: 100%;
}
</style>
