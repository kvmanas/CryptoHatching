<template>
  <div>
    <v-card color="#171941" v-loading="isLoad">
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex v-for="(user, index) in Users" :key="index" sm8 offset-sm2 class="pa-3">
            <v-card color="blue-grey darken-2" class="white--text">
              <v-layout>
                <v-flex sm3>
                  <v-img src="/assets/img/s-l640.jpg" height="60px" contain></v-img>
                </v-flex>
                <v-flex sm6>
                  <v-card-title primary-title>
                    <div>
                      <div>{{user.PubKey}}</div>
                      <div>EggBalance :{{UserEggs(index)}}</div>
                      <div>Attack :{{user.Attack}}</div>
                      <div>Defence:{{user.Defence}}</div>
                    </div>
                  </v-card-title>
                </v-flex>
                <v-flex sm3>
                  <v-btn v-on:click="AttackUser(index)" dark color="indigo">Attack</v-btn>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <div
      class="modal fade modal-black"
      id="attacklog"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header justify-content-center">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
              <i class="tim-icons icon-simple-remove text-white"></i>
            </button>
            <div class="text-muted text-center ml-auto mr-auto">
              <h3 class="mb-0">Attack Log</h3>
            </div>
          </div>
          <div class="modal-body">
            <div class="row justify-content-md-center">
              <div class="col-10 content-center">
                <h4>{{AttackStatus}}</h4>
                <div class="text-center">
                  <a
                    target="_blank"
                    :href="ReceiptLink"
                    type="button"
                    class="btn btn-primary my-4"
                  >Receipt</a>
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
import { UserList, GetUserDt, GetReceipt } from "@/services/user.service";
import GameClient from "@/services/game.service";
export default {
  name: "Arena",
  data() {
    return {
      Users: [],
      isLoad: false,
      AttackStatus: null,
      ReceiptLink: null,
      UserData: null
    };
  },
  computed: {},
  async created() {
    var UsersObj = await UserList();
    this.Users = UsersObj.filter(function(obj) {
      return obj.PubKey !== localStorage.PubKey;
    });
    console.log(this.Users);
    this.$root.$on("login-event", async data => {
      var UsersObj = await UserList();
      this.Users = UsersObj.filter(function(obj) {
        return obj.PubKey !== localStorage.PubKey;
      });
    });
  },
  methods: {
    UserEggs(index) {
      var Usr = this.Users[index];
      var seconds = Math.floor((Date.now() - Usr.LastActivity) / 1000);
      return Usr.EggBalance + seconds * Usr.Production;
    },
    async AttackUser(index) {
      this.isLoad = true;
      var ThisUser = this.Users[index];
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Attack!"
      }).then(async result => {
        if (result.value) {
          let formdata = [ThisUser.PubKey];
          const Gameclient = new GameClient(localStorage.PrvKey);
          let response = await Gameclient.AttackUser(formdata);
          var that = this;
          setTimeout(async function() {
            that.UserData = await GetUserDt(localStorage.PubKey);
            that.ReceiptLink =
              "/api/receipts?id=" +
              that.UserData.Attacklogs[that.UserData.NoAttacks];
            that.AttackStatus = await GetReceipt(that.ReceiptLink);
            $("#attacklog").modal("show");
            that.$root.$emit("login-event", true);
            that.isLoad = false;
          }, 5000);
        } else {
          this.isLoad = false;
        }
      });
    }
  }
};
</script>
