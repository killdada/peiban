<template>
    <div class="page-lesson-list">
        <header>
            <div></div>
            <!-- <el-input placeholder="请输入搜索信息"
                suffix-icon="el-icon-search"
                @keyup.enter.native="searchData"
                size="medium"
                v-model.trim="key">
            </el-input> -->
            <el-button
                type="primary"
                @click="gotoAdd"
                icon="el-icon-plus"
                size="medium"
                >新增</el-button
            >
        </header>
        <el-table :data="data" v-loading="loading">
            <el-table-column
                type="index"
                label-class-name="index-col"
                class-name="index-col"
                label="序号"
                width="70"
            >
            </el-table-column>
            <el-table-column width="150" label="轮播图片">
                <template slot-scope="scope">
                    <img
                        :src="scope.row.img_media_url"
                        width="100"
                        height="100"
                        alt=""
                    />
                </template>
            </el-table-column>
            <el-table-column
                prop="course_name"
                min-width="200"
                label="所属课程"
            >
            </el-table-column>
            <el-table-column prop="category_name" label="所属分类">
            </el-table-column>
            <el-table-column label="操作" min-width="150">
                <template slot-scope="scope">
                    <el-button type="text" @click="gotoEdit(scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        type="text"
                        class="delete"
                        @click="deleteLesson(scope.row.id)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <page-pagination
            :pageSize="10"
            @currentChange="handleCurrentChange"
            :total="total"
        ></page-pagination>

        <el-dialog
            :title="!id ? '新建轮播' : '编辑轮播'"
            width="700px"
            @close="resetForm"
            :visible.sync="showDialog"
        >
            <div class="lesson-form" v-loading="loadingDetail">
                <el-form
                    :model="form"
                    :rules="rules"
                    label-position="left"
                    label-width="100px"
                    ref="form"
                >
                    <el-form-item label="所属课程" prop="course_id">
                        <el-select
                            v-model="form.course_id"
                            placeholder="请选择课程分类"
                        >
                            <el-option
                                :label="option.name"
                                v-for="option in options"
                                :key="option.id"
                                :value="option.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="轮播图" prop="img_media_id">
                        <img-loader
                            v-model="form.img_url"
                            action=""
                            :httpRequest="customUpload"
                        >
                        </img-loader>
                    </el-form-item>
                </el-form>
                <div class="submit-btn">
                    <el-button
                        type="primary"
                        @click="save"
                        :loading="btnloading"
                        size="medium"
                        >保存</el-button
                    >
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getAllLesson } from 'src/api/common'
import {
    getBannerList,
    delBanner,
    getBannerDetail,
    addBanner,
    updateBanner
} from 'src/api/banner'
import { qiniuUpload } from 'src/utils/qiniu'

const defaultForm = {
    img_media_id: '',
    img_url: '',
    course_id: '' // 所属课程分类
}

export default {
    data() {
        return {
            data: [],
            loading: false,
            total: 0,
            key: '',
            showDialog: false,
            imgData: { media_type: 1 },
            id: '', // 当前编辑的id
            form: { ...defaultForm },
            rules: {
                course_id: {
                    message: '请至少选择一个课程分类',
                    required: true,
                    trigger: ['blur']
                },
                // category_id: { message: '请至少选择一个所属分类', required: true, trigger: ['blur'] },
                img_media_id: {
                    message: '轮播图片不能为空',
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
            page: 1,
            fileData: {}
        }
    },
    components: {},
    methods: {
        refreshData() {
            this.fetchData()
            this.showDialog = false
        },
        gotoAdd() {
            this.showDialog = true
            this.id = ''
            this.resetForm()
        },
        handleCurrentChange(val) {
            this.page = val
            this.fetchData(val)
        },
        fetchData(page) {
            if (this.loading) {
                return
            }
            this.loading = true

            getBannerList({
                page: page || this.page || 1
            })
                .then(res => {
                    this.data = res.data
                    this.total = res.total
                })
                .catch(e => {
                    this.$message.error(e.message)
                })
                .finally(() => {
                    this.loading = false
                })
        },

        deleteLesson(id) {
            this.$confirm('此操作将永久删除该轮播图片, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    delBanner(id)
                        .then(() => {
                            this.$message.success('删除轮播成功')
                            if (this.data.length === 1) {
                                const prePage = this.page - 1
                                this.page = prePage >= 1 ? prePage : 1
                            }
                            this.fetchData()
                        })
                        .catch(e => {
                            this.$message.error(e.message)
                        })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        },
        gotoEdit(item) {
            this.showDialog = true
            this.id = item.id
            this.fetchDetail()
        },
        setImgurl(file) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                this.form.img_url = reader.result
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
                this.form.img_media_id = this.fileData.key
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
                    if (!this.id) {
                        addBanner({
                            ...this.form
                        })
                            .then(() => {
                                this.$message.success('添加成功')
                                this.fetchData()
                                this.showDialog = false
                            })
                            .catch(e => {
                                this.$message.error(e.message)
                            })
                            .finally(() => {
                                this.btnloading = false
                            })
                    } else {
                        updateBanner(this.id, this.form)
                            .then(() => {
                                this.$message.success('编辑成功')
                                this.fetchData()
                                this.showDialog = false
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

            getBannerDetail(this.id)
                .then(res => {
                    this.form = {
                        ...res
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
        resetForm() {
            this.$refs.form && this.$refs.form.resetFields()
            this.form = { ...defaultForm }
        }
    },
    created() {
        this.fetchData()
        getAllLesson()
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
@import '~assets/less/var.less';
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
.page-lesson-list {
    background-color: #fff;
    header {
        padding: 15px 20px;
        text-align: right;
        display: flex;
        justify-content: space-between;
        .el-input {
            width: 300px;
        }
    }
    .el-button.delete {
        color: @color-red;
    }
}
</style>
