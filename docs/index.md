# WuUi文档

用于uni-app的一些UI组件，需要vue3.

## 使用说明
#### 1.安装
```shell
npm install wu-ui@^1.0.0
```

#### 2.配置src/pages.json
```json
{
    "easycom": {
        "autoscan": true,
        "custom": {
            "^wu-(.*)": "@luweiss/wu-ui/src/components/wu-$1/wu-$1.vue"
        }
    }
}
```

#### 3.开始使用
```vue
<wu-button type="primary">test</wu-button>
```


## 组件列表

- [wu-button](wu-button.md)
  按钮

- [wu-cell](wu-cell.md)
  以列表的方式展示内容的组件，通常配合wu-cell-group使用

- [wu-cell-group](wu-cell-group.md)
  配合wu-cell使用

- [wu-checker](wu-checker.md)
  单选、多选、开关

- [wu-icon](wu-icon.md)
  使用iconfont图标

- [wu-input](wu-input.md)
  输入框

- [wu-input-number](wu-input-number.md)
  数字输入框

- [wu-popup](wu-popup.md)
  半屏弹出框，从页面底部弹出

- [wu-scroll-view](wu-scroll-view.md)
  滚动内容

- [wu-section](wu-section.md)
  一个简单的由标题和内容组成的组件

- [wu-swipe](wu-swipe.md)
  可以左滑显示隐藏内容的组件

- [wu-test](wu-test.md)
  This is an example of creating a reusable grid component and using it with external data.

