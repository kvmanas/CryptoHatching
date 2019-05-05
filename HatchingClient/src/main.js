import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLoading from "vue2-loading";
import VueSweetalert2 from "vue-sweetalert2";

Vue.config.productionTip = false;

Vue.use(VueLoading, {
  text: "Ḷoading..",
  bg: "rgba(230, 233, 236, 0.8)",
  textColor: "#000",
  spinnerClass: "fa fa-spin fa-spinner fa-3x"
});
Vue.use(VueSweetalert2);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
