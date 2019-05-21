import Vue from 'vue'
import Vuex from 'vuex'

import root from './root'

Vue.use(Vuex)

const store = new Vuex.Store({
    ...root,
    strict: process.env.NODE_ENV !== 'production',
    modules: {}
})

export default store
