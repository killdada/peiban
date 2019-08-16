import xhttp from 'src/utils/xhttp'

// 发布课程
export function publishLesson(id) {
    return xhttp.put(`/lesson/list/pub/${id}`)
}

// 下架课程
export function downLesson(id) {
    return xhttp.put(`/lesson/list/down/${id}`)
}

// 获取课程列表
export function getLessonList(params) {
    return xhttp.get('/lesson/list', { params })
}

// 获取课程详情
export function getLessonDetail(lessonID) {
    return xhttp.get(`/lesson/list/${lessonID}`)
}

// 获取课程分类
export function getLessonCategory() {
    return xhttp.get('/lesson/category')
}

// 删除课程
export function delLesson(lessonID) {
    return xhttp.delete(`/lesson/${lessonID}`)
}

// 增加课程
export function addLesson(params) {
    return xhttp.post('/lesson/list', params)
}

// 更新课程
export function updateLesson(lessonID, params) {
    return xhttp.put(`/lesson/list/${lessonID}`, params)
}

// 获取目录列表
export function getCatalogList(lessonID, params) {
    return xhttp.get(`/lesson/catalog/${lessonID}`, { params })
}

// 获取目录详情
export function getCatalogDetail(lessonID, catalogID) {
    return xhttp.get(`/lesson/catalog/${lessonID}/${catalogID}`)
}

// 增加目录
export function addCatalog(lessonID, params) {
    return xhttp.post(`/lesson/catalog/${lessonID}`, params)
}

// 更新目录
export function updateCatalog(lessonID, catalogID, params) {
    return xhttp.put(`/lesson/catalog/${lessonID}/${catalogID}`, params)
}

// 删除目录
export function delCatalog(lessonID, catalogID) {
    return xhttp.delete(`/lesson/catalog/${lessonID}/${catalogID}`)
}

// 获取上传视频的认证等信息
export function getPolicy() {
    return xhttp.get('/oss/get-policy')
}

// 上传PDF以后保存接口，获取png图片列表
export function getPdfimg(params) {
    return xhttp.post('/pdf2png', params)
}

// 绑定ppt
export function bindppt(courseId, catalogId, params) {
    return xhttp.post(`/lesson/catalog/${courseId}/${catalogId}/image`, params)
}
