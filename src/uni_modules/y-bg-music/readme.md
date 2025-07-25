# y-bg-music 自动播放背景音乐

**兼容性**

| 移动端浏览器 | iOS微信内置浏览器 | Android微信内置浏览器 |
| :---: | :---: | :---: |
| 触摸任意地方播放 | ✅ 自动播放 | ✅ 自动播放 |

微信内置浏览器打开链接, 自动播放  无需有任何动作。同时支持 vue2 和 vue3

## 演示效果

![alt text](https://y-component.edk24.com/static/y-bg-music/demo.png)

使用微信扫一扫查看效果

📦 [demo.zip](https://www.123865.com/s/748ETd-vbssH)

**自动播放需具备下列条件**

- `手机微信内置浏览器`打开链接
- `https` 协议
- `src` 音乐链接无跨域问题
- `mp3` `ogg` 等格式

## 使用

**`Vue2` 将下述代码放到首页 onLoad 中即可**

```vue
<script lang="ts" setup>
import weixin from 'weixin-js-sdk'; // npm install weixin-js-sdk
import { useBgMusic } from '@/uni_modules/y-bg-music/js_sdk';


const bgmusic = useBgMusic({
    src: 'http://music.163.com/song/media/outer/url?id=1814767154.mp3', // mp3 ogg......
    loop: 999,      // 循环次数
    controls:true   // 显示右上角控制元素 (可以隐藏自己实现)
    customStyle: {  // 自定义悬浮图标样式
        right: '10rpx'
    }
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

useBgMusic 参数说明：

- **src**：音乐地址
- **loop**：循环次数
- **controls**：是否显示控制按钮
- **customIcon**：自定义图标，字符串  可以传入 svg 比较方便 (可以去 `iconfont` 找)
- **customStyle**：自定义悬浮图标样式 （感谢 @hel***@adophper.com）

## 音乐外链

[网易云音乐外链提取](https://doc.edk24.com/music163/)

不支持 `Vip` 歌曲，仅供学习交流测试 稳定性需求还是下载托管到自己的服务器

## 常见问题

1. 播放控制元素太丑

    答：可以隐藏的，然后自己写一个替代。

2. 无法播放

    答：检查音乐链接是否可以播放, 另外需要注意跨域问题!

## 跨域解决

- 对象储存(oss/cos): 设置允许访问地址
- nginx: 下列规则可以写到 `伪静态` 中

```nginx
location / {  
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';

    if ($request_method = 'OPTIONS') {
        return 204;
    }
}
```

## 参考

技术实现思路来自 [superzdd](https://github.com/superzdd) 大佬的开源仓库 [微信端H5背景音乐自动播放研究](https://github.com/superzdd/wechat-h5-backgound-music-survey)

## 意见反馈、联系我

有问题可以直接在评论区反馈，或是联系我，此项目持续维护中...

![联系我](https://y-component.edk24.com/static/contact.png)

## 感谢

❤️ 感谢所有对项目进行捐助和支持的朋友们～

下面是捐助名单，按时间排序

| 捐助时间 | 捐助内容 | 捐助者 |
| :--- | :---: | :--- |
| 2024/11/16 |  66.00 | 郑智文 |
