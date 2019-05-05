<template>
  <div class="UserDetails">
    <h4>Public Key : {{PubKey}}</h4>
    <div class="row">
      <div class="col-3">
        <h4>Balance: 1000 egg</h4>
      </div>
      <div class="col-3">
        <h4>
          Production:
          <b>1000 egg/s</b>
        </h4>
      </div>
      <div class="col-3">
        <h4>Attack: 1000 egg/s</h4>
      </div>
      <div class="col-3">
        <h4>Defence: 1000 egg/s</h4>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserDetails",
  data() {
    return {
      PubKey: null
    };
  },
  created() {
    if (localStorage.PrvKey && localStorage.PubKey) {
      this.PubKey = localStorage.PubKey;
    }
    this.$root.$on("login-event", data => {
      if (data) {
        this.PubKey = localStorage.PubKey;
      }
    });
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
