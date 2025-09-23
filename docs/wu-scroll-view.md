# wu-scroll-view

## 组件描述
滚动内容

## 组件示例

### example

```html
<wu-scroll-view>
      主要内容
  </wu-scroll-view>
```

## Props

| 名称 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| scrollY | `boolean` | `true` | 允许Y轴滚动 |
| scrollX | `boolean` | - | 允许X轴滚动 |
| scrollTop | `number` | `0` | 滚动位置距离顶部 |
| scrollWithAnimation | `boolean` | `true` | 滚动时使用动画 |
| animationDuration | `number` | `250` | 滚动动画时间 |
| customStyle | `Record \| any` | - | 自定义样式 |
| contentStyle | `Record \| any` | - | 内容部分自定义样式 |
| hideScrollBar | `boolean` | - | 隐藏滚动条 |

## Expose (暴露的方法和属性)

| 名称 | 类型 | 描述 |
|------|------|------|
| scrollTo | `-` | 滚动到指定位置,scrollTo(100) |
| updateScrollHeight | `-` | 更新滚动组件高度,updateScrollHeight().then(height=>{}); |
| getScrollHeight | `-` | 获取滚动高度,getScrollHeight().then(height=>{}); |
| scrollTop | `-` | 当前滚动位置 |

## Events

| 名称 | 参数 | 描述 |
|------|------|------|
| scroll | event: `Event` - 触发事件 | 滚动时触发 |
| scrolltoupper | event: `Event` - 触发事件 | 滚动到顶部时触发 |
| scrolltolower | event: `Event` - 触发事件 | 滚动到底部时触发 |

## Slots

| 名称 | 描述 |
|------|------|
| default | - |

