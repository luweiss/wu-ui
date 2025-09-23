var state = null;

function stateInit(e, ownerInstance) {
    state = e.instance.getState();
    if (state.isDisabled === undefined) {
        var isDisabled = e.instance.getDataset().disabled;
        isDisabled = isDisabled !== undefined && (isDisabled === 'true' || isDisabled === true);
        state.isDisabled = isDisabled;
    }
    if (state.duration === undefined) {
        state.duration = parseInt(e.instance.getDataset().duration);
    }
    if (state.hiddenDom === undefined) {
        state.hiddenDom = ownerInstance.$el.querySelector('.hidden-content');
    }
    state.startEvent = state.startEvent !== undefined ? state.startEvent : null;
    state.isTouchStart = state.isTouchStart !== undefined ? state.isTouchStart : false;
    state.isTouchMoving = state.isTouchMoving !== undefined ? state.isTouchMoving : false;
    state.movingDirection = state.movingDirection !== undefined ? state.movingDirection : null;
    state.isShown = state.isShown !== undefined ? state.isShown : false;
    state.maxMoveValue = state.maxMoveValue !== undefined ? state.maxMoveValue : 100;
    state.renderMoveValue = state.renderMoveValue !== undefined ? state.renderMoveValue : 0;
    state.hiddenDom = state.hiddenDom !== undefined ? state.hiddenDom : null;
}

function getMoveValue(val, base, max) {
    var i = 2; // 取值必须>1，在2左右时滑动比较舒适
    var sub = 0 - (val + base);
    var append = sub;
    if (sub > i) {
        append = i + sub / i;
    }
    return -max - append;
}

function onTouchStart(e, ownerInstance) {
    // console.log('onTouchStart->', e, ownerInstance);
    stateInit(e, ownerInstance);
    if (state.isDisabled) return;
    state.maxMoveValue = parseFloat("" + e.instance.getDataset().maxMoveValue);
    state.isTouchStart = true;
    state.startEvent = e;
    updateStyle(e.instance, ownerInstance, true);
}

function onTouchMove(e, ownerInstance) {
    stateInit(e, ownerInstance);
    if (state.isDisabled) return;
    if (state.movingDirection === 'v') {
        return true;
    }
    var moveX = e.touches[0].clientX - state.startEvent.touches[0].clientX;
    var moveY = e.touches[0].clientY - state.startEvent.touches[0].clientY;
    if (!state.isTouchMoving && Math.abs(moveY) > Math.abs(moveX)) { // 纵向滑动，不处理
        state.movingDirection = 'v';
        return true;
    } else {
        state.movingDirection = 'h';
    }
    state.isTouchMoving = true;
    if (!state.isShown) { // 关闭状态时
        if (moveX < 0) { // 向左滑动
            if (moveX > -state.maxMoveValue) { // 还未到阀值
                state.renderMoveValue = moveX;
            } else { // 已到阀值，使用弹性效果
                state.renderMoveValue = getMoveValue(moveX, state.maxMoveValue, state.maxMoveValue);
            }
            // console.log('moveClientX->', moveClientX.value);
        } else { // 向右滑动
            // 不做处理
        }
    } else { // 打开状态时
        if (moveX < 0) { // 向左滑动
            state.renderMoveValue = getMoveValue(moveX, 0, state.maxMoveValue);
        } else { // 向右滑动
            // console.log('swipe val->', valX);
            if (moveX < state.maxMoveValue) {  // 还未到阀值
                state.renderMoveValue = -state.maxMoveValue + moveX;
            } else { // 已到阀值，不使用任何效果
                state.renderMoveValue = 0;
            }
        }
    }
    updateStyle(e.instance, ownerInstance, false);
    if (e.preventDefault) e.preventDefault();
    return false;
}

function onTouchEnd(e, ownerInstance) {
    stateInit(e, ownerInstance);
    if (state.isDisabled) return;
    state.isTouchStart = false;
    state.isTouchMoving = false;
    state.movingDirection = null;

    if (!state.isShown) { // 关闭状态时
        if (state.renderMoveValue < -(state.maxMoveValue / 2)) { // 向左滑超过启动值，打开
            state.renderMoveValue = -state.maxMoveValue;
            state.isShown = true;
        } else { // 滑得太少，关闭
            state.renderMoveValue = 0;
        }
    } else { // 打开状态时
        if (state.renderMoveValue < -state.maxMoveValue) { // 继续向左滑
            state.renderMoveValue = -state.maxMoveValue;
        } else if (state.renderMoveValue > -state.maxMoveValue) { // 向右滑
            state.renderMoveValue = 0;
            state.isShown = false;
        }
    }
    updateStyle(e.instance, ownerInstance, true);
    if (ownerInstance.updateShownState) {
        ownerInstance.updateShownState({isShown: state.isShown});
    } else {
        ownerInstance.callMethod('updateShownState', {isShown: state.isShown});
    }
}

function shownChange(newValue, oldValue, ownerInstance, instance) {
    // instance: 滑动对象（样式设置在此实例）
    // ownerInstance: 组件实例
    stateInit({instance: instance}, ownerInstance);
    if (newValue === true) { // 打开操作
        state.renderMoveValue = -state.maxMoveValue;
        state.isShown = true;
    } else { // 关闭操作
        state.renderMoveValue = 0;
        state.isShown = false;
    }
    updateStyle(instance, ownerInstance, true);
}

function updateStyle(instance, ownerInstance, animation) {
    instance.setStyle({
        'transition-duration': state.duration + 'ms',
        'transition-property': animation ? 'transform' : 'none',
        'transform': 'translateX(' + state.renderMoveValue + 'px)',
    });
    if (state.hiddenDom.style) {
        state.hiddenDom.style.transitionDuration = state.duration + 'ms';
        state.hiddenDom.style.transitionProperty = animation ? 'width' : 'none';
        state.hiddenDom.style.width = -state.renderMoveValue + 'px';
    } else {
        state.hiddenDom.setStyle({
            'transition-duration': state.duration + 'ms',
            'transition-property': animation ? 'width' : 'none',
            'width': -state.renderMoveValue + 'px',
        });
    }
}

export default {
    onTouchStart: onTouchStart,
    onTouchMove: onTouchMove,
    onTouchEnd: onTouchEnd,
    shownChange: shownChange,
};
