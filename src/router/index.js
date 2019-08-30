import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'root',
        redirect: '/lesson/list'
    },
    // 登录
    {
        name: 'login',
        path: '/login',
        component: () => import('../pages/login/index'),
        meta: {
            isLoginPage: true
        }
    },
    // 课程管理
    {
        name: 'lesson',
        path: '/lesson',
        component: () => import('src/pages/index'),
        redirect: '/lesson/list',
        meta: {
            requireLogin: true
        },
        children: [
            // 课程列表
            {
                name: 'lesson-list',
                path: 'list',
                component: () => import('src/pages/lesson/list'),
                meta: {
                    hasSideBar: true
                }
            },
            // 课程详情
            {
                name: 'lesson-detail',
                path: 'detail/:id?',
                component: () => import('src/pages/lesson/detail'),
                meta: {
                    hasSideBar: true
                }
            },
            {
                name: 'lesson-catalog-bind-ppt',
                path: 'catalog-bind-ppt/:id?',
                component: () => import('src/pages/lesson/catalog-bind-ppt')
            }
        ]
    },
    // 轮播管理
    {
        name: 'banner',
        path: '/banner',
        component: () => import('src/pages/index'),
        redirect: '/banner/list',
        meta: {
            requireLogin: true
        },
        children: [
            // 轮播列表
            {
                name: 'banner-list',
                path: 'list',
                component: () => import('src/pages/banner/list'),
                meta: {
                    hasSideBar: true
                }
            }
        ]
    },
    // 分类管理
    {
        name: 'category',
        path: '/category',
        component: () => import('src/pages/index'),
        redirect: '/category/list',
        meta: {
            requireLogin: true
        },
        children: [
            // 分类列表
            {
                name: 'category-list',
                path: 'list',
                component: () => import('src/pages/category/list'),
                meta: {
                    hasSideBar: true
                }
            }
        ]
    },
    // 练习管理
    {
        name: 'practice',
        path: '/practice',
        component: () => import('src/pages/index'),
        redirect: '/practice/list',
        meta: {
            requireLogin: true
        },
        children: [
            // 练习列表
            {
                name: 'practice-list',
                path: 'list',
                component: () => import('src/pages/practice/list'),
                meta: {
                    hasSideBar: true
                }
            }
        ]
    },
    // 人员管理
    {
        name: 'member',
        path: '/member',
        component: () => import('src/pages/index'),
        redirect: '/member/list',
        meta: {
            requireLogin: true
        },
        children: [
            // 人员列表
            {
                name: 'member-list',
                path: 'list',
                component: () => import('src/pages/member/list'),
                meta: {
                    hasSideBar: true
                }
            }
        ]
    },
    // 素材管理
    {
        name: 'material',
        path: '/material',
        component: () => import('src/pages/index'),
        redirect: '/material/manage',
        meta: {
            requireLogin: true
        },
        children: [
            // 人员列表
            {
                name: 'material-manage',
                path: 'manage',
                component: () => import('src/pages/material/index'),
                meta: {
                    hasSideBar: true
                }
            }
        ]
    }
]

const router = new Router({ routes })

export default router
