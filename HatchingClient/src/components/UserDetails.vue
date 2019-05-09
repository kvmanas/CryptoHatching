<template>
  <div>
    <div class="UserDetails">
      <h4>Public Key : {{PubKey}}</h4>
      <div class="row">
        <div class="col-3">
          <h4>Balance: {{EggBalance}} Eggs</h4>
        </div>
        <div class="col-3">
          <h4>
            Production:
            <b>{{UserData.Production}} Eggs/s</b>
          </h4>
        </div>
        <div class="col-3">
          <h4>Attack: {{UserData.Attack}}</h4>
        </div>
        <div class="col-3">
          <h4>Defence: {{UserData.Defence}}</h4>
        </div>
      </div>
    </div>
    <div
      class="modal fade modal-black"
      id="newuser"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content" v-loading="isLoading">
          <div class="modal-header justify-content-center">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
              <i class="tim-icons icon-simple-remove text-white"></i>
            </button>
            <div class="text-muted text-center ml-auto mr-auto">
              <h3 class="mb-0">New User</h3>
            </div>
          </div>
          <div class="modal-body">
            <div class="row justify-content-md-center">
              <div class="col-10 content-center">
                <h4>Claim Free Training Bird (Production: 1 Egg/s )</h4>
                <div class="text-center">
                  <button v-on:click="ClaimGift" type="button" class="btn btn-primary my-4">Claim</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GetUserDt } from "@/services/user.service";
import GameClient from "@/services/game.service";
export default {
  name: "UserDetails",
  data() {
    return {
      PubKey: null,
      UserData: {
        Production: 0,
        Attack: 0,
        Defence: 0,
        EggBalance: 0,
        LastActivity: 0,
        Birds: {},
        Piggs: {}
      },
      EggBalance: 0,
      Timer: null,
      isLoading: false
    };
  },
  created() {
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
          $("#newuser").modal("show");
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
    },
    async ClaimGift() {
      this.isLoading = true;
      const Gameclient = new GameClient(localStorage.PrvKey);
      let response = await Gameclient.ClaimGift();
      var that = this;
      setTimeout(async function() {
        that.$swal({
          type: "success",
          title: "Success!!",
          text: "Successfull"
        });
        that.$root.$emit("login-event", true);
        that.isLoading = false;
        $("#newuser").modal("hide");
      }, 5000);
    }
  }
};
</script>
<style scoped>
.UserDetails {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #1d8cf8;
  color: white;
  text-align: center;
  z-index: 1;
}
</style>
