<template>
    <div
        class="page-catalog-bind-ppt"
        v-loading.fullscreen="loadingPng"
        element-loading-text="PDF转存png中"
    >
        <div class="play-wrapper">
            <div id="player"></div>
        </div>
        <div class="pptform">
            <el-form
                :model="form"
                v-loading="loading && isEdit"
                label-position="top"
                :rules="rules"
                ref="form"
            >
                <el-form-item prop="ppt">
                    <span slot="label" class="tips">
                        上传pdf以后会生成对应的多张图片。然后按顺序为每张图片绑定时间段。
                    </span>
                    <div>
                        <el-button
                            size="small"
                            :loading="uploading"
                            @click="selectFile"
                            >{{
                                !form.ppt.length && !fileData.name
                                    ? '点击上传pdf'
                                    : '重新上传pdf'
                            }}</el-button
                        >
                        <input
                            type="file"
                            id="upload"
                            style="display: none"
                            accept="application/pdf"
                            @change="uploadfile"
                        />
                    </div>
                    <template v-if="form.ppt.length">
                        <el-carousel
                            :autoplay="false"
                            ref="carousel"
                            trigger="click"
                            height="384px"
                            indicator-position="none"
                            @change="changeActive"
                            arrow="always"
                        >
                            <el-carousel-item
                                v-for="(img, index) in form.ppt"
                                :style="{
                                    backgroundImage: `url(${
                                        img.media_real_url
                                    })`
                                }"
                                :key="index"
                            >
                                <div class="el-carouser-index">
                                    {{ index + 1 }}
                                </div>
                                <div class="action">
                                    <i
                                        class="el-icon-download download"
                                        title="下载原图"
                                        @click="
                                            download(
                                                img.media_real_url,
                                                '',
                                                '_blank'
                                            )
                                        "
                                    ></i>
                                    <i
                                        class="el-icon-zoom-in zoom"
                                        title="查看图片大图"
                                        @click.stop.prevent="
                                            openImgDialog(img.media_real_url)
                                        "
                                    ></i>
                                    <i
                                        class="el-icon-delete delete"
                                        title="删除该图片可能会导致时间范围断层，需要重新从开头确认下每张图片的时间"
                                        @click.stop.prevent="delImg(img, index)"
                                    ></i>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                        <div v-for="(item, index) in form.ppt" :key="index">
                            <div v-if="activeID === item.media_id">
                                <el-time-picker
                                    is-range
                                    size="medium"
                                    v-model="pptTime[index]"
                                    range-separator="至"
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间"
                                    value-format="HH:mm:ss"
                                    :clearable="false"
                                    placeholder="选择时间范围"
                                >
                                </el-time-picker>
                                <el-button
                                    title="对当前的图片选择时间范围后提交"
                                    @click="addTime(index)"
                                    size="medium"
                                    >提交</el-button
                                >
                            </div>
                        </div>
                    </template>
                </el-form-item>
            </el-form>
            <div class="pptform-btn">
                <el-button
                    type="primary"
                    :loading="btnloading"
                    size="medium"
                    @click="save"
                    >确认</el-button
                >
            </div>
        </div>
        <el-dialog
            :visible.sync="showImgDialog"
            class="preview-dialog"
            width="80%"
            title="大图"
            top="10vh"
        >
            <img :src="imgUrl" alt="" />
        </el-dialog>
    </div>
</template>

<script>
import { updateCatalog, getCatalogDetail, getPdfimg } from 'src/api/lesson'
import { uploadImg } from 'src/api/common'
import { qiniuUpload } from 'src/utils/qiniu'
import { download, loader, localStorageUtils } from 'appcloud-component'

const pptTimeDefault = ['00:00:00', '00:00:00']

export default {
    name: 'catalogBindPpt',
    mixins: [download],
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
                callback(new Error('请至少保证有一张图片'))
            }
        }
        return {
            form: {
                ppt: [],
                vedio: '', // 目录视频
                vedio_url: ''
            },
            rules: {
                ppt: { validator: vaildppt, trigger: ['blur', 'change'] }
            },
            action: uploadImg,
            imgData: { media_type: 1 },
            loading: false,
            btnloading: false,
            isEdit: false,
            error: [],
            pptTime: [], // 多少张PPT就对应多少个ppttime
            activeID: '',
            activeIndex: 0,
            lessonID: '',
            fileData: {},
            uploading: false,
            loadingPng: false,
            showImgDialog: false,
            imgUrl: ''
        }
    },
    computed: {
        catalogId() {
            return this.$route.params.id
        }
    },
    methods: {
        openImgDialog(img) {
            this.imgUrl = img
            this.showImgDialog = true
        },
        changeActive(next) {
            this.selectImg(this.form.ppt[next], next)
        },
        selectFile() {
            if (this.uploadlingVideo) {
                return
            }
            document.getElementById('upload').click()
        },
        async uploadfile() {
            const file = document.getElementById('upload').files[0]
            const fileData = {
                file,
                name: file.name,
                size: file.size,
                percent: 0,
                status: null
            }
            this.fileData = fileData
            this.uploading = true
            qiniuUpload(this.fileData, this.update)
        },
        async update(params) {
            this.fileData = {
                ...this.fileData,
                ...params
            }
            if (params.status === 'completed') {
                this.$message.success('上传PDF成功')
                try {
                    this.loadingPng = true
                    const res = await getPdfimg({ media_id: this.fileData.key })
                    this.form.ppt.push(res.data)
                    const result = []
                    const pptTime = []
                    res.forEach(item => {
                        result.push({
                            media_id: item.media_id,
                            media_real_url: item.url
                        })
                        pptTime.push(pptTimeDefault)
                    })
                    this.pptTime = pptTime
                    this.form.ppt = result
                    this.activeID = result[0].media_id
                    this.$refs.carousel.setActiveItem(0)
                } catch (error) {
                    //
                }
                this.loadingPng = false
            } else if (params.status === 'error') {
                this.$message.error('PDF上传失败')
            }
            this.uploading = false
        },
        loadPlayer() {
            this.$nextTick(() => {
                loader.JS(
                    'https://sdk-release.qnsdk.com/qiniu-web-player-1.2.0.js',
                    this.loadedCallback
                )
            })
        },
        loadedCallback() {
            const container = document.getElementById('player')
            // eslint-disable-next-line
            const player = new QPlayer({
                url:
                    this.form.vedio_url ||
                    'http://demo-videos.qnsdk.com/movies/qiniu.mp4',
                container,
                autoplay: true
            })
        },
        // 计算时间秒
        countSec(time) {
            const arr = time.split(':')
            return (
                parseInt(arr[0], 10) * 3600 +
                parseInt(arr[1], 10) * 60 +
                parseInt(arr[2], 10)
            )
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
                return '当前选择的时间和下一张图片时间冲突'
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
                return '当前选择的时间和上一张图片时间冲突'
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
                    this.$message.error('当前选择的时间和相邻的图片冲突')
                    result1 = false
                }
            }
            return result1
        },

        // 绑定时间先对当前的时间进行检验，需要在前后中间，比如第一张第三张，如果是需要第二张需要在这中间
        addTime(index) {
            if (!this.activeID && this.activeID !== 0) {
                this.$message.error('请先选择一张图片')
                return
            }

            if (this.pptTime[index][0] === this.pptTime[index][1]) {
                this.$message.error('图片开始时间和结束时间不能相等')
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
            const result = this.vaild(index)
            if (result) {
                // 检验通过，自动选择下一张图片
                this.$refs.carousel.next()
            }
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
                        this.$message.error('部分图片时间范围冲突，请检查')
                        return
                    }
                    if (this.btnloading) {
                        return
                    }
                    this.btnloading = true

                    updateCatalog(this.lessonID, this.catalogId, this.form)
                        .then(() => {
                            this.$message.success('绑定成功')
                            this.formVisible = false
                        })
                        .catch(e => {
                            this.$message.error(e.message)
                        })
                        .finally(() => {
                            this.btnloading = false
                        })
                }
            })
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
                    '前面的图片还没有绑定时间，请按顺序绑定图片时间，正在为你选择前面的图片'
                )
                this.$refs.carousel.prev()
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
        delImg(img, index) {
            this.form.ppt = this.form.ppt.filter(
                item => item.media_id !== img.media_id
            )
            this.pptTime = this.pptTime.filter((item, i) => i !== index)
            if (!this.form.ppt.length) {
                this.$refs.form.validateField('ppt')
                return // 图片删光了后续不需要操作了
            }
            if (index !== this.form.ppt.length - 1 && img.start_time) {
                // 绑定过时间的，并且不是最后一张，删除的时候可能会导致前后PPT时间有断层，这里给出提示
                this.$message.info(
                    '该操作可能会导致图片时间范围断层，请重头确认每张图片的时间'
                )
                // 删除的是第一个的话，需要手动触发
                if (index === 0) {
                    this.selectImg(this.form.ppt[0], 0)
                } else {
                    this.$refs.carousel.setActiveItem(0)
                }
            } else {
                this.selectImg(this.form.ppt[0], 0)
                this.$refs.form.validateField('ppt')
            }
        },
        fetchData() {
            if (this.loading) return
            const { lessonID } = localStorageUtils.getItem('peibanData')
            this.lessonID = lessonID
            this.loading = true
            getCatalogDetail(lessonID, this.catalogId)
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
                    try {
                        this.fileData = {}
                        this.activeID = res.ppt[0].media_id
                        this.activeIndex = 0
                        this.pptTime = res.ppt.map(pptitem =>
                            `${pptitem.start_time},${pptitem.end_time}`.split(
                                ','
                            )
                        )
                    } catch (error) {
                        //
                    }
                    this.loadPlayer()
                })
                .finally(() => {
                    this.loading = false
                })
        }
    },
    created() {
        this.fetchData()
    }
}
</script>

<style lang="less" scoped>
@import '~assets/less/var.less';

.preview-dialog /deep/ .el-dialog {
    overflow-x: hidden;
    text-align: center;
}

.page-catalog-bind-ppt {
    width: 680px;
    padding: 10px 20px 20px;
    margin: auto;
    background-color: #fff;
}
.pptform {
    .tips {
        display: inline-block;
        font-size: 12px;
        color: @color-gray;
        line-height: 1.6;
    }
    &-btn {
        text-align: right;
        .el-button {
            width: 100px;
        }
    }
    /deep/ .el-date-editor .el-range-separator {
        width: 7%;
    }
    /deep/ .el-form-item__error {
        right: 0;
    }
    /deep/ .el-carousel {
        // width: 512px;
        margin: 10px auto 20px;
        .el-carouser-index {
            position: absolute;
            margin: auto;
            left: 0;
            bottom: 10px;
            right: 0;
            width: 25px;
            height: 25px;
            line-height: 25px;
            border-radius: 50%;
            color: #fff;
            background-color: red;
            text-align: center;
            font-size: 14px;
        }
        .delete,
        .zoom,
        .download {
            position: absolute;
            right: 0;
            top: 0;
            font-size: 20px;
            cursor: pointer;
            z-index: 100;
        }
        .download {
            top: 60px;
        }
        .zoom {
            top: 30px;
        }
    }
    /deep/ .el-carousel__item {
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
}

#player {
    width: 640px;
    height: 480px;
    margin: 20px auto;
}
</style>
