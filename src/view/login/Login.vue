<template>
    <div class="login-vue" :style="bg">
        <div class="container">
            <p class="title">WELCOME</p>
            <div class="input-c">
                <Input prefix="ios-contact" v-model="user" placeholder="用户名" clearable/>
            </div>
            <div class="input-c">
                <Input type="password" v-model="pwd" prefix="md-lock" placeholder="密码" clearable/>
            </div>
            <Button class="submit" type="primary" @click="submit">登陆</Button>
        </div>
    </div>
</template>

<script>
import { login } from '@/api'

export default {
    name: 'login',
    data() {
        return {
            user: '',
            pwd: '',
            bg: {}
        }
    },
    created() {
        this.bg.backgroundImage = 'url(' + require('../../assets/bg.jpg') + ')'
    },
    methods: {
        vaildInput() {
            const re = /^[\w@%$#@\.]+$/
            if (!re.test(this.user) || !re.test(this.pwd)) {
                this.$Message.error('请输入正确的用户名和密码')
                return false
            }
            
            return true
        },
        submit() {
            if (!this.vaildInput()) {
                return
            }

            this.isShowLoading = true
            login({
                user: this.user,
                password: this.pwd,
            })
            .then(res => {
                localStorage.setItem('token', res.data)
                this.$router.push('manage')
            })
        },
    }
}
</script>

<style>
.login-vue {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}
.login-vue .container {
    background: rgba(255, 255, 255, .5);
    width: 300px;
    text-align: center;
    border-radius: 10px;
    padding: 30px;
}
.login-vue .ivu-input {
    background-color: transparent;
    color: #fff;
    outline: #fff;
    border-color: #fff;
}
.login-vue ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: rgba(255, 255, 255, .8);
}
.login-vue :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgba(255, 255, 255, .8);
}
.login-vue ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: rgba(255, 255, 255, .8);
}
.login-vue :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgba(255, 255, 255, .8);
}
.login-vue .title {
    font-size: 16px;
    margin-bottom: 20px;
}
.login-vue .input-c {
    margin: auto;
    margin-bottom: 30px;
    width: 200px;
}
.login-vue .error {
    color: red;
    text-align: left;
    margin: 5px auto;
    font-size: 12px;
    padding-left: 30px;
    height: 20px;
}
.login-vue .submit {
    width: 200px;
}
.login-vue .user {
    margin-top: 30px;
}
.login-vue .user span {
    cursor: pointer;
}
.login-vue .ivu-icon {
    color: #eee;
}
.login-vue .ivu-icon-ios-close-circle {
    color: #777;
}
</style>


