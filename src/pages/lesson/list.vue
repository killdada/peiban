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
                >新建课程</el-button
            >
        </header>
        <el-table :data="data" v-loading="loading">
            <el-table-column prop="img" width="150" label="课程图片">
                <template slot-scope="scope">
                    <img :src="scope.row.img" width="100" height="100" alt="" />
                </template>
            </el-table-column>
            <el-table-column prop="name" min-width="200" label="课程名称">
            </el-table-column>
            <el-table-column prop="cateory_name" label="所属分类">
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">{{
                    scope.row.status === 0 ? '待发布' : '已发布'
                }}</template>
            </el-table-column>
            <el-table-column label="课程目录数" prop="catalog_num" width="320">
            </el-table-column>
            <el-table-column label="操作" min-width="150">
                <template slot-scope="scope">
                    <el-button type="text" @click="gotoEdit(scope.row)"
                        >详情</el-button
                    >
                    <el-button
                        type="text"
                        v-if="scope.row.status === 0 || scope.row.status === 2"
                        @click="publish(scope.row)"
                        >发布</el-button
                    >
                    <el-button type="text" v-else @click="downLesson(scope.row)"
                        >下架</el-button
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
            title="新建课程"
            width="700px"
            @close="resetForm"
            :visible.sync="showDialog"
        >
            <lesson-form ref="lessonForm" @onsuccess="refreshData">
            </lesson-form>
        </el-dialog>
    </div>
</template>

<script>
import {
    getLessonList,
    delLesson,
    publishLesson,
    downLesson
} from 'src/api/lesson'
import lessonForm from './lesson-form'

export default {
    data() {
        return {
            data: [],
            loading: false,
            total: 0,
            key: '',
            showDialog: false,
            page: 1
        }
    },
    components: {
        lessonForm
    },
    computed: {
        imgData() {
            return {
                media_type: 1
            }
        }
    },
    methods: {
        publish(item) {
            publishLesson(item.id)
                .then(() => {
                    this.$message.success('发布课程成功')
                    this.fetchData()
                })
                .catch(e => {
                    this.$message.error(e.message)
                })
        },
        refreshData() {
            this.fetchData()
            this.showDialog = false
        },
        resetForm() {
            this.$refs.lessonForm.reset()
        },
        gotoAdd() {
            this.showDialog = true
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

            getLessonList({
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

        async downLesson({ id }) {
            try {
                await downLesson(id)
                this.$message.success('下架成功')
                this.fetchData()
            } catch (error) {
                this.$message.error(
                    `下架失败${error.message || error.msg || ''}`
                )
            }
        },

        deleteLesson(id) {
            this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    delLesson(id)
                        .then(() => {
                            this.$message.success('删除课程成功')
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
            this.$router.push({
                name: 'lesson-detail',
                params: {
                    id: item.id
                }
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
