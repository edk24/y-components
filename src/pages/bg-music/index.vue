<template>
    <view>
        111
    </view>
</template>

<script lang="ts" setup>
import { useBgMusic } from '@/uni_modules/y-bg-music/js_sdk';
import weixin from 'weixin-js-sdk';
const dd = useBgMusic({
    src: 'https://superzdd.github.io/wechat-h5-backgound-music-survey/bgmusic.mp3'
});

weixin.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，公众号的唯一标识
    timestamp: 0, // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '', // 必填，签名，见附录1
    jsApiList: [ "openLocation"]
});

weixin.ready(() => {
    dd.play();
});

</script>