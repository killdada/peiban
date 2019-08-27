<template>
    <div class="page-header">
        <router-link :to="{ name: 'lesson' }">
            <div class="img"></div>
            <div class="page-header-name">
                <span class="line">|</span>
                管理后台
            </div>
        </router-link>
        <ul class="header-left"></ul>
        <ul class="header-right">
            <dropdown-menu
                placement="bottom-end"
                v-model="menuStatus.top"
                trigger="hover"
                :hide="keepMenu"
            >
                <li slot="reference" style="width:auto;min-width:120px">
                    <span>
                        {{ account }}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                </li>
                <ul
                    @mouseover="menuStatus.hover = true"
                    @mouseleave="menuStatus.hover = false"
                >
                    <li class="btn-danger" @click="logout">退出账号</li>
                </ul>
            </dropdown-menu>
        </ul>
    </div>
</template>

<script>
import cookie from 'js-cookie'
import { logOut } from 'src/api/login'

export default {
    name: 'Header',

    data() {
        return {
            menuStatus: {
                // 菜单展开状态
                top: false, // 第一层菜单
                hover: false,
                role: false // 切换角色菜单项
            },
            account: ''
        }
    },

    created() {
        this.fetchData()
    },

    methods: {
        fetchData() {
            this.account =
                localStorage.getItem('username') || cookie.get('user_name')
        },
        keepMenu() {
            this.menuStatus.top = this.menuStatus.top || this.menuStatus.role
            if (this.menuStatus.role) {
                // hack popover 层级
                this.menuStatus.role = false
                this.$nextTick(() => {
                    this.menuStatus.role = true
                })
            }
        },
        closeMenu() {
            this.$nextTick(() => {
                if (!this.menuStatus.hover && !this.menuStatus.role) {
                    this.menuStatus.top = false
                }
            })
        },
        logout() {
            this.$confirm('您是否确认退出？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    logOut().then(() => {
                        cookie.remove('token')
                        location.reload()
                    })
                })
                .catch(() => {
                    this.$message.info('已取消')
                })
        }
    }
}
</script>

<style lang="less">
@import '~assets/less/var.less';

@img: '../assets/img';

.page-header {
    display: flex;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    transition: width 0.3s;
    &-name {
        padding: 0 0;
        text-align: center;
        padding: 0 15px 0 10px;
        height: 25px;
        font-size: 16px;
        color: @color-primary;
        font-weight: bold;
        .line {
            color: #e4e5ea;
            display: inline-block;
            margin-right: 5px;
        }
    }
    > a {
        display: flex;
        justify-content: center;
        align-items: center;
        .img {
            width: 150px;
            height: 100%;
            // margin-left: 20px;
            background: url('@{img}/logo_paas_nor.png') left center no-repeat;
        }
        // width: 150px;
        // // flex: 150px 0 0;
        // height: 100%;
        // margin-left: 20px;
        // // text-indent: -1000px;
        // background: url('@{img}/logo_paas_nor.png') left center no-repeat;
    }

    ul {
        height: 100%;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    li {
        display: inline-block;
        width: 120px;
        padding: 0 0;
        line-height: 70px;
        text-align: center;
        a {
            display: block;
            height: 100%;
            font-size: 16px;
            cursor: pointer;
            color: @color-primary;
            text-decoration: none;
        }
        span {
            cursor: default;
        }
    }

    .header {
        &-left {
            flex: auto 1 1;
            font-weight: 600;
            .router-link-active {
                background-image: linear-gradient(
                    -180deg,
                    #7eb5ff 0%,
                    #3089ff 100%
                );
                a {
                    color: #fff;
                }
            }
            .el-icon--right {
                margin: 0;
                transform: scale(0.75);
            }
        }
        &-right {
            flex: auto 0 0;
            a {
                color: @color-gray;
            }
        }
    }
}
.dropdown-menu {
    &.shadow-offset {
        box-shadow: @shadow-third-menu;
        border-radius: 4px 0 0 4px;
    }
    ul span {
        span.switch-roles {
            font-size: 16px;
            color: #6d7283;
            margin-left: -3px;
            padding-left: 3px;
            &.open {
                color: #4c99fe;
            }
        }
    }
}

.primary-accounts {
    li {
        min-width: 168px;
        i {
            visibility: hidden;
            font-weight: 700;
            font-size: 1.2em;
            float: right;
        }
        &.active {
            cursor: default;
            color: #4c99fe;
            i {
                visibility: visible;
            }
        }
    }
}
</style>
