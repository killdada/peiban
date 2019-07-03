import * as qiniu from 'qiniu-js'
import { getQiniuToken } from 'src/api/common'

/**
 *
 * @param {*} row
 * { file: file 二进制文件，status当前文件上传的状态，observable： 当前上传对象的observable 对象，subscription: 当前上传的实例, }
 * update当前的处理任何改变的回调方法 第一参数是需要更新的状态，第二个是原来的参数
 */

async function getQiniuObservable(row, update) {
    const { observable, file } = row
    if (observable) {
        return observable
    }
    const key = file.name
    const { qiniu_token: token } = (await getQiniuToken()) || {}
    const putExtra = {}
    const config = {}
    const observableResult = qiniu.upload(file, key, token, putExtra, config)
    update({ observable }, row)
    return observableResult
}

export async function qiniuUpload(row, update) {
    // 设置next,error,complete对应的操作，分别处理相应的进度信息，错误信息，以及完成后的操作
    const error = err => {
        update({ status: 'error' }, row)
        console.log('上传出错', err)
    }

    const complete = res => {
        update({ status: 'completed' }, row)
        console.log('上传完成', JSON.stringify(res))
    }

    const next = response => {
        const total = response.total
        update({ percent: Math.ceil(total.percent) }, row)
    }
    const subObject = {
        next,
        error,
        complete
    }
    const observable = await getQiniuObservable(row, update)
    const subscription = observable.subscribe(subObject)
    update({ subscription }, row)
    return subscription
}

export function pauseUpload(row, update) {
    if (row.subscription) {
        update({ status: 'paused' }, row)
        row.subscription.unsubscribe()
    }
}
