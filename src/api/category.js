import xhttp from 'src/utils/xhttp'
import { extendUrl } from 'src/utils/httpQuery'

// 获取分类列表
export function getCategoryList(params) {
    return xhttp.get(extendUrl('/category'), { params })
}

// 获取分类详情
export function getCategoryDetail(lessonID) {
    return xhttp.get(extendUrl(`/category/${lessonID}`))
}

// 删除分类
export function delCategory(lessonID) {
    return xhttp.delete(extendUrl(`/category/${lessonID}`))
}

// 增加分类
export function addCategory(params) {
    return xhttp.post(extendUrl('/category'), params)
}

// 更新分类
export function updateCategory(lessonID, params) {
    return xhttp.put(extendUrl(`/category/${lessonID}`), params)
}

// 发布分类
export function publishCategory(id) {
    return xhttp.put(extendUrl(`/category/publish/${id}`))
}

// 下架分类
export function downCategory(id) {
    return xhttp.put(extendUrl(`/category/down/${id}`))
}
