# wu-test

## 组件描述
This is an example of creating a reusable grid component and using it with external data.

## 组件示例

### example

```html
-1
// 示例1
  <wu-test
    :type="loading"
    :state="open"
  >content</wu-test>
```

### example

```html
-2
// 示例2
  <wu-test
    :type="loading"
    :state="open"
  >content2</wu-test>
```

## Props

| 名称 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| type | `string` | - | 类型 |
| state | `"open" \| "close" \| string` | - | 状态 |

## Expose (暴露的方法和属性)

| 名称 | 类型 | 描述 |
|------|------|------|
| getIsOpened | `function` | 是否打开了 |
| state | `-` | - |

## Slots

| 名称 | 描述 |
|------|------|
| header | 头部插槽 |
| default | 默认的 |
| footer | 脚部插槽 |

