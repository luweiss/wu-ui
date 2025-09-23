## 使用说明
#### 1.安装
```shell
npm install wu-ui-uni@^1.0.0
```

#### 2.配置src/pages.json
```json
{
    "easycom": {
        "autoscan": true,
        "custom": {
            "^wu-(.*)": "wu-ui-uni/src/components/wu-$1/wu-$1.vue"
        }
    }
}
```

#### 3.开始使用
```vue
<wu-button type="primary">test</wu-button>
```
