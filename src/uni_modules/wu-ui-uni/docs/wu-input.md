# wu-input

## 组件描述
输入框

## 组件示例

### example

```html
<script setup>
    import {ref} from 'vue';
    const msg = ref("hello")
</script\>
<template>
  <wu-input v-model="msg"/>
</template>
```

## Props

| 名称 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| withBorder | `boolean` | - | 使用带边框的输入框(默认是透明的) |
| disabled | `boolean` | - | 禁用状态 |
| password | `boolean` | - | 是否是密码输入框 |
| maxlength | `number` | `-1` | 最大长度 |
| placeholder | `string` | - | 提示内容 |
| focus | `boolean` | - | 是否获取焦点 |
| clearable | `boolean` | - | 可一键清除 |
| align | `"left" \| "center" \| "right"` | `"left"` | 文本对齐方式 |
| type | `"text" \| "number" \| "idcard" \| "digit" \| "tel" \| "safe-password" \| "nickname" \| string` | - | 输入类型 |
| confirmType | `"send" \| "search" \| "next" \| "go" \| "done" \| string` | - | 弹出软键盘的右下角按钮的文字。 |
| size | `"sm" \| "base" \| "lg"` | `"base"` | 输入框大小 |

## Events

| 名称 | 参数 | 描述 |
|------|------|------|
| input | event: `Event` - 触发事件 | 当键盘输入时，触发input事件，event.detail = {value} |
| focus | event: `Event` - 触发事件 | 输入框聚焦时触发，event.detail = { value, height }，height 为键盘高度 |
| blur | event: `Event` - 触发事件 | 输入框失去焦点时触发，event.detail = {value: value} |
| confirm | event: `Event` - 触发事件 | 点击完成按钮时触发，event.detail = {value: value} |
| keyboardheightchange | event: `Event` - 触发事件 | 键盘高度发生变化的时候触发此事件，event.detail = {height: height, duration: duration} |

