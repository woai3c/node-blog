<template>
    <div id="app">
        <keep-alive>
            <router-view :key="$route.fullPath"/>
        </keep-alive>
        <div class="loading" v-show="isShowLoading">
            <Spin size="large"></Spin>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    asyncData({ store, route }) {
        store.dispatch('getVisits')
    },
    computed: {
        ...mapState([
            'isShowLoading',
        ]),
    },
}
</script>