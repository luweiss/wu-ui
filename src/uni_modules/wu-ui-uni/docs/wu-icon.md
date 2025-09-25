# wu-icon

## 组件描述
使用iconfont图标

## 组件示例

### example

```html
<wu-icon icon="love-filling"/>
```

## Props

| 名称 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| icon | `string` | - | 图标, 可选值见文档或演示项目 |
| weight | `"normal" \| "bold" \| "bolder" \| "light" \| "inherit" \| string \| number` | `'normal'` | 对应 css font-weight 属性 |
| loading | `boolean` | `false` | 是否进入加载状态(动画旋转图标) |
| size | `string` | - | 对应 css font-size 属性 |
| type | `"default" \| "primary" \| "info" \| "warning" \| "danger" \| "light"` | - | 图标颜色类型，默认是文字默认颜色 |
| color | `string` | - | 图标颜色，将覆盖掉type属性 |
| customStyle | `any` | - | 自定义样式 |

