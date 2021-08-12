import ElementUI from 'element-ui'
import XUpload from './x-upload'
import XTitle from './x-title'
import AppCard from './app-card'
import ImgLoader from './img-loader'
import DropdownMenu from './dropdown-menu'
import Breadcrumb from './breadcrumb'
import Popover from './popover'
import Pagination from './pagination'
import XCard from './x-card'

import 'element-ui/lib/theme-chalk/index.css'

/* eslint-disable */
export default {
    install(Vue) {
        Vue.use(ElementUI)
        Vue.component(XUpload.name, XUpload)
        Vue.component(ImgLoader.name, ImgLoader)
        Vue.component(DropdownMenu.name, DropdownMenu)
        Vue.component(Breadcrumb.name, Breadcrumb)
        Vue.component(Popover.name, Popover)
        Vue.component(Pagination.name, Pagination)
        Vue.component(XTitle.name, XTitle)
        Vue.component(AppCard.name, AppCard)
        Vue.component(XCard.name, XCard)
    }
}
