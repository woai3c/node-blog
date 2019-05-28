<template>
    <div>
        <p class="tag-title" v-show="currentTag">
            <span>已切换到标签：</span>
            {{ currentTag }}
        </p>
        <ul @click="gotoContent">
            <li v-for="(item, index) in articleData" :key="index" class="content-li">
                <p class="p-title" :data-id="item.id">{{ item.title }}</p>
                <div class="abstract">
                    摘要：{{ item.text }}
                </div>
                <p class="date">{{ item.date }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: mapState([
        'articleData',
        'currentTag'
    ]),
    methods: {
        gotoContent(e) {
            const target = e.target
            if (target.className == 'p-title') {
                this.$router.push('content')
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
