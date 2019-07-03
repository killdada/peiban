<template>
    <div class="login-container">
        <div class="header">
            <div class="header-logo">
                <img src="../../assets/img/login/logo.png" />
            </div>

            <div class="header-title">欢迎登录</div>
        </div>

        <div class="content">
            <div class="login-left"></div>

            <div class="login-right">
                <div class="login-form">
                    <p class="titlep">账号登录</p>
                    <el-form ref="formLogin" :model="formLogin" :rules="rules">
                        <el-form-item prop="account">
                            <div class="form-item">
                                <div class="inputDiv">
                                    <div class="lefticon">
                                        <img src="../../assets/img/user.png" />
                                    </div>
                                    <div class="rightinput">
                                        <input
                                            v-model.trim="formLogin.account"
                                            class="inputs"
                                            placeholder="用户名"
                                            autocomplete="off"
                                        />
                                    </div>
                                </div>
                            </div>
                        </el-form-item>

                        <el-form-item prop="password">
                            <div class="form-item">
                                <div class="inputDiv">
                                    <div class="lefticon">
                                        <img src="../../assets/img/mima.png" />
                                    </div>
                                    <div class="rightinput">
                                        <input
                                            v-model.trim="formLogin.password"
                                            class="inputs"
                                            type="password"
                                            placeholder="密码"
                                            autocomplete="off"
                                            @keyup.enter="login"
                                        />
                                    </div>
                                </div>
                            </div>
                        </el-form-item>

                        <el-form-item>
                            <div class="remName" @click="toggleRemember">
                                <div
                                    class="checked"
                                    :class="{ checkeds: remember }"
                                ></div>
                                <div class="remTitle">记住账号</div>
                            </div>
                        </el-form-item>

                        <el-form-item
                            class="submit-item"
                            style="text-align: center"
                        >
                            <div
                                class="loginbtn"
                                v-loading="loading.loginBtn"
                                @click="login"
                            >
                                登录
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>

        <div class="footer">
            Copyright &copy; 2017 明源云版权所有 粤ICP备15101856号-2
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import cookie from 'js-cookie'
import { login } from 'src/api/login'

export default {
    name: 'login',

    data() {
        return {
            loading: {
                loginBtn: false
            },
            remember: cookie.get('user_remember'),
            formLogin: {
                account: '',
                password: ''
            },
            rules: {
                account: [
                    {
                        required: true,
                        message: '用户名不能为空',
                        trigger: 'blur'
                    }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        async login() {
            if (this.loading.loginBtn) return
            this.loading.loginBtn = true
            this.$refs.formLogin.validate(valid => {
                if (valid) {
                    if (this.remember) {
                        cookie.set('user_name', this.formLogin.account, {
                            expires: 7
                        })
                        cookie.set('user_remember', 1, { expires: 7 })
                    } else {
                        cookie.remove('user_name')
                        cookie.remove('user_remember')
                    }
                    login({
                        username: this.formLogin.account,
                        password: this.formLogin.password
                    })
                        .then(data => {
                            cookie.set('token', data.access_token, {
                                expires: 7
                            })
                            location.reload()
                        })
                        .catch(err => {
                            this.$message.error(
                                _.isError(err)
                                    ? '系统异常，请稍后再试'
                                    : `${err}`
                            )
                        })
                        .finally(() => {
                            this.loading.loginBtn = false
                        })
                } else {
                    this.loading.loginBtn = false
                }
            })
        },
        toggleRemember() {
            this.remember = !this.remember
        }
    },

    mounted() {
        this.formLogin.account = cookie.get('user_name') || ''
    }
}
</script>

<style lang="less">
@img: '../../assets/img';

.login-container {
    min-height: 100%;
    background: url('@{img}/background.png');
    background-size: cover;
    .header {
        width: 1140px;
        margin: 0 auto 66px;
        padding-top: 62px;
        &-logo {
            display: inline-block;
            line-height: 0;
            vertical-align: bottom;
        }
        &-title {
            font-family: PingFangSC-Regular;
            display: inline-block;
            color: #fff;
            font-size: 26px;
            margin-left: 38px;
            letter-spacing: 2px;
        }
    }

    .content {
        background: rgba(255, 255, 255, 0.49);
        box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.2);
        border-radius: 6px;
        width: 1000px;
        height: 500px;
        margin: 0 auto;
        .login-left {
            width: 520px;
            height: 100%;
            float: left;
            background: url('@{img}/left.png') center no-repeat;
        }

        .login-right {
            width: 480px;
            height: 100%;
            float: right;
            padding: 102px 96px 0;
            background: #fff;
            .login-form {
                width: 100%;
                .titlep {
                    font-size: 18px;
                    color: #333333;
                    line-height: 18px;
                    text-align: center;
                }
                .inputDiv {
                    width: 290px;
                    height: 40px;
                    background: #ffffff;
                    border: 1px solid #e7e7eb;
                    .lefticon {
                        width: 38px;
                        height: 38px;
                        text-align: center;
                        float: left;
                        padding: 0;
                        margin: 0;
                    }
                    .rightinput {
                        float: right;
                        width: 248px;
                        font-size: 14px;
                        margin-top: 1px;
                        .inputs {
                            border: none;
                            width: 248px;
                            height: 36px;
                            background: #fff;
                            float: left;
                            font-size: 14px;
                        }
                    }
                }
                .remName {
                    margin-top: 2px;
                    overflow: hidden;
                    .checked {
                        width: 18px;
                        height: 18px;
                        border: 1px solid #e7e7eb;
                        background: #fff;
                        float: left;
                        cursor: pointer;
                    }
                    .checkeds {
                        background: url('@{img}/remember.png') center no-repeat;
                    }

                    .remTitle {
                        height: 16px;
                        float: left;
                        line-height: 17px;
                        margin-left: 6px;
                        font-size: 14px;
                        color: #333333;
                    }
                }
                .loginbtn {
                    width: 290px;
                    height: 60px;
                    margin-top: 15px;
                    background: url('@{img}/login.png');
                    background-size: 100%;
                    color: #fff;
                    line-height: 52px;
                    cursor: pointer;
                }
            }
        }
    }

    .footer {
        clear: both;
        text-align: center;
        margin-top: 110px;
        font-size: 12px;
        padding-bottom: 30px;
        color: #ffffff;
    }
    .error-msg {
        color: red;
    }
}
</style>
