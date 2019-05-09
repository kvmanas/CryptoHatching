<template>
  <div class="row container">
    <PrdUnitModel
      v-for="(item, index) in PrdUnits"
      :key="item[0]"
      :UnitData="PrdUnits[index]"
      :UserData="UserData.Birds"
      :EggBalance="EggBalance"
    />
  </div>
</template>
<script>
import PrdUnitModel from "@/components/PrdUnitModel.vue";
import { GetUserDt, GetPrdUnits } from "@/services/user.service";
import GameClient from "@/services/game.service";

export default {
  name: "Production",
  components: {
    PrdUnitModel
  },
  data() {
    return {
      PrdUnits: [],
      UserData: {
        Production: 0,
        Attack: 0,
        Defence: 0,
        EggBalance: 0,
        LastActivity: 0,
        Birds: {},
        Piggs: {}
      },
      isLoading: false,
      EggBalance: 0
    };
  },
  async created() {
    this.PrdUnits = await GetPrdUnits();
    if (localStorage.PrvKey && localStorage.PubKey) {
      this.UserLogged(true);
    }
    this.$root.$on("login-event", data => {
      this.UserLogged(data);
    });
  },
  methods: {
    async UserLogged(data) {
      if (data) {
        this.PubKey = localStorage.PubKey;
        this.UserData = await GetUserDt(this.PubKey);
        if (this.UserData.length === 0) {
          // $("#newuser").modal("show");
        } else {
          var that = this;
          var timerID = setInterval(function() {
            var seconds = Math.floor(
              (Date.now() - that.UserData.LastActivity) / 1000
            );
            that.EggBalance =
              that.UserData.EggBalance + seconds * that.UserData.Production;
          }, 1000);
        }
      }
    }
  }
};
</script>


