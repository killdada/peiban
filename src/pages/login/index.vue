<template>
    <login-component
        :hasCaptcha="false"
        :loginApi="login"
        @success="loginSuccess"
    ></login-component>
</template>

<script>
import cookie from 'js-cookie'
import loginComponent from './login'
import { login } from 'src/api/login'

export default {
    name: 'login',
    components: {
        loginComponent
    },
    data() {
        return {
            login
        }
    },
    methods: {
        loginSuccess({ result, expires }) {
            cookie.set('token', result.access_token, {
                expires
            })
            if (result.user_info && result.user_info.UserName) {
                localStorage.setItem('username', result.user_info.UserName)
            }
            location.reload()
        }
    }
}
</script>
