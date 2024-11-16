# y-user-profile

> 用户资料完善弹出框 Vue3

- [演示效果(微信小程序可选填充昵称头像)](https://y-components.netlify.app/#/pages/user-profile/index)

## Example

> 示例

```vue
<template>
    <y-user-profile ref="userProfileRef" v-model="userInfo" theme-color="#c12c1f" :handle-upload="handleUploadAvatar" @submit="handleSubmit" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const userInfo = ref({ nickname: '', avatar: ''})
const userProfileRef = ref()

setTimeout(() => {
    userProfileRef.value.open()
}, 1000);

async function handleUploadAvatar(tmpPath: string) {
    // TODO 处理上传逻辑
	const url = await apiUpload(tmpPath);
    return url;
}

function handleSubmit(data: any) {
    // TODO 处理提交逻辑
    userProfileRef.value.close() // 关闭
}
</script>
```

## Props

> 参数

| name | 类型 | 默认值 | 备注 |
| --- | --- | --- | :--- |
| v-model | object | `{ nickname: '', avatar: ''}` |  |
| domain | string | `''` | 域名，头像相对路径时可用来拼接完整地址 |
| height | number | `800` | 抽屉高度 |
| themeColor | string | `#456dea` | 主题色（按钮颜色） |
| showClose | boolean | `true` | 显示关闭按钮 |
| maskClosable | boolean | `false` | 点击遮罩可关闭 |
| handleUpload | callback | `(tmpPath: string) => Promise<string>` | 处理头像上传，传入临时图像路径，要求返回上传后图像地址 |
| defaultAvatar | string | 无 | 默认头像，支持 import 的图像和完整图片地址(不拼接 domain)，不污染 v-model 中的 avatar |

## Methods

> 方法

| 方法名 | 描述 |
| --- | :--- |
| open | 打开 |
| close | 关闭 |

## Events

> 事件

| 事件名 | 定义 | 备注 |
| --- | :--- | :--- |
| submit | `(data: {nickname:string, avatar:string}) => {  }` | 提交事件 |

## Slots

> 插槽

| 名称 | 作用 |
| :--- | :--- |
| title | 标题 |
| desc | 描述 |

## 意见反馈、联系我

有问题可以直接在评论区反馈，或是联系我，此组件持续维护中...

![联系我](https://y-component.edk24.com/static/contact.png)
