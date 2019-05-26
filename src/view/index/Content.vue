<template>
    <div class="view-content">
        <VueMarkdown :source="articleContent"/>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
    components: {
        VueMarkdown
    },
    computed: {
        articleContent() {
            return this.$store.state.articleContent
        }
    }
}
</script>

<style scoped>
.view-content {
    background: #fff;
    padding: 10px 20px;
    min-height: 100%;
}
</style>
