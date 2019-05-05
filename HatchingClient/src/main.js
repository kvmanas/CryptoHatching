import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueNotification from "@kugatsu/vuenotification";
import VueLoading from "vue2-loading";

Vue.config.productionTip = false;

Vue.use(VueNotification, {
  timer: 5
});
Vue.use(VueLoading, {
  text: "Ḷoading..",
  bg: "rgba(230, 233, 236, 0.8)",
  textColor: "#000",
  spinnerClass: "fa fa-spin fa-spinner fa-3x"
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
