<template>
    <div class="page-Practice-list">
        <header>
            <!-- <el-input placeholder="输入课程查找所有相关练习"
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
            <el-table-column
                prop="course_name"
                min-width="200"
                label="所属课程"
            >
            </el-table-column>
            <el-table-column prop="category_name" label="所属分类">
            </el-table-column>
            <el-table-column prop="publisher" label="发起人"> </el-table-column>
            <el-table-column prop="topic" label="练习主题"> </el-table-column>
            <el-table-column prop="practice_num" label="练习回复数">
            </el-table-column>
            <el-table-column prop="lastest_practice_reply" label="最新练习回复">
            </el-table-column>
            <el-table-column label="操作" min-width="150">
                <template slot-scope="scope">
                    <el-button type="text" @click="gotoEdit(scope.row)"
                        >查看</el-button
                    >
                    <el-button
                        type="text"
                        class="delete"
                        @click="deletePractice(scope.row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <page-pagination
            @currentChange="handleCurrentChange"
            :total="total"
        ></page-pagination>

        <el-dialog
            :title="!id ? '新建练习' : '练习详情'"
            width="700px"
            @close="resetForm"
            :visible.sync="showDialog"
        >
            <div class="Practice-form" v-loading="loadingDetail">
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
                            :disabled="id ? true : false"
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
                    <el-form-item label="练习主题" prop="topic">
                        <el-input
                            type="textarea"
                            placeholder="请输入练习主题"
                            :autosize="{ minRows: 3, maxRows: 6 }"
                            :maxlength="500"
                            :disabled="id ? true : false"
                            v-model.trim="form.topic"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="发起人" prop="publisher">
                        <el-input
                            placeholder="请输入发起人"
                            :disabled="id ? true : false"
                            v-model.trim="form.publisher"
                        ></el-input>
                    </el-form-item>
                    <div v-if="id" class="reply-table">
                        <p>练习回复列表</p>
                        <el-table
                            :data="replyList"
                            v-loading="loadingPracticeList"
                            height="300px"
                        >
                            <el-table-column
                                type="index"
                                label-class-name="index-col"
                                class-name="index-col"
                                label="序号"
                                width="70"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="content"
                                width="150"
                                label="练习回复"
                            >
                            </el-table-column>
                            <el-table-column label="操作" min-width="150">
                                <template slot-scope="scope">
                                    <el-button
                                        type="text"
                                        class="delete"
                                        @click="deleteReply(scope.row.id)"
                                        >删除</el-button
                                    >
                                </template>
                            </el-table-column>
                        </el-table>
                        <page-pagination
                            @currentChange="handleCurrentChangeReply"
                            :total="totalReply"
                        ></page-pagination>
                    </div>
                </el-form>
                <div class="submit-btn" v-if="!id">
                    <el-button @click="showDialog = false" size="medium"
                        >取消</el-button
                    >
                    <el-button @click="save" type="primary" size="medium"
                        >确定</el-button
                    >
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { uploadImg, getAllLesson } from 'src/api/common'
import {
    getPracticeList,
    delPractice,
    getPracticeDetail,
    addPractice,
    getReplyList,
    delReply
} from 'src/api/practice'

export default {
    data() {
        return {
            action: uploadImg,
            data: [],
            loading: false,
            total: 0,
            key: '',
            showDialog: false,
            imgData: { media_type: 1 },
            id: '', // 当前编辑的id
            form: {
                publisher: '',
                topic: '',
                course_id: ''
            },
            rules: {
                topic: {
                    message: '练习主题不能为空',
                    required: true,
                    trigger: ['blur']
                },
                publisher: {
                    message: '发起人不能为空',
                    required: true,
                    trigger: ['blur']
                },
                course_id: {
                    message: '请至少选择一个课程',
                    required: true,
                    trigger: ['blur']
                }
            },
            options: [
                {
                    categoryId: 1, // 分类id
                    categoryName: '' // 分类名称
                }
            ],

            loadingDetail: false,
            loadingPracticeList: false,
            btnloading: false,
            totalReply: 0,
            replyList: [],
            pageReply: 1,
            page: 1
        }
    },
    components: {},
    methods: {
        refreshData() {
            this.fetchData()
            this.showDialog = false
        },
        resetForm() {
            this.$refs.form.resetFields()
        },
        gotoAdd() {
            this.showDialog = true
            this.id = ''
        },
        handleCurrentChangeReply(val) {
            this.pageReply = val
            this.fetchReplys(val)
        },
        handleCurrentChange(val) {
            this.page = val
            this.fetchData(val)
        },
        deleteReply(id) {
            this.$confirm('此操作将永久删除该练习回复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    delReply(this.id, id)
                        .then(() => {
                            this.$message.success('删除练习回复成功')
                            if (this.replyList.length === 1) {
                                const prePage = this.pageReply - 1
                                this.pageReply = prePage >= 1 ? prePage : 1
                            }
                            this.fetchReplys()
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
        fetchData(page) {
            if (this.loading) {
                return
            }
            this.loading = true

            getPracticeList({
                page: page || this.page || 1
            })
                .then(res => {
                    this.data = res.data || []
                    this.total = res.total
                })
                .catch(e => {
                    this.$message.error(e.message)
                })
                .finally(() => {
                    this.loading = false
                })
        },

        deletePractice(item) {
            this.$confirm('此操作将永久删除该练习, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    delPractice(item.course_id, item.id)
                        .then(() => {
                            this.$message.success('删除练习成功')
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
        save() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.btnloading) {
                        return
                    }
                    this.btnloading = true
                    addPractice(this.form)
                        .then(() => {
                            this.$message.success('添加练习成功')
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
            })
        },
        fetchReplys(page) {
            if (this.loadingPracticeList) {
                return
            }
            this.loadingPracticeList = true

            getReplyList(this.id, {
                page: page || this.pageReply || 1
            })
                .then(res => {
                    this.replyList = res.data || []
                    this.totalReply = res.total
                })
                .catch(e => {
                    this.$message.error(e.message)
                })
                .finally(() => {
                    this.loadingPracticeList = false
                })
        },
        fetchDetail() {
            if (this.loadingDetail) {
                return
            }
            this.loadingDetail = true

            getPracticeDetail(this.id)
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
            this.fetchReplys()
        },
        reset() {
            this.$refs.form && this.$refs.form.resetFields()
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
.Practice-form {
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
.reply-table {
    .el-table {
        border-left: 1px solid @border-color;
        border-right: 1px solid @border-color;
    }
}
.page-Practice-list {
    height: 100%;
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
