import Vue from 'vue'
import ElementUI from 'element-ui'
import 'src/utils/polyfill'
import store from 'src/store'
import cookie from 'js-cookie'
import BaseComponents from 'components'
import 'src/assets/less/base.less'
import 'src/assets/less/common.less'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import router from './router'

Vue.use(ElementUI)
Vue.use(BaseComponents)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta && record.meta.requireLogin)) {
        if (cookie.get('token')) {
            next()
        } else {
            next({ path: '/login' })
        }
    } else if (to.name === 'login' && cookie.get('token')) {
        next({ name: 'lesson-list' })
    } else {
        next()
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
