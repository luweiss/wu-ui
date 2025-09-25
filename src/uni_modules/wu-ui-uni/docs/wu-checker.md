# wu-checker

## 组件描述
单选、多选、开关

## 组件示例

### example

```html
<!-- 默认多选样式 -->
  <wu-checker v-model="true"/>
```

### example

```html
<!-- 单选样式 -->
  <wu-checker v-model="true" circle/>
```

### example

```html
<!-- 开关样式 -->
  <wu-checker v-model="true" switch/>
```

## Props

| 名称 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| disabled | `boolean` | - | 是否禁用 |
| trueValue | `any` | `true` | 激活状态的值 |
| falseValue | `any` | `false` | 非激活状态的值 |
| circle | `boolean` | - | 圆形样式(radio样式) |
| switch | `boolean` | - | 开关样式 |

## Events

| 名称 | 参数 | 描述 |
|------|------|------|
| change | value: `any` - 改变后的值 | 状态发生改变时 |

