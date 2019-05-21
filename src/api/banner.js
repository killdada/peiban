import xhttp from 'src/utils/xhttp'
import { extendUrl } from 'src/utils/httpQuery'

// 获取轮播列表
export function getBannerList(params) {
    return xhttp.get(extendUrl('/carouse'), { params })
}

// 获取轮播详情
export function getBannerDetail(lessonID) {
    return xhttp.get(extendUrl(`/carouse/${lessonID}`))
}

// 删除轮播
export function delBanner(lessonID) {
    return xhttp.delete(extendUrl(`/carouse/${lessonID}`))
}

// 增加轮播
export function addBanner(params) {
    return xhttp.post(extendUrl('/carouse'), params)
}

// 更新轮播
export function updateBanner(lessonID, params) {
    return xhttp.put(extendUrl(`/carouse/${lessonID}`), params)
}
