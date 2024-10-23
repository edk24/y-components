# y-navigation

**兼容性**

| APP | H5 | 微信小程序 | 支付宝小程序 | 抖音小程序 | QQ小程序 | 百度小程序 | 飞书小程序 | 快应用 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| ✅<br>`HBX > 3.4.13` | ✅ | ✅<br>`基础库 > 1.9.6` | 不确定 | 不确定 | 不确定 | 不确定 | 不确定 | 不确定 |


<br>

🌈 TypeScript + Vue3

> 开发这个组件的初衷

偶尔需要用到自定义导航，有时是透明背景，有时是渐变色背景；

有其他需求可联系我, 接php全栈开发 / 前端开发 (微信: Base1024)


## Examples

```vue
<template>
    <!-- 正常 -->
    <y-navigation  background="#456dea">
        客户列表
    </y-navigation>

    <!-- 透明 -->
    <y-navigation  :background="'transparent'">
        我的二维码
    </y-navigation>

    <!-- 渐变色 -->
    <y-navigation background="linear-gradient(135deg,#ee9ae5,#5961f9)" >
        用户列表
    </y-navigation>
</template>
```

## Props

> 参数

| 参数名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| showBack | boolean | `true` | 显示返回按钮, `showBack && 有上一页`  才显示 |
| color | string | `white` | 文字颜色，取值范围：`white` \| `black` |
| background | string | `linear-gradient(135deg, #0498FB 0%, #5359EE 100%)` | 背景色，允许使用渐变色，rgba，hex 以及透明`transparent`等 |
| fontSize | string \| number | `34rpx` | 标题文字大小,输入 number 默认单位 rpx |
| fixed | boolean | `true` | 是否固定在顶部 |

## Slot

> 插槽

| name | 作用 |
| --- | --- |
| default | 导航栏标题 |
| extend | 右侧扩展内容区域 |
