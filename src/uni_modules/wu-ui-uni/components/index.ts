/// <reference types='@dcloudio/types' />
import api from "./api";

declare module 'vue' {
    export interface GlobalComponents {
        WuButton: typeof import('./wu-button/wu-button.vue')['default'];
        WuCell: typeof import('./wu-cell/wu-cell.vue')['default'];
        WuCellGroup: typeof import('./wu-cell-group/wu-cell-group.vue')['default'];
        WuChecker: typeof import('./wu-checker/wu-checker.vue')['default'];
        WuIcon: typeof import('./wu-icon/wu-icon.vue')['default'];
        WuInput: typeof import('./wu-input/wu-input.vue')['default'];
        WuInputNumber: typeof import('./wu-input-number/wu-input-number.vue')['default'];
        WuPopup: typeof import('./wu-popup/wu-popup.vue')['default'];
        WuScrollView: typeof import('./wu-scroll-view/wu-scroll-view.vue')['default'];
        WuSection: typeof import('./wu-section/wu-section.vue')['default'];
        WuSwipe: typeof import('./wu-swipe/wu-swipe.vue')['default'];
    }
}

export {
    api as WuApi
}

export {}
