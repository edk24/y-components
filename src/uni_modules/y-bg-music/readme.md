# y-bg-music 自动播放背景音乐

**兼容性**

| 移动端浏览器 | Ios微信内置浏览器 | Android内置浏览器 |
| :---: | :---: | :---: |
| 触摸任意地方播放 | ✅ 自动播放 | ✅ 自动播放 |


微信内置浏览器打开链接, 自动播放  无需有任何动作

## 演示效果

![alt text](https://y-components.edk24.com/static/y-bg-music/demo.png)

使用微信扫一扫查看效果

## 使用

**`Vue2` 将下述代码放到首页 onLoad 中即可**

```vue
<script lang="ts" setup>
import weixin from 'weixin-js-sdk'; // npm install weixin-js-sdk
import { useBgMusic } from '@/uni_modules/y-bg-music/js_sdk';


const bgmusic = useBgMusic({
    src: 'https://y-components.netlify.app/static/bgmusic.mp3',
    loop: 999,      // 循环次数
    controls:true   // 显示右上角控制元素 (可以隐藏自己实现)
});


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
    bgmusic.play(); // 播放～
});
</script>
```

## 常见问题

1. 播放控制元素太丑
    
    答：可以隐藏的，然后自己写一个替代。

## 参考

技术实现思路来自 [superzdd](https://github.com/superzdd) 大佬的开源仓库 [微信端H5背景音乐自动播放研究](https://github.com/superzdd/wechat-h5-backgound-music-survey)

## 意见反馈、联系我

绿泡泡：Base1024

有问题请反馈, 此 jssdk 持续维护中.

![wx](https://y-components.edk24.com/static/y-bg-music/wx-qrcode.jpg)

