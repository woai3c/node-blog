<template>
    <div class="view-index">
        <header>
            <ul class="tags">
                <li>首页</li>
                <li>关于</li>
            </ul>
        </header>
        <section class="main">
            <div class="content">
                <ul>
                    <li v-for="(item, index) in contentData" :key="index" class="content-li">
                        <p class="p-title">{{ item.title }}</p>
                        <div class="abstract">
                            摘要：{{ item.text }}
                        </div>
                    </li>
                </ul>
            </div>
            <div class="sidebar">
                <ul>
                    <li v-for="(item, index) in sidebarData" :key="index" class="sidebar-li">
                        {{ item.tag }}({{ item.nums }})
                    </li>
                </ul>
            </div>
        </section>
        <footer>
            Copyright ©2019 谭光志
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            contentData: [
                {
                    title: '在浏览器调起本地应用的方法',
                    text: '这是一个测试这是一个测试这是一个测试这是一个测试这是一个测试这是一个测试这是一个测试这是一个测试这是一个测试这是一个测试这是一个测试这是一个测试这是一个测试这是一个测试这是一个测试这是一个测试这是一个测试这是一个测试这是一个测试这是一个测试这是一个测试这是一个测试这是一个测试这是一个测试',
                },
                {
                    title: '在浏览器调起本地应用的方法',
                    text: '111111111',
                },
                {
                    title: '在浏览器调起本地应用的方法',
                    text: '111111111',
                },
                {
                    title: '在浏览器调起本地应用的方法',
                    text: '111111111',
                },
                {
                    title: '在浏览器调起本地应用的方法',
                    text: '111111111',
                },
                {
                    title: '在浏览器调起本地应用的方法',
                    text: '111111111',
                },
            ],
            sidebarData: [
                {
                    tag: '前端',
                    nums: 19
                },
                {
                    tag: '前端',
                    nums: 19
                },
                {
                    tag: '前端',
                    nums: 19
                },
                {
                    tag: '前端',
                    nums: 19
                },
                {
                    tag: '前端',
                    nums: 19
                },
            ]
        }
    }
}
</script>

<style>
.view-index {
    color: #7d8b8d;
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
}
.main {
    width: 1200px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.tags {
    display: flex;
}
.tags li {
    width: 100px;
    cursor: pointer;
}


.content {
    width: 890px;
}
.sidebar {
    width: 290px;
}



.content-li {
    background: #fff;
    padding: 20px;
    border: 1px solid #dedede;
    margin-bottom: -1px;
}
.p-title {
    font-size: 20px;
    color: #555;
}
.abstract {
    font-size: 14px;
    color: #333;
    padding: 15px 0;
    line-height: 2;
}
</style>
