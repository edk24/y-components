<template>
    <view class="card-container">
        <navigator class="card" v-for="(item, i) in items" :key="i" :url="item.to">
            <view class="card-title">{{ item.title }}</view>
            <view class="card-desc">{{ item.desc }}</view>
        </navigator>
    </view>

    <view class="about">
        <view class="about-title">网站、APP开发上架、小程序、H5活动开发</view>
        <view class="about-qrcode">
            <image src="../static/wx-qrcode.jpg" mode="widthFix"></image>
        </view>
        <view class="about-wxid">Base1024<text v-if="isWxBrowser"> (长按识别)</text></view>
    </view>
    <view>

    </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const isWxBrowser = computed(() => {
    // #ifdef H5
    return /micromessenger/i.test(navigator.userAgent)
    // #endif
    
    return false;
});

const items = ref([
    {
        title: '抽屉',
        desc: 'y-drawer',
        to: '/pages/drawer/index'
    },
    {
        title: '完善小程序用户资料',
        desc: 'y-user-profile',
        to: '/pages/user-profile/index'
    },
    // #ifdef H5
    {
        title: 'H5自动背景音乐',
        desc: 'y-bg-music',
        to: '/pages/bg-music/index'
    },
    {
        title: '整屏滚动',
        desc: 'y-fullpage',
        to: '/pages/fullpage/index'
    },
    // #endif
    {
        title: '自定义导航栏',
        desc: 'y-navigation',
        to: '/pages/navigation/index'
    },
	// #ifdef APP-PLUS
	{
		title: '自定义导航栏/nvue',
		desc: 'y-navigation',
		to: '/pages/navigation/test'
	}
	// #endif
])
</script>

<style>

</style>
<style lang="scss" scoped>
body {
    background: linear-gradient(45deg, #fc466b, #3f5efb);
}

.card-container {
    padding: 18rpx;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap:20rpx;

    .card {
        padding: 30rpx 20rpx;
        background: rgba(0, 0, 0, 0.25);
        backdrop-filter: blur(9rpx);
        -webkit-backdrop-filter: blur(9rpx);
        display: flex;
        flex-direction: column;
        gap: 10rpx;

        .card-title {
            font-size: 30rpx;
            color: #fff;
            font-weight: bold;
        }

        .card-desc {
            font-size: 24rpx;
            color: #eee;
        }
    }
}


.about {
    position: fixed;
    bottom: 50rpx;
    left: 0;
    right: 0;
    display: flex;
    text-align: center;
    flex-direction: column;
    gap: 30rpx;
    align-items: center;

    &-title {
        font-size: 34rpx;
        font-weight: bold;
        color: #fff;
    }

    &-wxid {
        font-size: 24rpx;
        color: #fff;
    }

    &-qrcode {
        width: 220rpx;
        height:220rpx;
        border-radius: 15rpx;
        padding: 10rpx 10rpx 15rpx 10rpx;
        background: #fff;
        

        image {
            width: 100%;
            height: 100%;
        }
    }
}
</style>