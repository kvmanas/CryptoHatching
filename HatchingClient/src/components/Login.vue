<template>
  <div
    class="modal fade modal-black"
    id="loginmodel"
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
            <h3 class="mb-0">Log in</h3>
          </div>
        </div>
        <div class="modal-body">
          <div class="row justify-content-md-center">
            <div class="col-10">
              <div class="input-group" v-bind:class="{ 'has-danger': isError }">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-key"></i>
                  </span>
                </div>
                <input
                  input
                  v-model="PrvKey"
                  type="text"
                  class="form-control"
                  placeholder="Enter Private Key"
                >
              </div>
              <div class="text-center">
                <button v-on:click="login" type="button" class="btn btn-primary my-4">Sign in</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GetPubKey } from "@/services/login.service";
export default {
  name: "LoginModel",
  data() {
    return {
      PrvKey: "",
      isError: false,
      isLoading: false
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      var PubKey = GetPubKey(this.PrvKey);
      var that = this;
      setTimeout(function() {
        if (PubKey === 0) {
          that.$notification.error("Invalid Private Key", {
            position: "bottomRight",
            showLeftIcn: true,
            showCloseIcn: true,
            timer: 5
          });
          that.isError = true;
        } else {
          localStorage.PrvKey = that.PrvKey;
          localStorage.PubKey = PubKey;
          that.$notification.success("Login Success", {
            position: "bottomRight",
            showCloseIcn: true,
            timer: 5
          });
          $("#loginmodel").modal("hide");
          that.isError = false;
          that.$root.$emit("login-event", true);
        }
        that.isLoading = false;
      }, 3000);
    }
  }
};
</script>
