<script setup lang="ts">
import {computed, withDefaults} from 'vue';

/**
 * 按钮
 * @example
 * <!-- 基础按钮 -->
 * <wu-button type="default">default</wu-button>
 * <wu-button type="info">info</wu-button>
 * <wu-button type="primary">primary</wu-button>
 * <wu-button type="warning">warning</wu-button>
 * <wu-button type="danger">danger</wu-button>
 *
 * @example
 * <!-- 尺寸: size -->
 * <wu-button type="primary" size="sm">小尺寸</wu-button>
 * <wu-button type="primary" size="base">默认尺寸</wu-button>
 * <wu-button type="primary" size="lg">大尺寸</wu-button>
 *
 * @example
 * <!-- 状态: loading, disabled,  -->
 * <wu-button type="primary" loading>加载状态</wu-button>
 * <wu-button type="primary" disabled>禁用状态</wu-button>
 *
 */

defineOptions({
    name: 'WuButton',
    options: {
        virtualHost: true,
    },
});

const emit = defineEmits<{
    /**
     * 点击按钮
     */
    click: [e: TouchEvent],

    /**
     *  平台开放接口: 获取手机号
     */
    getphonenumber: [e: any],

    /**
     *  平台开放接口: 获取用户信息
     */
    getuserinfo: [e: any],

    /**
     *  平台开放接口: 开放接口出错时
     */
    error: [e: any],

    /**
     *  平台开放接口: 打开设置
     */
    opensetting: [e: any],

    /**
     *  平台开放接口: 启动小程序
     */
    launchapp: [e: any],

    /**
     *  平台开放接口: 打开客服界面
     */
    contact: [e: any],

    /**
     *  平台开放接口: 选择用户头像
     */
    chooseavatar: [e: any],

    /**
     *  平台开放接口: 同意隐私授权
     */
    agreeprivacyauthorization: [e: any],

    /**
     *  平台开放接口: 添加小程序到群
     */
    addgroupapp: [e: any],

    /**
     *  平台开放接口: 选择地址
     */
    chooseaddress: [e: any],

    /**
     *  平台开放接口: 选择发票抬头
     */
    chooseinvoicetitle: [e: any],

    /**
     *  平台开放接口: 订阅消息
     */
    subscribe: [e: any],

    /**
     *  平台开放接口: 登录
     */
    login: [e: any],

    /**
     *  平台开放接口: 聊天
     */
    im: [e: any],

}>();

const props = withDefaults(defineProps<{
    /**
     * 纯文本按钮，无边框背景
     */
    text?: boolean,

    /**
     * 块级按钮，宽度为 100%
     */
    block?: boolean,

    /**
     * 是否使用圆角，默认是
     */
    radius?: boolean,

    /**
     * 按钮颜色类型，默认是白色按钮
     */
    type?: "default" | "primary" | "info" | "warning" | "danger",

    /**
     * 按钮大小
     */
    size?: "sm" | "base" | "lg",

    /**
     * 按钮高度
     * @example 100rpx
     */
    height?: string,

    /**
     * 文本粗细
     */
    weight?: "normal" | "lighter" | "bold",

    /**
     * 是否弱化按钮，默认否
     */
    weak?: boolean,

    /**
     * 是否禁用按钮，默认否
     */
    disabled?: boolean,

    /**
     * 是否显示加载中状态，默认否
     */
    loading?: boolean,

    /**
     * 按钮设置为充满父元素宽高，默认否
     */
    infinity?: boolean,

    formType?: string,
    openType?: string,
    appParameter?: string,
    lang?: string,
    sessionFrom?: string,
    sendMessageTitle?: string,
    sendMessagePath?: string,
    sendMessageImg?: string,
    showMessageCard?: string,
    groupId?: string,
    guildId?: string,
    publicId?: string,
    dataImId?: string,
    dataImType?: string,
    dataGoodsId?: string,
    dataOrderId?: string,
    dataBizLine?: string,
}>(), {
    text: false,
    block: false,
    radius: true,
    type: "default",
    size: "base",
    weight: "normal",
    weak: false,
    disabled: false,
    loading: false,
    infinity: false,
});

const classes = computed(() => {
    const classes: string[] = [
        'button-' + props.type,
        'button-' + props.size,
    ];
    if (props.radius) {
        classes.push('button-radius');
    }
    if (props.text) {
        classes.push('button-text');
    }
    if (props.block) {
        classes.push('button-block');
    }
    if (props.weight) {
        classes.push('weight-' + props.weight);
    }
    if (props.weak) {
        classes.push('button-weak');
    }
    if (props.disabled) {
        classes.push('button-disabled');
    }
    if (props.loading) {
        classes.push('button-loading');
    }
    if (props.infinity) {
        classes.push('infinity');
    }

    return classes;
});

const buttonStyle = computed(() => {
    const style: Record<any, any> = {};
    if (props.height) {
        style.height = props.height;
    }
    return style;
});

const mixDisabled = computed(() => {
    return props.disabled || props.loading;
});
</script>

<template>
    <button class="button"
            :class="classes"
            :style="buttonStyle"
            :disabled="mixDisabled"
            :loading="props.loading"

            :form-type="props.formType"
            :open-type="props.openType"
            :app-parameter="props.appParameter"
            :lang="props.lang"
            :session-from="props.sessionFrom"
            :send-message-title="props.sendMessageTitle"
            :send-message-path="props.sendMessagePath"
            :send-message-img="props.sendMessageImg"
            :show-message-card="props.showMessageCard"
            :group-id="props.groupId"
            :guild-id="props.guildId"
            :public-id="props.publicId"
            :data-im-id="props.dataImId"
            :data-im-type="props.dataImType"
            :data-goods-id="props.dataGoodsId"
            :data-order-id="props.dataOrderId"
            :data-biz-line="props.dataBizLine"

            @getphonenumber="emit('getphonenumber', $event)"
            @getuserinfo="emit('getuserinfo', $event)"
            @error="emit('error', $event)"
            @opensetting="emit('opensetting', $event)"
            @launchapp="emit('launchapp', $event)"
            @contact="emit('contact', $event)"
            @chooseavatar="emit('chooseavatar', $event)"
            @agreeprivacyauthorization="emit('agreeprivacyauthorization', $event)"
            @addgroupapp="emit('addgroupapp', $event)"
            @chooseaddress="emit('chooseaddress', $event)"
            @chooseinvoicetitle="emit('chooseinvoicetitle', $event)"
            @subscribe="emit('subscribe', $event)"
            @login="emit('login', $event)"
            @im="emit('im', $event)"

            @tap="emit('click', $event)">
        <slot/>
    </button>
</template>

<style scoped lang="scss">
@use "../vars.scss";

$height: vars.$wu-button-size-base;
$heightSm: vars.$wu-button-size-sm;
$heightLg: vars.$wu-button-size-lg;

$fontSize: vars.$wu-font-size-base;
$fontSizeSm: vars.$wu-font-size-sm;
$fontSizeLg: vars.$wu-font-size-lg;

$padding: calc(vars.$wu-button-size-base / 1.5);
$paddingSm: calc(vars.$wu-button-size-sm / 1.5);
$paddingLg: calc(vars.$wu-button-size-lg / 1.5);

$radius: vars.$wu-border-radius;
$radiusSm: vars.$wu-border-radius-sm;
$radiusLg: vars.$wu-border-radius-lg;

.button {
    font-family: inherit;
    font-size: $fontSize;
    display: inline-flex;
    padding: 0 $padding;
    gap: calc(vars.$wu-padding / 3);
    line-height: normal;
    height: $height;
    justify-content: center;
    align-items: center;
    font-weight: normal;
    color: vars.$wu-text-color-base;
    background: #fff;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    border-radius: 0;
    margin: 0;
}

.button::after {
    border: none;
    padding: 0 0;
    margin: 0 0;
    border-radius: 0;
}

.button:active::after {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.15);
}

.button-sm {
    height: $heightSm;
    font-size: $fontSizeSm;
    padding: 0 $paddingSm;
}

.button-lg {
    height: $heightLg;
    font-size: $fontSizeLg;
    padding: 0 $paddingLg;
}

.infinity {
    width: 100%;
    height: 100%;
}

.button-radius {
    border-radius: vars.$wu-border-radius;
}

.button-sm.button-radius {
    border-radius: $radiusSm
}

.button-lg.button-radius {
    border-radius: $radiusLg
}

.button-block {
    display: flex;
    width: 100%;
}

.weight-lighter {
    font-weight: lighter;
}

.weight-bold {
    font-weight: bold;
}

.button-weak {
    opacity: .75;
}

.button-disabled {
    opacity: .5;
}

.button-disabled:active::after {
    display: none;
}

.button-loading::before {
    width: $fontSize;
    height: $fontSize;
    opacity: .7;
}

.button-sm.button-loading::before {
    width: $fontSizeSm;
    height: $fontSizeSm;
}

.button-lg.button-loading::before {
    width: $fontSizeLg;
    height: $fontSizeLg;
}

.button-loading:active::after {
    display: none;
}

.button-info,
.button-info.button-loading,
.button-info.button-disabled {
    background: vars.$wu-color-info;
    color: #fff;
}

.button-primary,
.button-primary.button-loading,
.button-primary.button-disabled {
    background: vars.$wu-color-primary;
    color: #fff;
}

.button-warning,
.button-warning.button-loading,
.button-warning.button-disabled {
    background: vars.$wu-color-warning;
    color: #fff;
}

.button-danger,
.button-danger.button-loading,
.button-danger.button-disabled {
    background: vars.$wu-color-danger;
    color: #fff;
}

.button-text {
    background: none;
    padding: 10rpx 10rpx;
    margin: -10rpx -10rpx;
    height: auto;
}

.button-text.button-default {
    background: none;
    color: vars.$wu-text-color-base;
}

.button-text.button-info {
    background: none;
    color: vars.$wu-color-info;
}

.button-text.button-primary {
    background: none;
    color: vars.$wu-color-primary;
}

.button-text.button-warning {
    background: none;
    color: vars.$wu-color-warning;
}

.button-text.button-danger {
    background: none;
    color: vars.$wu-color-danger;
}
</style>