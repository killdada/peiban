<template>
    <div class="login-container" @mousemove="move">
        <div class="elements">
            <div class="perspect-river">
                <div class="layer-river"></div>
            </div>
        </div>
        <div class="header">
            <div class="header-logo"></div>
        </div>
        <div class="flex-blank with-max"></div>
        <div class="content">
            <div class="stage">
                <div class="login-left">
                    <div class="elements front-elements">
                        <div class="perspect-front" :style="perspectStyle">
                            <div class="layer-devices"></div>
                            <div class="layer-roles"></div>
                        </div>
                    </div>
                </div>
                <div class="login-right">
                    <div class="login-form">
                        <div class="login-header">
                            <p class="greet">欢迎回来</p>
                        </div>
                        <el-form
                            ref="formLogin"
                            :model="formLogin"
                            :rules="rules"
                        >
                            <el-form-item prop="tenant_code" v-if="hasTenant">
                                <el-input
                                    class="inputs"
                                    clearable
                                    v-model.trim="formLogin.tenant_code"
                                    placeholder="请输入租户代码"
                                    autocomplete="off"
                                    :autofocus="true"
                                ></el-input>
                            </el-form-item>
                            <el-form-item prop="account">
                                <el-input
                                    class="inputs"
                                    clearable
                                    v-model.trim="formLogin.account"
                                    placeholder="请输入账号"
                                    autocomplete="off"
                                    @blur="blur"
                                ></el-input>
                            </el-form-item>

                            <el-form-item prop="password">
                                <el-input
                                    clearable
                                    class="inputs"
                                    type="password"
                                    placeholder="请输入密码"
                                    autocomplete="new-password"
                                    @copy.native.capture.prevent="handleCopy"
                                    @cut.native.capture.prevent="handleCopy"
                                    @keyup.enter.native="login"
                                    v-model.trim="formLogin.password"
                                ></el-input>
                            </el-form-item>

                            <el-form-item
                                prop="captcha"
                                v-if="hasCaptcha && needCaptcha"
                            >
                                <div class="captcha">
                                    <div class="captcha-input">
                                        <el-input
                                            clearable
                                            class="inputs"
                                            placeholder="请输入验证码"
                                            autocomplete="off"
                                            @keyup.enter.native="login"
                                            v-model.trim="formLogin.captcha"
                                        ></el-input>
                                    </div>
                                    <div
                                        class="captcha-img"
                                        v-loading="loading.captcha"
                                    >
                                        <img
                                            width="113"
                                            height="48"
                                            :src="captchaUrl"
                                            :title="
                                                `点击刷新\n${formLogin.account}`
                                            "
                                            alt="点击刷新"
                                            @click="refresh()"
                                            @load="refreshed()"
                                            @error="refreshed()"
                                        />
                                    </div>
                                </div>
                            </el-form-item>
                            <el-form-item>
                                <el-button
                                    class="btn-login"
                                    type="primary"
                                    v-loading="loading.loginBtn"
                                    @click="login"
                                    round
                                    >登录</el-button
                                >
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-blank"></div>
    </div>
</template>

<script>
import _ from 'lodash'
import cookie from 'js-cookie'
import random from 'src/utils/random'

const expires = 1 // cookie 24h 过期

export default {
    props: {
        loginApi: Function,
        checkCaptchaApi: Function,
        captchaUrlAddress: String,
        hasCaptcha: {
            type: Boolean,
            default: true
        },
        hasTenant: {
            type: Boolean,
            default: false
        }
    },
    name: 'login',
    data() {
        return {
            loading: {
                loginBtn: false,
                captcha: true,
                checkingAccount: false
            },
            remember: true, // default enable cookie.get("user_remember"),
            formLogin: {
                account: '',
                password: '',
                captcha: '',
                tenant_code: ''
            },
            rules: {
                tenant_code: [
                    {
                        required: true,
                        message: '租户代码不能为空',
                        trigger: 'blur'
                    }
                ],
                account: [
                    {
                        required: true,
                        message: '用户名不能为空',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    },
                    { min: 8, message: '密码长度不能低于8位', trigger: 'blur' }
                ],
                captcha: [
                    {
                        required: true,
                        message: '验证码不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            perspectRotate: {
                x: 0,
                y: 0
            },
            needCaptcha: false,
            randomStr: 'randomStr',
            requiredId: random(16)
        }
    },
    computed: {
        captchaUrl() {
            const { randomStr, requiredId } = this
            return `${this.captchaUrlAddress}?request_id=${requiredId}&width=113&height=40&ram=${randomStr}`
        },
        perspectStyle() {
            const { x, y } = this.perspectRotate
            return {
                transform: `perspective(1000px) translateX(0) translateY(0) translateZ(0px)
      rotateX(${x}deg) rotateY(${y}deg)`
            }
        }
    },
    methods: {
        handleCopy() {
            //
        },
        rememberForm() {
            if (this.remember) {
                cookie.set('user_name', this.formLogin.account, { expires })
                cookie.set('user_remember', 1, { expires })
                cookie.set('tenant_code_remember', this.formLogin.tenant_code, {
                    expires
                })
            } else {
                cookie.remove('user_name')
                cookie.remove('user_remember')
                cookie.remove('tenant_code_remember')
            }
        },
        async login() {
            if (this.loading.checkingAccount && this.hasCaptcha) {
                this.$message.error('账户检查中，请重试')
                return
            }
            if (this.loading.loginBtn) return
            this.loading.loginBtn = true
            try {
                await this.$refs.formLogin.validate() // validate result
                if (/.+@mysoft$/.test(this.formLogin.account)) {
                    this.formLogin.account = this.formLogin.account.replace(
                        /@mysoft$/,
                        ''
                    )
                }
                this.rememberForm()

                const data = await this.loginApi({
                    username: this.formLogin.account,
                    name: this.formLogin.account,
                    password: this.formLogin.password,
                    tenant_code: this.formLogin.tenant_code,
                    request_id: this.requiredId,
                    code: this.formLogin.captcha
                })
                this.$emit('success', {
                    result: data,
                    expires,
                    form: this.formLogin
                })
            } catch (err) {
                if (err !== false) {
                    this.needCaptcha = true // 登陆失败，显示验证码
                    const errMsg = _.isError(err)
                        ? '系统异常，请稍后再试'
                        : `${err}`
                    this.$message.error(errMsg)
                    if (this.hasCaptcha) {
                        this.refresh()
                    }
                }
                // err 为  false 为表单验证未通过, el-form将给出提示
            }
            this.loading.loginBtn = false
        },
        refresh(force) {
            if (!force && this.loading.captcha) {
                return
            }
            this.loading.captcha = true
            this.formLogin.captcha = '' // 刷新验证码时，清空输入框
            this.randomStr = random(7)
        },
        refreshed() {
            this.loading.captcha = false
        },
        async checkAccout(account) {
            if (this.hasTenant && this.formLogin.tenant_code === '') {
                return false
            }
            try {
                this.loading.checkingAccount = true
                const status = await this.checkCaptchaApi({
                    name: account,
                    tenant_code: this.formLogin.tenant_code
                })
                this.loading.checkingAccount = false
                return status
            } catch (error) {
                this.loading.checkingAccount = false
                return false
            }
        },
        async blur() {
            const { account } = this.formLogin
            if (!account || !this.hasCaptcha) {
                return
            }
            const status = await this.checkAccout(account)
            if (status && this.needCaptcha) {
                this.refresh(true)
            }
            this.needCaptcha = !!status
        },
        move(e) {
            let { clientX, clientY } = e
            const { width, height } = window.screen
            clientX = Math.max(clientX, width * 0.2)
            clientX = Math.min(clientX, width * 0.7)
            clientY = Math.max(clientY, height * 0.2)
            clientY = Math.min(clientY, height * 0.7)
            const centroX = clientX - width / 2
            const centroY = height / 2 - (clientY + 13)
            this.perspectRotate = {
                y: centroX * 0.004,
                x: centroY * 0.002
            }
        }
    },

    mounted() {
        const cachedUsername = cookie.get('user_name') || ''
        this.formLogin.tenant_code = cookie.get('tenant_code_remember') || ''
        if (cachedUsername) {
            this.formLogin.account = cachedUsername
            this.blur()
        }
    }
}
</script>

<style lang="less">
@import url('./login.less');
</style>
