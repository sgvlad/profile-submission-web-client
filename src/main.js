import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import { VuesticPlugin } from "vuestic-ui";
import { io } from "socket.io-client";

const app = createApp(App);
app.config.globalProperties.$http = axios;
app.config.globalProperties.$socket = io("/");
app.use(VuesticPlugin);
app.use(router).mount("#app");
