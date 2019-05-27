<template>
    <div class="view-content">
        <VueMarkdown class="markdown" :source="articleContent"/>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { mapState } from 'vuex'

export default {
    components: {
        VueMarkdown
    },
    computed: mapState([
        'articleContent',
    ])
}
</script>

<style scoped>
.view-content {
    background: #fff;
    padding: 20px;
    min-height: 100%;
}
</style>
