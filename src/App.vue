<template>
    <div id="app" v-if="isLoginPage">
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
        isLoginPage() {
            return !!this.$route.meta.isLoginPage
        }
    }
}
</script>
