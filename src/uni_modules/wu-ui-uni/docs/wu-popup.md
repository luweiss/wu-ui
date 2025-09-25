# wu-popup

## 组件描述
半屏弹出框，从页面底部弹出

## 组件示例

### example

```html
<script setup>
    import {ref} from 'vue';
    const state = ref(false)
</script\>
<template>
  <div>
      <wu-button @click="state = true">显示</wu-button>
      <wu-popup v-model="state">
          弹出框内容
      </wu-popup>
  </div>
</template>
```

## Props

| 名称 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| title | `string` | `''` | 弹窗标题 |
| minHeight | `string` | `'500rpx'` | 最小高度 |
| maxHeight | `string` | `'calc(100vh - 30rpx)'` | 最大高度 |
| height | `string` | `'40vh'` | 高度 |
| moreNav | `boolean` | - | - |
| showMask | `boolean` | `true` | 显示背景 |
| maskColor | `string` | `'rgba(0, 0, 0, 0.5)'` | 背景颜色 |
| maskClosable | `boolean` | `true` | 允许点击背景关闭 |
| swipeDownClosable | `boolean` | `true` | 允许下滑关闭 |
| duration | `number` | `250` | 动画时间,单位ms |
| showCancel | `boolean` | `true` | 显示取消按钮 |
| cancelText | `string` | `'取消'` | 取消按钮文字 |
| cancelDisabled | `boolean` | - | 取消按钮disabled状态 |
| cancelLoading | `boolean` | - | 取消按钮loading状态 |
| cancelClosable | `boolean` | `true` | 允许点击取消按钮关闭 |
| showConfirm | `boolean` | `true` | 显示确认按钮 |
| confirmText | `string` | `'完成'` | 确认按钮文字 |
| confirmDisabled | `boolean` | - | 确认按钮disabled状态 |
| confirmLoading | `boolean` | - | 确认按钮loading状态 |
| confirmClosable | `boolean` | `true` | 允许点击确认按钮关闭 |
| popupBackground | `string` | `'#ffffff'` | 弹窗内容的背景色 |

## Expose (暴露的方法和属性)

| 名称 | 类型 | 描述 |
|------|------|------|
| cancel | `-` | 取消 |
| confirm | `-` | 确认 |
| getScrollView | `-` | 获取内容的wu-scroll-view实例 |

## Events

| 名称 | 参数 | 描述 |
|------|------|------|
| cancel | - | 点击取消时触发 |
| confirm | - | 点击确认时触发 |

## Slots

| 名称 | 描述 |
|------|------|
| default | 内容部分 |
| more-nav | 还有更多内容的状态指示器 |

