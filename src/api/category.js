import xhttp from 'src/utils/xhttp'

// 获取分类列表
export function getCategoryList(params) {
    return xhttp.get('/category', { params })
}

// 获取分类详情
export function getCategoryDetail(lessonID) {
    return xhttp.get(`/category/${lessonID}`)
}

// 删除分类
export function delCategory(lessonID) {
    return xhttp.delete(`/category/${lessonID}`)
}

// 增加分类
export function addCategory(params) {
    return xhttp.post('/category', params)
}

// 更新分类
export function updateCategory(lessonID, params) {
    return xhttp.put(`/category/${lessonID}`, params)
}

// 发布分类
export function publishCategory(id) {
    return xhttp.put(`/category/publish/${id}`)
}

// 下架分类
export function downCategory(id) {
    return xhttp.put(`/category/down/${id}`)
}
