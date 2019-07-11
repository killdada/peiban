<template>
    <el-container class="page-app" style="height: 100%">
        <el-aside width="160px" v-if="showSideBar">
            <el-menu router class="page-sidebar" :default-active="active">
                <el-menu-item
                    v-for="menu of menus"
                    :key="menu.name"
                    :index="menu.name"
                    :route="{ name: menu.name }"
                >
                    <span slot="title">
                        {{ menu.title }}
                        <i :class="menu.icon"></i>
                    </span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header height="56px" class="page-app-header">
                <breadcrumb :routes="routes"></breadcrumb>
            </el-header>
            <el-main class="page-app-main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
const menus = [
    { name: 'lesson-list', icon: 'el-icon-menu', title: '课程管理' }
    // { name: 'lesson-list', icon: 'el-icon-menu', title: '轮播管理' },
    // { name: 'lesson-list', icon: 'el-icon-menu', title: '分类管理' },
    // { name: 'lesson-list', icon: 'el-icon-menu', title: '课程管理' },
    // { name: 'lesson-list', icon: 'el-icon-menu', title: '练习管理' },
    // { name: 'lesson-list', icon: 'el-icon-menu', title: '人员管理' },
]

export default {
    name: 'app',
    data() {
        return {
            menus,
            showSideBar: true,
            active: 'lesson-list'
        }
    },
    computed: {
        routes() {
            const name = this.$route.name
            if (name === 'lesson-list') {
                return [
                    {
                        name: '课程列表',
                        to: { name: 'lesson-list' }
                    }
                ]
            }
            return [
                {
                    name: '课程列表',
                    to: { name: 'lesson-list' }
                },
                { name: this.$route.params.id ? '课程详情' : '新建课程' }
            ]
        }
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                this.showSideBar = this.$route.meta.hasSideBar
                const name = this.$route.name
                if (name === 'lesson-list' || name === 'lesson-detail') {
                    this.active = 'lesson-list'
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.page-app {
    &-header {
        background-color: #fff;
    }
    &-main {
    }
}
</style>
