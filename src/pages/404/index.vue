<template>
    <div class="not-found">
        <div class="not-found__img">
            <img src="../../assets/img/img_404_lost_nor.png" />
        </div>
        <dl class="not-found__info">
            <dt class="not-found__title">抱歉，出了一些问题，页面不见了。</dt>
            <dd>可能是以下原因：</dd>
            <dd>1、页面数据被删除</dd>
            <dd>2、URL含有的ID不存在</dd>
            <dd>您可以：</dd>
            <dd class="not-found__action">
                <div class="not-found__back" @click="$router.back()">
                    返回上一页
                </div>
                <div
                    class="not-found__go-home"
                    @click="$router.replace('/product')"
                >
                    回到首页
                </div>
            </dd>
        </dl>
    </div>
</template>

<style lang="less" scoped>
@import '~assets/less/var.less';
.not-found {
    padding-top: 80px;
    width: 480px;
    margin: 0 auto;
    &__img {
        width: 100%;
        height: 336px;
    }
    &__info {
        padding-top: 60px;
        color: #b9bfd3;
    }
    &__title {
        font-size: 24px;
        margin-bottom: 20px;
        color: #3e4352;
    }
    &__action {
        padding-top: 40px;
        width: 300px;
        font-size: 18px;
        color: @color-blue;
    }
    &__back {
        float: left;
        background: url('../../assets/img/ico_404_back_nor.png') no-repeat left
            center;
        padding-left: 30px;
        cursor: pointer;
    }
    &__go-home {
        float: right;
        background: url('../../assets/img/ico_404_home_nor.png') no-repeat left
            center;
        padding-left: 30px;
        cursor: pointer;
    }
}
</style>
