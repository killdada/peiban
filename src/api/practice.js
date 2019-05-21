import xhttp from 'src/utils/xhttp'
import { extendUrl } from 'src/utils/httpQuery'

// 获取练习列表
export function getPracticeList(params) {
    return xhttp.get(extendUrl('/practice'), { params })
}

// 获取练习详情
export function getPracticeDetail(lessonID) {
    return xhttp.get(extendUrl(`/practice/${lessonID}`))
}

// 删除练习
export function delPractice(courseID, lessonID) {
    return xhttp.delete(extendUrl(`/practice/${courseID}/${lessonID}`))
}

// 增加练习
export function addPractice(params) {
    return xhttp.post(extendUrl(`/practice/${params.course_id}`), params)
}

// 更新练习
export function updatePractice(lessonID, params) {
    return xhttp.put(extendUrl(`/practice/${lessonID}`), params)
}

// 获取回复列表
export function getReplyList(id, params) {
    return xhttp.get(extendUrl(`/practice/reply/${id}`), { params })
}

// 删除回复
export function delReply(practiceId, replyId) {
    return xhttp.delete(extendUrl(`/practice/reply/${practiceId}/${replyId}`))
}
