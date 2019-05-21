import XUpload from './x-upload'
import XTitle from './x-title'
import ImgLoader from './img-loader'
import DropdownMenu from './dropdown-menu'
import Breadcrumb from './breadcrumb'
import Popover from './popover'
import Pagination from './pagination'
import XCard from './x-card'

/* eslint-disable */
export default {
    install(Vue) {
        Vue.component(XUpload.name, XUpload)
        Vue.component(ImgLoader.name, ImgLoader)
        Vue.component(DropdownMenu.name, DropdownMenu)
        Vue.component(Breadcrumb.name, Breadcrumb)
        Vue.component(Popover.name, Popover)
        Vue.component(Pagination.name, Pagination)
        Vue.component(XTitle.name, XTitle)
        Vue.component(XCard.name, XCard)
    }
}
