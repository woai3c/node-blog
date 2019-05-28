<template>
    <div class="view-edit">
        <header>
            <input type="text" v-model="title" placeholder="请输入文章标题">
            <div class="btn-group">
                <button @click="publish">发布文章</button>
                <button @click="quit" class="btn-quit">退出</button>
            </div>
        </header>
        <section>
            <textarea @scroll="syncScrollHeight" class="left" v-model="content"></textarea>
            <div class="right">
                <VueMarkdown class="markdown" :source="content"/>
            </div>
        </section>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
    components: {
        VueMarkdown
    },
    data() {
        return {
            content: '',
            title: '',
            rightEle: null,
        }
    },
    created() {
        console.log(this.$route.params.id)
    },
    mounted() {
        const editViewStyle = this.$('.view-edit').style
        editViewStyle.height = `${document.documentElement.clientHeight}px`
        window.onresize = () => {
            editViewStyle.height = `${document.documentElement.clientHeight}px`
        }

        this.rightEle = this.$('.right')
    },
    methods: {
        syncScrollHeight(e) {
            this.rightEle.scrollTop = e.target.scrollTop
        },

        publish() {
            this.$store.commit('setArticleInfo', {
                content: this.content,
                title: this.title
            })
        },

        quit() {
            this.$router.back()
        }
    }
}
</script>

<style scoped>
/* 编辑器样式仿 CSDN */
header {
    height: 56px;
    background: #f3f3f3;
    display: flex;
    align-items: center;
    padding: 0 20px;
}
input {
    width: 100%;
    padding: 8px;
    font-size: 18px;
    line-height: 24px;
    background-color: #fff;
    border-radius: 3px;
    outline: 0;
    border: 1px solid #ddd;
    color: #666;
}
.btn-group {
    min-width: 180px;
    padding-left: 10px;
}
button {
    height: 40px;
    padding: 0 16px;
    font-size: 16px;
    color: #fff;
    border: none;
    border-radius: 4px;
    white-space: nowrap;
    background-color: #ca0c16;
}
.btn-quit {
    background: #aaa;
}
.left {
    background: #eee;
}
.right {
    background: #fff;
}
section {
    height: calc(100% - 56px);
    display: flex;
}
section > * {
    overflow: auto;
    height: 100%;
    width: 50%;
    resize: none;
    padding: 20px;
}
textarea {
    font-size: 16px;
    line-height: 1.5;
    border: 0;
    color: #666;
    font-family: inherit;
    outline: 0;
}
</style>


