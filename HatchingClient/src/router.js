import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Admin from "./views/Admin.vue";
import Production from "@/components/Production.vue";
import Barracks from "@/components/Barracks.vue";
import NewUnit from "@/components/NewUnit.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      components: {
        main: Home
      },
      children: [
        {
          path: "/",
          components: {
            game: Production
          }
        },
        {
          path: "/Barracks",
          components: {
            game: Barracks
          }
        }
      ]
    },
    {
      path: "/Admin",
      components: {
        main: Admin
      },
      children: [
        {
          path: "/Admin",
          components: {
            admin: NewUnit
          }
        }
      ]
    }
  ]
});
