# y-navigation

🌈 TypeScript + Vue3 (是的，不支持vue2)

> 开发这个组件的初衷

偶尔需要用到自定义导航，有时是透明背景，有时是渐变色背景；

有时是使用了自定义 tabbar 解决权限展示底部按钮问题，子页面作为组件载入。。。 结果傻逼了，导航栏无了   得搓一个差不多的用来占位

目前实践测试了 `微信小程序` `H5`，有问题欢迎联系微信 `Base1024` 我会及时修复。

## Examples

```vue
<template>
    <!-- 正常 -->
    <y-navigation :type="'default'" background="#456dea">
        客户列表
    </y-navigation>

    <!-- diy -->
    <y-navigation :type="'custom'" :background="'transparent'" :show-status-bar="false">
        我的二维码
    </y-navigation>
</template>
```

## Props

> 参数

| 参数名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| type | string | `default` | 类型，取值范围：`default` \| `custom` |
| showBack | boolean | `true` | `showBack && 有上一页`  才显示 |
| color | string | `white` | 文字颜色，取值范围：`white` \| `black` |
| background | string | `linear-gradient(135deg, #0498FB 0%, #5359EE 100%)` | 背景色，允许使用渐变色，rgba，hex等 |
| showStatusBar | boolean | `true` | 状态条占位，小程序 app建议开启 |
| fontSize | string \| number | `34rpx` | 文字大小，仅 `custom` 类型时生效，输入 number 默认单位 rpx |

## Slot

> 插槽

| name | 作用 |
| --- | --- |
| default | 导航栏标题 |
| extend | 右侧扩展内容区域 |
