# wu-cell-group

## 组件描述
配合wu-cell使用

## 组件示例

### example

```html
<wu-cell-group>
      <wu-cell label="姓名">张三丰</wu-cell>
      <wu-cell label="年龄">100</wu-cell>
  </wu-cell-group>
```

## Props

| 名称 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| title | `string` | - | 标题 |
| titleSuffix | `string` | - | 标题右侧内容 |
| labelWidth | `string` | - | 所有子组件wu-cell.label的宽度 |
| radius | `boolean` | - | 内容部分显示圆角边框 |
| footer | `string` | - | 底部内容 |
| background | `string` | - | 内容背景颜色 |
| usePadding | `boolean` | - | 内容部分使用内边距 |

## Events

| 名称 | 参数 | 描述 |
|------|------|------|
| click | - | 点击事件 |

## Slots

| 名称 | 描述 |
|------|------|
| title | 标题 |
| titleSuffix | 标题右侧内容 |
| default | 主要内容，一般是wu-cell |
| footer | 底部位置 |

