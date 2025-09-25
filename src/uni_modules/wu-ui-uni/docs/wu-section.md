# wu-section

## 组件描述
一个简单的由标题和内容组成的组件

## 组件示例

### example

```html
<wu-section title="标题">
      主要内容
  </wu-section>
```

## Props

| 名称 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| title | `string` | - | 标题 |
| footer | `string` | - | 底部内容 |
| gap | `string \| number` | - | 子项目间距 |

## Slots

| 名称 | 描述 |
|------|------|
| title | 标题位置 |
| default | 内容位置 |
| footer | 底部位置 |

