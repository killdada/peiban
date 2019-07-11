import xhttp from 'src/utils/xhttp'

// 获取轮播列表
export function getBannerList(params) {
    return xhttp.get('/carouse', { params })
}

// 获取轮播详情
export function getBannerDetail(lessonID) {
    return xhttp.get(`/carouse/${lessonID}`)
}

// 删除轮播
export function delBanner(lessonID) {
    return xhttp.delete(`/carouse/${lessonID}`)
}

// 增加轮播
export function addBanner(params) {
    return xhttp.post('/carouse', params)
}

// 更新轮播
export function updateBanner(lessonID, params) {
    return xhttp.put(`/carouse/${lessonID}`, params)
}
