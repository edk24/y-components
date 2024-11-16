<template>
    <view class="desc">
        <view v-if="!isWxBrowser">请使用微信内置浏览器打开～</view>
        <view v-else
            style="flex:1;display: flex; flex-direction: column; gap: 50rpx; justify-content: center; align-items: center;">
            <view v-if="!playing">有在播放吗？ 🤨</view>
            <view v-else
                style="width:300rpx; display: flex; flex-direction: column; justify-content: center; gap:50rpx; align-items: center;">
                <image src="../../static/gif/1.gif" style="width:300rpx;" mode="widthFix"></image>
                <image src="../../static/gif/2.gif" style="width:300rpx;" mode="widthFix"></image>
                <image src="../../static/gif/3.gif" style="width:300rpx;" mode="widthFix"></image>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
// #ifdef H5
import { useBgMusic } from '@/uni_modules/y-bg-music/js_sdk';
import {  ref } from 'vue';
import weixin from 'weixin-js-sdk';

const isWxBrowser = ref(/micromessenger/i.test(navigator.userAgent))
let bgmusic: any = null;
const playing = ref(false);

try {
    bgmusic = useBgMusic({
        // src: 'https://doc.edk24.com/music.mp3',
        src: 'https://y-component.edk24.com/static/gxfc.mp3',
        // src: 'https://yinliancaiyi-1314117357.cos.accelerate.myqcloud.com/pajk/static/beijing.mp3',
        // src:'https://ai-1301258994.cos.ap-guangzhou.myqcloud.com/beijing1.ogg',
        // src:'https://doc.edk24.com/beijing.ogg',
        // src: 'https://bate.www.ioi.plus/music.m4a',
        // src: 'https://superzdd.github.io/wechat-h5-backgound-music-survey/bgmusic.mp3',
        loop: 999,
        controls: true
    });
} catch (error:any) {
    // alert(error.message  | error.msg | error)
}


// 留空也要调用一下，否则无法自动播放
weixin.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，公众号的唯一标识
    timestamp: 0, // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '', // 必填，签名，见附录1
    jsApiList: [ ]
});

weixin.ready(() => {
    bgmusic.play()
        .then(() => {
         playing.value = true;
        });
});
// #endif
</script>

<style lang="scss" scoped>
.desc {
    color: #333;
    text-align: center;
    margin-top: 50rpx;
    font-size: 34rpx;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    gap: 20rpx;
}

body {
    background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
}
</style>