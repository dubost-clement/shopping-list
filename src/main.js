import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/main.css";
import Fragment from "vue-fragment";
import FontAwesomeIcon from "./configs/fontAwesome";
import Vuelidate from "vuelidate";

Vue.config.productionTip = false;
Vue.use(Fragment.Plugin);
Vue.use(Vuelidate);
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
