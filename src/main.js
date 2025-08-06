import { createApp } from "vue";
import App from "./App.vue";
import "amfe-flexible";
import router from "./router/index";
import store from "./store";
// import "vant/lib/index.css";
import "vant/es/toast/style";
import "vant/es/dialog/style";
import { Toast } from "vant";
import { Dialog } from "vant";
import "./api/mock";

const app = createApp(App);
app.use(router).use(store).use(Toast).use(Dialog);
app.mount("#app");
