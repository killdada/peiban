import xhttp from 'src/utils/xhttp'
import { extendUrl } from 'src/utils/httpQuery'
import getBaseURL from 'src/const/baseURL'

const baseUrl = getBaseURL()

// 获取人员列表
export function getFeedbackList(params) {
    return xhttp.get('/feedback', { params })
}

export const feedbackExport = extendUrl(`${baseUrl}/feedback/export`)
