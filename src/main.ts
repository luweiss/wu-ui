import {createSSRApp} from "vue";
import App from "./App.vue";
import WuTest from './components/wu-test/wu-test.vue';

export function createApp() {
    const app = createSSRApp(App);
    
    app.component('wu-test', WuTest);

    return {
        app,
    };
}
