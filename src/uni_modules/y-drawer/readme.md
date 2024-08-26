# y-drawer

> 抽屉组件，仅支持 Vue3

:::tip Tip

[图2] 效果参考插件 [y-user-profile 微信小程序完善用户信息](https://ext.dcloud.net.cn/plugin?id=19510)

:::

## Example

> 示例

```vue
<template>
  <y-drawer
    ref="drawerRef"
    :borderRadius="20"
    :showClose="true"
    :showMask="true"
    :maskClosable="true"
    :length="300"
    title="示例标题"
  >
    <!-- <template #title>标题插槽</template> -->
    <!-- 在这里插入内容 -->
    <view>抽屉内容</view>
  </y-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const drawerRef = ref();

setTimeout(() => {
    drawerRef.value.open()
}, 1000);
</script>
```

## Props

> 参数

| 参数名称       | 类型                              | 默认值       | 描述                                       |
| ------------ | --------------------------------- | ---------- | ---------------------------------------- |
| borderRadius | number                            | 20          | 圆角大小，单位：rpx                          |
| showClose    | boolean                           | false      | 显示关闭按钮，默认false                     |
| showMask     | boolean                           | true       | 显示遮罩，默认true                          |
| maskClosable | boolean                           | true       | 点击遮罩关闭，默认true                       |
| direction    | 'top' \| 'right' \| 'bottom' \| 'left' | 'bottom'   | 方向                                       |
| length       | number                            | 200        | 宽度/高度，默认 200rpx                       |
| closeIcon    | string                            | 'closeempty' | 关闭图标，参考：<https://zh.uniapp.dcloud.io/component/uniui/uni-icons.html> |
| closeBefore  | () => boolean                     | () => true | 关闭前处理，返回 true 允许关闭，否则不可关闭    |
| title        | string                            | ''         | 标题                                       |

## Methods

> 方法

```js
 defineExpose({
  // 打开
  open: () => {},
  // 关闭
  close: () => {}
})
```

## Slot

> 插槽

| name | 作用   |
| ---- | ---- |
| default | 自定义抽屉内容 |
| title | 标题插槽 |

## 常见问题

**滚动视图问题**

弹出层默认插槽里套个 `scroll-view` 实现，记得设置宽度和高度；

## End

> 结尾

若在使用过程中发现 BUG，请与我反馈，不胜感激。
