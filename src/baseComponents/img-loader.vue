<template>
    <div class="img-loader" v-if="!simple" :class="disabled && 'disabled'">
        <el-upload
            :action="action"
            :accept="accept"
            :name="image"
            :http-request="httpRequest"
            class="uploader"
            :style="style"
            :data="data"
            v-loading="loading"
            :disabled="loading || disabled"
            :headers="headers"
            :show-file-list="false"
            :before-upload="beforeUploadHook"
            :auto-upload="autoUpload"
            :on-progress="onProgress"
            :on-success="onSuccess"
            :on-change="onChange"
            :on-error="onError"
        >
            <div v-if="model" class="uploader-preview">
                <img :src="model" @load="onImgLoad" @error="onImgError" />
            </div>
            <i class="el-icon-plus" v-else></i>
        </el-upload>
        <slot></slot>
        <el-input v-model="model" style="display: none" />
    </div>
    <div class="img-loader" :class="disabled && 'disabled'" v-else>
        <div
            class="uploader"
            @click="handleClick"
            style="width: 96px; height: 96px; line-height: 24px;"
        >
            <div tabindex="0" class="el-upload el-upload--text">
                <div v-if="model" class="uploader-preview">
                    <img :src="model" />
                </div>
                <i class="el-icon-plus" v-else></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ImgLoader',

    data() {
        return {
            model: '',
            isUploading: false,
            isLoadingImg: false
        }
    },

    props: {
        accept: {
            type: String,
            default: 'image/gif,image/jpeg,image/jpg,image/png,image/svg'
        },
        simple: {
            type: Boolean,
            default: false
        },
        image: {
            type: String,
            default: 'media'
        },
        action: {
            type: String
            // required: true
        },
        width: {
            type: Number,
            default: 96
        },
        height: {
            type: Number,
            default: 96
        },
        value: String,
        data: {
            type: Object,
            default: null
        },
        headers: {
            type: Object,
            default: null
        },
        autoUpload: {
            type: Boolean,
            default: true
        },
        beforeUpload: Function,
        httpRequest: Function,
        disabled: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        loading() {
            return this.isLoadingImg || this.isUploading
        },
        style() {
            return {
                width: `${this.width}px`,
                height: `${this.height}px`,
                lineHeight: `${Math.max(Math.ceil(this.height * 0.16), 24)}px`
            }
        }
    },

    watch: {
        value: {
            immediate: true,
            handler(val) {
                if (this.model !== val) {
                    this.model = val
                    this.isLoadingImg = !!val
                }
            }
        },
        model(val) {
            if (val !== this.value) {
                this.$emit('input', val)
            }
        }
    },

    methods: {
        handleClick() {
            !this.disabled && this.$emit('clickUpload')
        },
        beforeUploadHook(file) {
            if (this.beforeUpload) return this.beforeUpload(file)
            return true
        },
        onProgress() {
            this.isUploading = true
        },
        onSuccess(res, file, fileList) {
            this.$emit('success', res, file, fileList)
            this.isUploading = false
        },
        onChange(file, fileList) {
            this.$emit('change', file, fileList)
        },
        onError(err, file, fileList) {
            this.$emit('error', err, file, fileList)
            this.isUploading = false
        },
        onImgLoad() {
            this.isLoadingImg = false
        },
        onImgError() {
            this.isLoadingImg = false
        }
    }
}
</script>

<style lang="less">
.img-loader {
    &.disabled {
        cursor: not-allowed;
        opacity: 0.5;
        .el-upload {
            cursor: not-allowed;
        }
    }
    .uploader {
        display: inline-block;
        position: relative;
        border-radius: 4px;
        background: #f6f7fc;
        vertical-align: text-bottom;
        &-preview {
            width: 100%;
            height: 100%;
            position: relative;
            &::after {
                content: '点击上传';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 16%;
                min-height: 24px;
                border-radius: 0 0 4px 4px;
                background: #4c99fe;
                font-size: 14px;
                color: #fff;
            }
        }
    }
    .el-upload {
        width: 100%;
        height: 100%;
        font-size: 40px;
        color: #d3d8e9;
    }
    img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
    }
    .el-icon-plus {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        font-weight: 700;
    }
}
</style>
