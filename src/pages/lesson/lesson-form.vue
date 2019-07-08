<template>
    <div class="lesson-form" v-loading="loadingDetail">
        <el-form
            :model="form"
            :rules="rules"
            label-position="left"
            label-width="100px"
            ref="form"
        >
            <el-form-item label="课程名称" prop="name">
                <el-input
                    v-model.trim="form.name"
                    placeholder="请输入课程名称"
                    maxlength="50"
                ></el-input>
            </el-form-item>
            <el-form-item label="课程分类" prop="category">
                <el-select v-model="form.category" placeholder="请选择课程分类">
                    <el-option
                        :label="option.categoryName"
                        v-for="option in options"
                        :key="option.categoryId"
                        :value="option.categoryId"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="讲师名称" prop="lector">
                <el-input
                    v-model.trim="form.lector"
                    placeholder="请输入讲师名称"
                    maxlength="50"
                ></el-input>
            </el-form-item>
            <el-form-item label="课程图片" prop="img">
                <img-loader
                    v-model="form.imgUrl"
                    :httpRequest="customUpload"
                    action=""
                >
                </img-loader>
            </el-form-item>
            <el-form-item label="课程简介" prop="desc">
                <el-input
                    type="textarea"
                    placeholder="请输入课程简介"
                    :autosize="{ minRows: 3, maxRows: 6 }"
                    :maxlength="500"
                    v-model.trim="form.desc"
                ></el-input>
            </el-form-item>
        </el-form>
        <div class="submit-btn">
            <el-button type="primary" @click="save" size="medium"
                >保存</el-button
            >
        </div>
    </div>
</template>

<script>
import { uploadImg } from 'src/api/common'
import {
    getLessonDetail,
    getLessonCategory,
    addLesson,
    updateLesson
} from 'src/api/lesson'
import { qiniuUpload } from 'src/utils/qiniu'

export default {
    data() {
        return {
            action: uploadImg,
            imgData: { media_type: 1 },
            form: {
                id: 1,
                img: '', // 课程图片
                imgUrl: '',
                name: '', // 课程名称
                category: '', // 所属分类
                number: '', // 课程目录数
                lector: '', // 讲师
                desc: '' // 课程简介
            },
            rules: {
                name: {
                    message: '课程名称不能为空',
                    required: true,
                    trigger: ['blur']
                },
                category: {
                    message: '请至少选择一个课程分类',
                    required: true,
                    trigger: ['blur']
                },
                lector: {
                    message: '讲师名称不能为空',
                    required: true,
                    trigger: ['blur']
                },
                img: {
                    message: '课程图片不能为空',
                    required: true,
                    trigger: ['blur', 'change']
                }
            },
            options: [
                {
                    categoryId: 1, // 分类id
                    categoryName: '' // 分类名称
                }
            ],

            loadingDetail: false,
            btnloading: false,
            fileData: {}
        }
    },
    methods: {
        setImgurl(file) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                this.form.imgUrl = reader.result
            }
        },
        update(params, row) {
            this.fileData = {
                ...this.fileData,
                ...params
            }
            if (params.status === 'completed') {
                this.$message.success('上传图片成功')
                this.setImgurl(row.file)
                this.form.img = this.fileData.key
            } else if (params.status === 'error') {
                this.$message.error('图片上传失败')
            }
        },
        customUpload(data) {
            this.fileData = { file: data.file }
            qiniuUpload(this.fileData, this.update)
        },
        save() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.btnloading) {
                        return
                    }
                    this.btnloading = true
                    if (!this.$route.params.id) {
                        addLesson(this.form)
                            .then(() => {
                                this.$message.success('添加成功')
                                this.$emit('onsuccess')
                            })
                            .catch(e => {
                                this.$message.error(e.message)
                            })
                            .finally(() => {
                                this.btnloading = false
                            })
                    } else {
                        updateLesson(this.$route.params.id, this.form)
                            .then(() => {
                                this.$message.success('编辑成功')
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
        fetchDetail() {
            if (this.loadingDetail) {
                return
            }
            this.loadingDetail = true

            getLessonDetail(this.$route.params.id)
                .then(res => {
                    this.form = {
                        ...res,
                        imgUrl: res.img,
                        img: res.img_media_id
                    }
                    this.$refs.form.clearValidate()
                })
                .catch(e => {
                    this.$message.error(e.message)
                })
                .finally(() => {
                    this.loadingDetail = false
                })
        },
        reset() {
            this.$refs.form && this.$refs.form.resetFields()
        }
    },
    created() {
        if (this.$route.params.id) {
            this.fetchDetail()
        }
        getLessonCategory()
            .then(res => {
                this.options = res
            })
            .catch(e => {
                this.$message.error(e.message)
            })
    }
}
</script>

<style lang="less" scoped>
.lesson-form {
    .el-input,
    .el-textarea,
    .el-select {
        width: 400px;
    }
}
.submit-btn {
    margin: 30px 0 10px;
    text-align: right;
    button {
        min-width: 100px;
    }
}
</style>
