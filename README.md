# wu-ui

Uni-App(Vue)平台的UI组件库。
UI component library for Uni-App(Vue) platform. 

### 1.安装(Install)
```shell
npm install wu-ui
```

### 2.配置src/pages.json(Configuration)
```json
{
    "easycom": {
        "autoscan": true,
        "custom": {
            "^wu-(.*)": "wu-ui/src/components/wu-$1/wu-$1.vue"
        }
    }
}
```

### 3.使用(Usage)
```vue
<!-- 因为配置了pages.json->easycom，所以页面中不要使用import导入。 -->
<wu-button type="primary">test</wu-button>
```

# 更详细的文档

[详细的组件文档](docs/index.md)