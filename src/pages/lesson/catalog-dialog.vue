<template>
    <el-dialog
        :title="isEdit ? '编辑目录' : '新增目录'"
        class="catalog-dialog"
        width="1000px"
        :visible.sync="formVisible"
        @close="resetForm"
    >
        <el-form
            :model="form"
            v-loading="loading && isEdit"
            label-position="left"
            label-width="120px"
            :rules="rules"
            ref="form"
        >
            <el-form-item label="目录名称" prop="name">
                <el-input
                    v-model.trim="form.name"
                    placeholder="请输入目录名称"
                    maxlength="50"
                ></el-input>
            </el-form-item>
            <el-form-item label="目录别名" prop="alias">
                <el-input
                    v-model.trim="form.alias"
                    placeholder="请输入目录别名"
                    maxlength="3"
                ></el-input>
            </el-form-item>
            <el-form-item label="目录描述" prop="desc">
                <el-input
                    type="textarea"
                    placeholder="请输入目录描述"
                    :autosize="{ minRows: 3, maxRows: 6 }"
                    :maxlength="500"
                    v-model.trim="form.desc"
                ></el-input>
            </el-form-item>
            <el-form-item label="目录视频" prop="vedio">
                <div class="single  upload-vedio-container">
                    <div
                        :title="
                            uploadlingVideo
                                ? '正在上传视频请稍候'
                                : '点击这个区域可以上传视频'
                        "
                        class="video-preview"
                    >
                        <div
                            v-if="form.vedio || currentFileName"
                            class="has-border"
                            @click="selectFile"
                            :class="uploadlingVideo && 'disabled'"
                        >
                            <span>您选择的文件：{{ currentFileName }}</span>
                            <strong v-if="progress > 0"
                                >已上传 {{ progress }}%</strong
                            >
                            <el-button
                                size="small"
                                :disabled="uploadlingVideo"
                                type="primary"
                                >点击上传</el-button
                            >
                        </div>
                        <el-button
                            size="small"
                            v-else
                            @click="selectFile"
                            type="primary"
                            >点击上传</el-button
                        >
                    </div>
                    <input
                        type="file"
                        id="upload"
                        style="display: none"
                        accept="video/*"
                        @change="uploadfile"
                    />
                </div>
            </el-form-item>
            <el-form-item label="目录视频时长" prop="play_time">
                <el-time-picker
                    v-model="form.play_time"
                    value-format="HH:mm:ss"
                    placeholder="选择时间范围"
                >
                </el-time-picker>
            </el-form-item>
            <el-form-item prop="ppt">
                <span slot="label">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="先选中图片，然后为图片选择时间段提交绑定，选中的图片是白色的勾，图片未绑定时间段，边框颜色是红色的"
                        placement="bottom"
                    >
                        <span
                            >目录PPT
                            <i class="el-icon-info"></i>
                        </span>
                    </el-tooltip>
                </span>
                <el-upload
                    accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                    class="imglist-container"
                    :action="action"
                    :data="imgData"
                    name="media"
                    multiple
                    :show-file-list="false"
                    :before-upload="beforeUpload"
                    :on-success="onUploadSuccess"
                    :on-error="onUploadError"
                >
                    <template v-if="form.ppt.length">
                        <draggable
                            v-model="form.ppt"
                            class="drag-container"
                            @end="dragEnd"
                            :options="{ draggable: '.draggable-item' }"
                        >
                            <div
                                v-for="(img, index) in form.ppt"
                                class="imglist-item draggable-item"
                                :class="
                                    error.filter(e => e === index + 1).length &&
                                        'is-error'
                                "
                                @click.stop.prevent="selectImg(img, index)"
                                :key="img.id"
                            >
                                <img :src="img.media_real_url" alt="" />
                                <i
                                    class="el-icon-circle-close delete"
                                    @click.stop.prevent="delImg(img, index)"
                                ></i>
                                <div v-if="activeID === img.media_id">
                                    <div class="mask"></div>
                                    <i class="el-icon-check check"></i>
                                </div>
                            </div>
                            <div class="imglist-item noimg">
                                <i class="el-icon-plus plus"></i>
                            </div>
                        </draggable>
                    </template>
                    <div class="imglist-item noimg" v-else>
                        <i class="el-icon-plus plus"></i>
                    </div>
                </el-upload>

                <div style="margin-top: 10px" v-if="form.ppt.length">
                    <div v-for="(item, index) in form.ppt" :key="index">
                        <div v-show="activeID === item.media_id">
                            <el-time-picker
                                is-range
                                size="medium"
                                v-model="pptTime[index]"
                                range-separator="至"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                value-format="HH:mm:ss"
                                placeholder="选择时间范围"
                            >
                            </el-time-picker>
                            <el-button
                                title="对选中的ppt选择时间范围后提交"
                                @click="addTime(index)"
                                size="medium"
                                >提交</el-button
                            >
                        </div>
                    </div>
                </div>
            </el-form-item>
        </el-form>

        <div slot="footer">
            <el-button @click="cancel" size="medium">取消</el-button>
            <el-button
                type="primary"
                :loading="btnloading"
                size="medium"
                @click="save"
                >确认</el-button
            >
        </div>
    </el-dialog>
</template>

<script>
import { uploadImg } from 'src/api/common'
import {
    addCatalog,
    updateCatalog,
    getCatalogDetail,
    getPolicy
} from 'src/api/lesson'
import cookie from 'js-cookie'
import draggable from 'vuedraggable'

const pptTimeDefault = ['00:00:00', '00:00:00']

export default {
    components: {
        draggable
    },
    data() {
        const vaildppt = (rule, value, callback) => {
            if (value.length) {
                const result = []
                value.forEach((item, index) => {
                    if (!item.start_time || !item.end_time) {
                        result.push(index + 1)
                    }
                })
                this.error = result

                if (result.length) {
                    callback(
                        new Error(`第${result.join(',')}张图片请选择时间范围`)
                    )
                } else {
                    callback()
                }
            } else {
                callback(new Error('请至少上传一张ppt图片'))
            }
        }

        return {
            action: uploadImg,
            imgData: { media_type: 1 },
            vedioData: { media_type: 3 },
            form: {
                name: '', // 目录名称
                alias: '', // 目录别名
                vedio: '', // 目录视频
                vedio_url: '',
                desc: '', // 目录描述
                ppt: []
            },
            formVisible: false,
            rules: {
                name: {
                    message: '目录名称不能为空',
                    required: true,
                    trigger: ['blur']
                },
                alias: {
                    message: '目录别名不能为空',
                    required: true,
                    trigger: ['blur']
                },
                vedio: {
                    message: '目录视频不能为空',
                    required: true,
                    trigger: ['blur']
                },
                ppt: { validator: vaildppt, trigger: ['blur', 'change'] },
                play_time: {
                    message: '目录视频时长不能为空',
                    required: true,
                    trigger: ['blur']
                }
            },
            loading: false,
            btnloading: false,
            isEdit: false,
            pptTime: [], // 多少张PPT就对应多少个ppttime
            fileList: [],
            activeID: '',
            activeIndex: 0,
            error: [],
            progress: 0,
            currentFileName: '',
            uploadlingVideo: false,
            ossInfo: {}
        }
    },
    created() {
        this.getPolicy()
    },
    methods: {
        async getPolicy() {
            const SSTToken = cookie.get('SSTToken')
            if (!SSTToken || !Object.keys(this.ossInfo).length) {
                // token无效，或者ossInfo为空对象的时候，都需要重新请求
                const res = await getPolicy()
                this.ossInfo = res
                this.saveSSTtToken()

                return res
            }
            return this.ossInfo || {}
        },
        saveSSTtToken() {
            const { SecurityToken, deploy } = this.ossInfo
            const { expire } = deploy || {}
            cookie.set('SSTToken', SecurityToken, {
                expires: new Date(expire * 1000)
            })
        },
        selectFile() {
            if (this.uploadlingVideo) {
                return
            }
            document.getElementById('upload').click()
        },
        async uploadfile() {
            const file = document.getElementById('upload').files[0]
            this.currentFileName = file.name
            const ossInfo = await this.getPolicy() // 如果token还在有效期使用原来的本地的ossInfo
            const { AccessKeyId, SecurityToken, deploy } = ossInfo
            const { policy, signature, host, dir } = deploy || {}

            const fd = new FormData()
            fd.append('OSSAccessKeyId', AccessKeyId)
            fd.append('policy', policy)
            fd.append('signature', signature)
            fd.append('x-oss-security-token', SecurityToken)
            fd.append('key', `${dir}/${file.name}`)
            fd.append('success_action_status', 200)
            fd.append('file', file, file.name)

            const xhr = new XMLHttpRequest()

            this.uploadlingVideo = true

            xhr.open('post', host, true)
            xhr.upload.addEventListener(
                'progress',
                evt => {
                    this.progress = Math.round((evt.loaded * 100) / evt.total)
                },
                false
            )
            xhr.addEventListener(
                'load',
                e => {
                    if (e.target.status !== 200) {
                        this.$message.error('上传失败！')
                        return
                    }
                    if (e.target.status === 200) {
                        this.$message.success('视频上传成功')
                        this.form.vedio = `${dir}/${file.name}`
                    }
                    this.uploadlingVideo = false
                },
                false
            )
            xhr.send(fd)
        },
        isPng(src) {
            return /^https:\/\/.*?(gif|png|jpg)$/.test(src)
        },
        // 计算时间秒
        countSec(time) {
            const arr = time.split(':')
            return arr[0] * 3600 + arr[1] * 60 + arr[2]
        },
        nextVaild(index) {
            const next = index + 1
            const ppt = this.form.ppt
            if (
                ppt[next].start_time &&
                this.countSec(ppt[next].start_time) <
                    this.countSec(ppt[index].end_time)
            ) {
                // 选择的结束时间超过了下一个的开始时间
                return '当前选择的时间和下一张PPT时间冲突'
            }
            return false
        },

        preVaild(index) {
            const preIndex = index - 1
            const ppt = this.form.ppt
            if (
                ppt[preIndex].start_time &&
                this.countSec(ppt[preIndex].end_time) >
                    this.countSec(ppt[index].start_time)
            ) {
                // 选择的结束时间超过了下一个的开始时间
                return '当前选择的时间和上一张PPT时间冲突'
            }
            return false
        },

        vaild(index) {
            let result1 = true

            if (this.form.ppt.length <= 1) {
                // 如果PPT只有一张的话，不需要校验
                return result1
            }
            if (index === 0) {
                const result = this.nextVaild(index)
                if (result) {
                    this.$message.error(result)
                    result1 = false
                }
            } else if (index === this.form.ppt.length - 1) {
                const result = this.preVaild(index)
                if (result) {
                    this.$message.error(result)
                    result1 = false
                }
            } else {
                const result = this.preVaild(index) || this.nextVaild(index)
                if (result) {
                    this.$message.error('当前选择的时间和相邻的PPT冲突')
                    result1 = false
                }
            }
            return result1
        },

        // 绑定时间先对当前的时间进行检验，需要在前后中间，比如第一张第三张，如果是需要第二张需要在这中间
        addTime(index) {
            if (!this.activeID) {
                this.$message.error('请先选择一张PPT')
                return
            }

            if (this.pptTime[index][0] === this.pptTime[index][1]) {
                this.$message.error('PPT开始时间和结束时间不能相等')
                return
            }

            this.form.ppt = this.form.ppt.map(item => {
                if (item.media_id === this.activeID) {
                    item.start_time = this.pptTime[index][0]
                    item.end_time = this.pptTime[index][1]
                }
                return item
            })
            this.$refs.form.validateField('ppt')

            // 给出错误的提示，但不阻止修改
            this.vaild(index)
        },
        onSuccessVedio(type, file) {
            if (type === 'change') {
                this.hasChange = true
                if (this.uploaderInstance) {
                    const files = this.uploaderInstance.files
                    this.uploaderInstance.splice(0, files.length - 1)
                }
            } else {
                this.$message.success('视频上传成功')
                this.form.vedio = `video/${file.name}`
            }
        },
        handlePictureCardPreview() {
            this.pptTime = []
            // console.log(file, file1)
        },
        handleRemoveImg() {
            // console.log(file, fileList);
        },
        handleRemove() {
            // console.log(file, fileList);
        },
        open(item) {
            this.formVisible = true
            this.isEdit = !!item
            this.hasChange = false

            if (this.isEdit) {
                this.loading = true
                getCatalogDetail(this.$route.params.id, item.id)
                    .then(res => {
                        this.form = {
                            ...res,
                            desc: res.remark,
                            vedio: res.video_media_id, // 目录视频
                            vedio_url: res.video_url,
                            ppt: res.ppt.map(list => {
                                list.media_real_url = list.url
                                return list
                            })
                        }
                        this.currentFileName = res.video_media_id.slice(6)
                        this.activeID = res.ppt[0].media_id
                        this.activeIndex = 0
                        this.pptTime = res.ppt.map(pptitem =>
                            `${pptitem.start_time},${pptitem.end_time}`.split(
                                ','
                            )
                        )
                    })
                    .finally(() => {
                        this.loading = false
                    })
            } else {
                this.resetForm()
                this.pptTime = []
                this.form = {
                    alias: '',
                    name: '', // 目录名称
                    vedio: '', // 目录视频
                    vedio_url: '',
                    desc: '', // 目录描述
                    ppt: []
                }
                this.currentFileName = ''
            }
            this.fileList = []
            this.uploadlingVideo = false
        },
        close() {
            this.formVisible = false
        },
        resetForm() {
            this.uploaderInstance && this.uploaderInstance.destroy()
            this.uploaderInstance = ''
            this.$refs.form && this.$refs.form.resetFields()
        },
        cancel() {
            this.formVisible = false
        },
        validAllImg() {
            let result = true
            for (let i = 0; i < this.form.ppt.length; i++) {
                if (!this.vaild(i)) {
                    // 只要一个检验没通过，就返回false，
                    result = false
                    break
                }
            }
            return result
        },
        save() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    // 上面检验的都是表单项，下面接着检验时间范围是否合格
                    if (!this.validAllImg()) {
                        this.$message.error('部分PPT时间范围冲突，请检查')
                        return
                    }
                    if (this.btnloading) {
                        return
                    }
                    this.btnloading = true
                    if (!this.isEdit) {
                        addCatalog(this.$route.params.id, this.form)
                            .then(() => {
                                this.$message.success('添加成功')
                                this.$emit('onsuccess')
                                this.formVisible = false
                            })
                            .catch(e => {
                                this.$message.error(e.message)
                            })
                            .finally(() => {
                                this.btnloading = false
                            })
                    } else {
                        updateCatalog(
                            this.$route.params.id,
                            this.form.id,
                            this.form
                        )
                            .then(() => {
                                this.$message.success('编辑成功')
                                this.formVisible = false
                                this.$emit('onsuccess')
                            })
                            .catch(e => {
                                this.$message.error(e.message)
                            })
                            .finally(() => {
                                this.btnloading = false
                            })
                    }
                }
            })
        },
        beforeUpload(file) {
            if (file.size >= 2 * 1024 * 1024) {
                this.$message.error('PPT不能大于2M')
                return false
            }
            return true
        },
        onUploadSuccess(res) {
            if (res.code === 200) {
                this.form.ppt.push(res.data)
                this.$message.success('上传图片成功')
                this.pptTime.push(pptTimeDefault)
            } else {
                this.$message.error(`图片上传失败：${res.msg}`)
            }
        },
        onUploadError() {
            this.$message.error('图片上传失败')
        },
        // 找到就近没有绑定时间的ppt的下标
        findNobindTimeInex(i) {
            return this.form.ppt.findIndex(
                (item, index) => !item.start_time && index < i
            )
        },
        selectImg(img, index) {
            // 因为现在需要的是按顺序去设置绑定时间，所有如果选择了后面的图片，然后前面的图片有没设置的需要给出提示
            const i = this.findNobindTimeInex(index)
            if (i > -1) {
                this.$message.info(
                    '前面的ppt还没有绑定时间，请按顺序绑定ppt时间，正在为你选择前面的图片'
                )
                this.selectImg(this.form.ppt[i], i)
                return
            }

            if (img.start_time) {
                // 存在说明已经选择过了时间，需要设置值,优先级最高
                const result = []
                result.push(img.start_time)
                result.push(img.end_time)
                this.pptTime[index] = result
                this.activeID = img.media_id
                this.activeIndex = index
                return
            }

            // 不存在没有设置绑定时间，给默认值，比如第一张绑定了00:00:00 - 00:08:00，选择第二张之后直接初始从00:08:00 开始
            const preIndex = index - 1
            this.pptTime[index] =
                preIndex > -1
                    ? [
                          this.form.ppt[preIndex].end_time,
                          this.form.ppt[preIndex].end_time
                      ]
                    : pptTimeDefault
            this.activeID = img.media_id
            this.activeIndex = index
        },
        // 拖动图片都需要提示
        dragEnd() {
            //
            this.$message.info(
                '该操作可能会导致该PPT和其他时间范围冲突，请重头确认每张PPT的时间'
            )
            this.selectImg(this.form.ppt[0], 0)
        },
        delImg(img, index) {
            this.form.ppt = this.form.ppt.filter(
                item => item.media_id !== img.media_id
            )
            this.pptTime = this.pptTime.filter((item, i) => i !== index)
            if (index !== this.form.ppt.length - 1 && img.start_time) {
                // 绑定过时间的，并且不是最后一张，删除的时候可能会导致前后PPT时间有断层，这里给出提示
                this.$message.info(
                    '该操作可能会导致PPT时间范围断层，请重头确认每张PPT的时间'
                )
                this.selectImg(this.form.ppt[0], 0)
            }
        }
    }
}
</script>

<style lang="less">
@import '~assets/less/var.less';

.catalog-dialog {
    .el-button {
        min-width: 100px;
    }
    .el-range-editor.el-input__inner {
        width: 400px;
    }
    .imglist-item {
        border-radius: 6px;
        width: 148px;
        height: 148px;
        cursor: pointer;
        line-height: 146px;
        display: inline-block;
        margin-right: 10px;
        margin-bottom: 10px;
        position: relative;
        &.is-error {
            border: 4px solid @color-red;
        }
        &.noimg {
            border: 1px solid @border-color;
        }
        .plus {
            font-size: 30px;
        }
        .delete {
            position: absolute;
            right: -5px;
            top: -5px;
            font-size: 20px;
            color: @color-red;
            display: none;
        }
        &:hover .delete {
            display: inline-block;
            z-index: 100;
        }
        img {
            width: 100%;
            height: 100%;
        }
        .mask {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.3);
        }
        .check {
            position: absolute;
            width: 30px;
            height: 30px;
            color: #fff;
            right: 0;
            top: 0;
            left: 0;
            bottom: 0;
            margin: auto;
            font-size: 30px;
            z-index: 100;
        }
    }
    .imglist-container {
        display: inline-block;
        .el-upload .drag-container {
            display: flex;
            flex-wrap: wrap;
        }
    }
    .upload-vedio-container {
        video,
        img {
            width: 100%;
            height: 100%;
        }
        .video-preview {
            display: flex;
            position: relative;
            .has-border {
                border: 1px solid @border-color;
                padding: 0 5px;
                cursor: pointer;
                &.disabled {
                    cursor: not-allowed;
                }
            }
            span {
                margin-right: 5px;
            }
            .btn {
                height: 30px;
                background: #4c99fe;
                font-size: 14px;
                color: #fff;
                line-height: 30px;
                border-radius: 4px;
                margin-top: 5px;
                margin-left: 5px;
            }
        }
    }
}
</style>
