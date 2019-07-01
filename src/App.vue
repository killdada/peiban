<template>
    <div id="app" v-if="!isLogin">
        <router-view></router-view>
    </div>
    <el-container class="header-center" id="app" v-else>
        <el-header height="70px">
            <ui-header></ui-header>
        </el-header>
        <el-main v-loading="loading">
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
import UiHeader from 'components/header'
// import cookie from 'js-cookie'

export default {
    name: 'faceVenueSignin',
    components: {
        UiHeader
    },
    data() {
        return {
            loading: false
        }
    },
    computed: {
        isLogin() {
            return true
            // return cookie.get('token') ? 1 : 0
        }
    }
}
</script>
