<template>
    <view>
        <!-- <y-navigation background="#456dea"  :fixed="true">
            用户列表
        </y-navigation> -->
        <y-navigation backgroundColor="linear-gradient(135deg,#ee9ae5,#5961f9)" :fixed="true" title="用户列表"
            color="black"></y-navigation>
        <!-- <y-navigation :backgroundImage="navBg" color="black" :fixed="true" title="用户列表1"></y-navigation> -->

        <!-- <y-navigation background="linear-gradient(135deg,#3c8ce7,#00eaff)" :fixed="true">
            用户列表
        </y-navigation> -->

        <view class="img">
            <image src="./images/img.png" mode="widthFix"></image>
            <text>什么也没有~</text>
        </view>
    </view>
</template>

<script lang="ts" setup>
import navBg from '../../static/navbar-bg.png'
</script>

<style scoped>
.img {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
    flex-direction: column;
    gap: 20rpx;
}

.img image {
    width: 60%;
}
.img text {
    color: #999;
    font-size: 34rpx;
}
</style>