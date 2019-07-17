<template>
    <div class="page-Member-list">
        <header>
            <div></div>
            <!-- <el-input placeholder="请输入搜索信息"
                suffix-icon="el-icon-search"
                @keyup.enter.native="searchData"
                size="medium"
                v-model.trim="key">
            </el-input> -->
            <el-button type="primary" size="medium">
                <a :href="reportLink" style="color: #fff">生成报表</a>
            </el-button>
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
            <el-table-column prop="username" min-width="200" label="账号">
            </el-table-column>
            <el-table-column prop="user_show_name" min-width="200" label="姓名">
            </el-table-column>
            <!-- <el-table-column prop="cateory_name"
                label="所属云">
            </el-table-column> -->
            <el-table-column prop="week_time" label="本周学习时长">
                <template slot-scope="scope">
                    {{ format(scope.row.week_time) }}
                </template>
            </el-table-column>
            <el-table-column prop="practice_week_num" label="本周练习次数">
            </el-table-column>
            <el-table-column prop="total_time" label="累计学习时长">
                <template slot-scope="scope">
                    {{ format(scope.row.total_time) }}
                </template>
            </el-table-column>
            <el-table-column prop="practice_total_num" label="累计练习次数">
            </el-table-column>
            <el-table-column label="操作" min-width="150">
                <template slot-scope="scope">
                    <el-button type="text" @click="gotoEdit(scope.row)"
                        >查看</el-button
                    >
                    <!-- <el-button type="text"
                        class="delete"
                        @click="deleteMember(scope.row.id)">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <page-pagination
            :pageSize="10"
            @currentChange="handleCurrentChange"
            :total="total"
        ></page-pagination>

        <el-dialog title="学习记录" width="700px" :visible.sync="showDialog">
            <el-table
                :data="dataRecord"
                v-loading="loadingDetail"
                class="hadBorder"
                height="500px"
            >
                <el-table-column
                    type="index"
                    label-class-name="index-col"
                    class-name="index-col"
                    label="序号"
                    width="70"
                >
                </el-table-column>
                <el-table-column prop="category" label="课程分类">
                </el-table-column>
                <el-table-column prop="course_name" label="课程名称">
                </el-table-column>
                <el-table-column width="150" label="共计学习时长">
                    <template slot-scope="scope">
                        {{ format(scope.row.learning_time) }}
                    </template>
                </el-table-column>
            </el-table>
            <page-pagination
                @currentChange="handleCurrentChangeRecord"
                :pageSize="20"
                :total="totalRecord"
            ></page-pagination>
        </el-dialog>
    </div>
</template>

<script>
import { getMemberList, getMemberStudyList, reportLink } from 'src/api/member'

export default {
    data() {
        return {
            data: [],
            loading: false,
            total: 0,
            // key: '',
            showDialog: false,
            id: '', // 当前编辑的id,name
            loadingDetail: false,
            totalRecord: 0,
            dataRecord: [],
            reportLink,
            page: 1,
            pageRecord: 1
        }
    },
    components: {},
    methods: {
        format(time) {
            const n = parseInt(time, 10)
            const a = parseInt(n / 60, 10) // 多少分钟
            const b = n % 60 // 余数秒
            if (a >= 60) {
                const c = a % 60 // 余数分
                const d = parseInt(a / 60, 10) // 多少小时
                return `${d}时${c}分${b}秒`
            }
            return `${a}分${b}秒`
        },
        createReport() {
            //
        },
        handleCurrentChange(val) {
            this.page = val
            this.fetchData(val)
        },
        handleCurrentChangeRecord(val) {
            this.pageRecord = val
            this.fetchDetail(val)
        },
        fetchData(page) {
            if (this.loading) {
                return
            }
            this.loading = true

            getMemberList({
                page: page || this.page || 1
            })
                .then(res => {
                    this.data = res.list
                    this.total = res.sum
                })
                .catch(e => {
                    this.$message.error(e.message)
                })
                .finally(() => {
                    this.loading = false
                })
        },

        gotoEdit(item) {
            this.showDialog = true
            this.id = item.username
            this.fetchDetail()
        },
        fetchDetail(page) {
            if (this.loadingDetail) {
                return
            }
            this.loadingDetail = true

            getMemberStudyList(this.id, {
                page: page || this.pageRecord || 1
            })
                .then(res => {
                    this.dataRecord = res.list
                    this.totalRecord = res.sum
                })
                .catch(e => {
                    this.$message.error(e.message)
                })
                .finally(() => {
                    this.loadingDetail = false
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
.Member-form {
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
.page-Member-list {
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
