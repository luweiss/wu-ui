# wu-cell

## 组件描述
以列表的方式展示内容的组件，通常配合wu-cell-group使用

## 组件示例

### example

```html
<!-- 基础 -->
<wu-cell-group>
    <wu-cell label="姓名">张三丰</wu-cell>
    <wu-cell label="年龄">100</wu-cell>
</wu-cell-group>
```

### example

```html
<!-- 图标: prefixIcon(左侧图标),suffixIcon(右侧图标),showArrow(箭头) -->
<wu-cell-group>
    <wu-cell label="标签" prefixIcon="love-filling">图标在左侧</wu-cell>
    <wu-cell label="标签" suffixIcon="love-filling">图标在右侧</wu-cell>
    <wu-cell label="标签" showArrow>箭头图标</wu-cell>
</wu-cell-group>
```

### example

```html
<!-- 链接: url(页面链接),urlParams(链接参数) -->
<wu-cell-group>
    <wu-cell label="标签" url=“/pages/index/index” :urlParams="{id: 1}">跳转到主页</wu-cell>
</wu-cell-group>
```

### example

```html
<!-- 左滑显示隐藏的内容 -->
<wu-cell-group>
    <wu-cell swipe-enabled>
        主要内容
        <template #hidden-content>隐藏的内容</template>
    </wu-cell>
</wu-cell-group>
```

## Props

| 名称 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| prefixIcon | `string` | - | 左侧图标，可选值同wu-icon.icon属性 |
| label | `string` | - | 左侧文本 |
| content | `string` | - | 主要内容 |
| suffixIcon | `string` | - | 右侧图标，可选值同WuIcon.icon属性 |
| showArrow | `boolean` | - | 是否显示向右箭头 |
| url | `string` | - | 点击跳转的链接 |
| urlParams | `any` | - | 跳转的链接参数 |
| feedback | `boolean` | `true` | 点击反馈效果 |
| error | `boolean` | - | 是否显示错误信息 |
| errorMessage | `string` | - | 错误信息 |
| swipeEnabled | `boolean` | - | 是否开启左滑显示隐藏内容 |
| swipeWidth | `string \| number` | - | 左滑显示宽度，单位rpx，或百分比 |
| autoCloseSwipe | `boolean` | `true` | 是否自动关闭左滑 |
| swipeDuration | `number` | `300` | 左滑动画时间，单位ms |

## Expose (暴露的方法和属性)

| 名称 | 类型 | 描述 |
|------|------|------|
| index | `-` | 当前cell所在的cell-group的索引位置 |
| swipeState | `-` | 左滑组件的状态 |

## Events

| 名称 | 参数 | 描述 |
|------|------|------|
| click | - | 点击事件 |

## Slots

| 名称 | 描述 |
|------|------|
| hidden-content | 隐藏的内容，左滑时显示 |
| header | cell的上面部分 |
| prefixIcon | 左侧图标 |
| label | label位置 |
| default | 主要内容 |
| suffixIcon | 右侧图标 |
| footer | cell的下面部分 |

