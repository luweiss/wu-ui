# wu-input-number

## 组件描述
数字输入框

## 组件示例

### example

```html
<script setup>
    import {ref} from 'vue';
    const val = ref(0)
</script\>
<template>
  <wu-input-number v-model="val"/>
</template>
```

## Props

| 名称 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| disabled | `boolean` | - | 是否禁用 |
| step | `number` | `1` | 步长 |
| min | `number \| boolean` | - | 允许的最小值 |
| max | `number \| boolean` | - | 允许的最大值 |
| size | `"sm" \| "base" \| "lg"` | `"base"` | 按钮大小 |
| type | `"default" \| "primary" \| "info" \| "warning" \| "danger"` | `"info"` | 按钮颜色类型，默认是白色按钮 |

