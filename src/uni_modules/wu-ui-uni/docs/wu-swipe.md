# wu-swipe

## 组件描述
可以左滑显示隐藏内容的组件

## 组件示例

### example

```html
<script setup>
    import {ref} from 'vue';
    const state = ref(false)
</script\>
<template>
  <div>
      <wu-swipe v-model="state">
          <div>主要内容</div>
          <template #hidden-content>隐藏的内容</template>
      </wu-swipe>
  </div>
</template>
```

## Props

| 名称 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| modelValue | `null` | - | - |
| hiddenWidth | `string|number` | `'30%'` | 隐藏内容宽度 |
| disabled | `boolean` | `false` | 是否禁用 |
| duration | `number` | `300` | 动画的时间,单位ms |

## Events

| 名称 | 参数 | 描述 |
|------|------|------|
| update:modelValue | - | - |

## Slots

| 名称 | 描述 |
|------|------|
| default | 主要内容 |
| hidden-content | 隐藏的内容 |

