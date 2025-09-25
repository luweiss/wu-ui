# wu-button

## 组件描述
按钮

## 组件示例

### example

```html
<!-- 基础按钮 -->
<wu-button type="default">default</wu-button>
<wu-button type="info">info</wu-button>
<wu-button type="primary">primary</wu-button>
<wu-button type="warning">warning</wu-button>
<wu-button type="danger">danger</wu-button>
```

### example

```html
<!-- 尺寸: size -->
<wu-button type="primary" size="sm">小尺寸</wu-button>
<wu-button type="primary" size="base">默认尺寸</wu-button>
<wu-button type="primary" size="lg">大尺寸</wu-button>
```

### example

```html
<!-- 状态: loading, disabled,  -->
<wu-button type="primary" loading>加载状态</wu-button>
<wu-button type="primary" disabled>禁用状态</wu-button>
```

## Props

| 名称 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| text | `boolean` | `false` | 纯文本按钮，无边框背景 |
| block | `boolean` | `false` | 块级按钮，宽度为 100% |
| radius | `boolean` | `true` | 是否使用圆角，默认是 |
| type | `"default" \| "primary" \| "info" \| "warning" \| "danger"` | `"default"` | 按钮颜色类型，默认是白色按钮 |
| size | `"sm" \| "base" \| "lg"` | `"base"` | 按钮大小 |
| height | `string` | - | 按钮高度 |
| weight | `"normal" \| "lighter" \| "bold"` | `"normal"` | 文本粗细 |
| weak | `boolean` | `false` | 是否弱化按钮，默认否 |
| disabled | `boolean` | `false` | 是否禁用按钮，默认否 |
| loading | `boolean` | `false` | 是否显示加载中状态，默认否 |
| infinity | `boolean` | `false` | 按钮设置为充满父元素宽高，默认否 |
| formType | `string` | - | - |
| openType | `string` | - | - |
| appParameter | `string` | - | - |
| lang | `string` | - | - |
| sessionFrom | `string` | - | - |
| sendMessageTitle | `string` | - | - |
| sendMessagePath | `string` | - | - |
| sendMessageImg | `string` | - | - |
| showMessageCard | `string` | - | - |
| groupId | `string` | - | - |
| guildId | `string` | - | - |
| publicId | `string` | - | - |
| dataImId | `string` | - | - |
| dataImType | `string` | - | - |
| dataGoodsId | `string` | - | - |
| dataOrderId | `string` | - | - |
| dataBizLine | `string` | - | - |

## Events

| 名称 | 参数 | 描述 |
|------|------|------|
| click | - | 点击按钮 |
| getphonenumber | - | 平台开放接口: 获取手机号 |
| getuserinfo | - | 平台开放接口: 获取用户信息 |
| error | - | 平台开放接口: 开放接口出错时 |
| opensetting | - | 平台开放接口: 打开设置 |
| launchapp | - | 平台开放接口: 启动小程序 |
| contact | - | 平台开放接口: 打开客服界面 |
| chooseavatar | - | 平台开放接口: 选择用户头像 |
| agreeprivacyauthorization | - | 平台开放接口: 同意隐私授权 |
| addgroupapp | - | 平台开放接口: 添加小程序到群 |
| chooseaddress | - | 平台开放接口: 选择地址 |
| chooseinvoicetitle | - | 平台开放接口: 选择发票抬头 |
| subscribe | - | 平台开放接口: 订阅消息 |
| login | - | 平台开放接口: 登录 |
| im | - | 平台开放接口: 聊天 |

## Slots

| 名称 | 描述 |
|------|------|
| default | - |

