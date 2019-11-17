import Vue from "vue";
import App from "./App.vue";

import YysUI from "../src/main";
import "../dist/assets/styles/index.css";

console.log("YysUI", YysUI);
Vue.use(YysUI.YysButton);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount("#app");
