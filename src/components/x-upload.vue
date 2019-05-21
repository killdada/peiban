<template>
    <el-upload
        class="x-upload"
        :action="action"
        :auto-upload="autoUpload"
        :show-file-list="false"
        :before-upload="beforeUploadHook"
        :on-progress="onProgress"
        :on-success="onSuccess"
        :on-change="onChange"
        :multiple="multiple"
        :on-error="onError"
    >
        <slot></slot>
        <el-button type="text" :loading="loading" :disabled="loading"
            >点击上传</el-button
        >
    </el-upload>
</template>

<script>
export default {
    name: 'XUpload',

    data() {
        return {
            loading: false
        }
    },

    props: {
        action: {
            type: String,
            required: true
        },
        autoUpload: {
            type: Boolean,
            default: true
        },
        multiple: {
            type: Boolean,
            default: false
        },
        beforeUpload: Function
    },

    methods: {
        beforeUploadHook(file) {
            if (this.beforeUpload) {
                return this.beforeUpload(file)
            }
            return true
        },
        onChange(file, fileList) {
            this.$emit('change', file, fileList)
        },
        onProgress() {
            this.loading = true
        },
        onSuccess(res, file, fileList) {
            this.$emit('success', res, file, fileList)
            this.loading = false
        },
        onError(err, file, fileList) {
            this.$emit('error', err, file, fileList)
            this.loading = false
        }
    }
}
</script>

<style lang="less" scoped>
.x-upload {
    display: inline;
}
</style>
