import Vue from "vue";
import App from "./App.vue";

import YysUI from "../dist/index";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(YysUI.YysButton);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount("#app");
