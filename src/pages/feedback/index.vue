<template>
    <div class="page-Member-list">
        <header>
            <div></div>
            <!-- <el-input placeholder="请输入搜索信息"
                suffix-icon="el-icon-search"
                @keyup.enter.native="searchData"
                size="medium"
                v-model.trim="key">
      </el-input>-->
            <el-button type="primary" size="medium">
                <a :href="feedbackExport" style="color: #fff">导出</a>
            </el-button>
        </header>
        <el-table :data="data" v-loading="loading">
            <el-table-column prop="username" label="账号"></el-table-column>
            <el-table-column
                prop="user_show_name"
                label="姓名"
            ></el-table-column>
            <el-table-column
                prop="title"
                show-overflow-tooltip
                min-width="150"
                label="标题"
            ></el-table-column>
            <el-table-column prop="title" min-width="200" label="截图">
                <template slot-scope="scope">
                    <el-carousel
                        class="cut-imgs"
                        v-if="scope.row.imgs.length"
                        :autoplay="false"
                        ref="carousel"
                        trigger="click"
                        height="200px"
                        indicator-position="none"
                        arrow="always"
                    >
                        <el-carousel-item
                            v-for="item in scope.row.imgs"
                            :key="item"
                        >
                            <div
                                @click.stop.prevent="openLlink(item)"
                                class="img"
                                style="height: 100%"
                                :style="`backgroundImage: url(${item})`"
                            ></div>
                        </el-carousel-item>
                    </el-carousel>
                </template>
            </el-table-column>
            <el-table-column
                prop="content"
                show-overflow-tooltip
                min-width="300"
                label="内容"
            ></el-table-column>
        </el-table>
        <page-pagination
            :pageSize="pageSize"
            @currentChange="handleCurrentChange"
            :total="total"
        ></page-pagination>
    </div>
</template>

<script>
import { getFeedbackList, feedbackExport } from 'src/api/feedback'

export default {
    data() {
        return {
            data: [],
            loading: false,
            total: 0,
            feedbackExport,
            page: 1,
            pageSize: 10
        }
    },
    components: {},

    methods: {
        openLlink(url) {
            window.open(url, '_blank')
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

            getFeedbackList({
                page: page || this.page || 1
            })
                .then(res => {
                    this.pageSize = res.per_page
                    this.data = res.data
                    this.total = res.total
                })
                .catch(e => {
                    this.$message.error(e.message)
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

.cut-imgs /deep/.el-carousel__item .img {
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
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
