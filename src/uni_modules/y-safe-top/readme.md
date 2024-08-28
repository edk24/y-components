# y-safe-top

顶部安全区占位组件

主要解决 `"navigationStyle": "custom"` 小程序和APP顶部状态条或到胶囊区域的占位


效果描述

- **APP**: 占状态条高度
- **小程序**: 占到胶囊的高度, 如需获取胶囊定位与宽高信息, 请使用 [wx.getMenuButtonBoundingClientRect()](https://developers.weixin.qq.com/miniprogram/dev/api/ui/menu/wx.getMenuButtonBoundingClientRect.html)
- **H5**: 占高度为0

## 示例

```vue
<template>
    <view>
        <y-safe-top />
        <!-- 下面是安全区代码 -->
        <y-navbar>首页</y-navbar>
    </view>
</template>
```


## 意见反馈

- [yuxiaobo64@gmail.com](mailto:yuxiaobo64@gmail.com)
