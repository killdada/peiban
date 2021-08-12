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
import localStorageUtils from 'src/utils/localStorageUtils'

const menus = [
    {
        name: 'banner-list',
        icon: 'el-icon-menu',
        title: '轮播管理',
        routeName: '轮播列表'
    },
    {
        name: 'category-list',
        icon: 'el-icon-menu',
        title: '分类管理',
        routeName: '分类列表'
    },
    {
        name: 'lesson-list',
        icon: 'el-icon-menu',
        title: '课程管理',
        routeName: '课程列表'
    },
    {
        name: 'practice-list',
        icon: 'el-icon-menu',
        title: '练习管理',
        routeName: '练习列表'
    },
    {
        name: 'member-list',
        icon: 'el-icon-menu',
        title: '人员管理',
        routeName: '人员列表'
    },
    {
        name: 'material-manage',
        icon: 'el-icon-menu',
        title: '素材管理',
        routeName: '素材管理'
    },
    {
        name: 'feedback-manage',
        icon: 'el-icon-menu',
        title: '反馈管理',
        routeName: '反馈管理'
    }
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
            if (name === 'lesson-detail') {
                return [
                    {
                        name: '课程列表',
                        to: { name: 'lesson-list' }
                    },
                    { name: this.$route.params.id ? '课程详情' : '新建课程' }
                ]
            }
            if (name === 'lesson-catalog-bind-ppt') {
                const {
                    courseName = '课程名',
                    catalogName = '目录名',
                    lessonID
                } = localStorageUtils.getItem('peibanData')
                return [
                    {
                        name: '课程列表',
                        to: { name: 'lesson-list' }
                    },
                    {
                        name: `${courseName}-${catalogName}`,
                        to: { name: 'lesson-detail', params: { id: lessonID } }
                    },
                    { name: '绑定ppt' }
                ]
            }
            const menu = menus.find(item => item.name === name)
            const routeName = menu ? menu.routeName : ''
            return [
                {
                    name: routeName,
                    to: { name }
                }
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
                } else {
                    this.active = name
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
        height: 100%;
    }
}
</style>
