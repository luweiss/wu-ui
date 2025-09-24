import {createSSRApp} from "vue";
// @ts-ignore
import App from "./App.vue";

export function createApp() {
    const app = createSSRApp(App);

    return {
        app,
    };
}
