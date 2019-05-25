<template>
    <div class="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
/* reset */
body, p, div, table, ul, li, ol, a {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
li {
    list-style: none;
}
/* global style */
body {
    font-family: 'Microsoft Yahei', 'Avenir', Helvetica, Arial, sans-serif;
    background: #f0eef5;
}
a {
    text-decoration: none;
    color: #7d8b8d;
}
</style>
