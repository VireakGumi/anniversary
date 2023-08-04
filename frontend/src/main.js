import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import http from './axios-http.js';
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/dist/vuetify.min.css";

// import { loadFonts } from "./plugins/webfontloader";
import "@mdi/font/css/materialdesignicons.css";
// import { mdiCog } from '@mdi/js'
const vuetify = createVuetify({
  
  iconfont: "mdi",
  components,
  directives,
});

const app = createApp(App);
app.config.globalProperties.$http = http;
import NavBar from "./components/NavBar/NavigationBar.vue";
app.component("navigation-bar", NavBar);
app.use(vuetify).use(router).mount("#app");
