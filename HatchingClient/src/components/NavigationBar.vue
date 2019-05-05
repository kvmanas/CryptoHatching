<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-transparent" color-on-scroll="100">
    <div class="container">
      <div class="navbar-translate">
        <router-link class="navbar-brand" to="/">
          <span>Crypto•</span> Hatching
        </router-link>
        <button
          class="navbar-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navigation"
          aria-controls="navigation-index"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse justify-content-end" id="navigation">
        <div class="navbar-collapse-header">
          <div class="row">
            <div class="col-6 collapse-brand">
              <a>BLK•</a>
            </div>
            <div class="col-6 collapse-close text-right">
              <button
                type="button"
                class="navbar-toggler"
                data-toggle="collapse"
                data-target="#navigation"
                aria-controls="navigation-index"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i class="tim-icons icon-simple-remove"></i>
              </button>
            </div>
          </div>
        </div>
        <ul class="navbar-nav">
          <li class="nav-item p-0" v-if="isLogged">
            <button class="nav-link" v-on:click="logout">
              <i class="fas fa-sign-out-alt"></i>Log Out
            </button>
          </li>
          <li class="nav-item p-0" v-if="!isLogged">
            <button class="nav-link" data-toggle="modal" data-target="#loginmodel">
              <i class="fas fa-sign-in-alt"></i>Login
            </button>
          </li>
          <li class="nav-item p-0" v-if="!isLogged">
            <button class="nav-link" data-toggle="modal" data-target="#registermodel">
              <i class="fas fa-user-plus"></i>Register
            </button>
          </li>
          <li class="nav-item p-0" v-if="isLogged">
            <router-link class="nav-link" to="/Admin">
              <i class="fas fa-users-cog"></i>Admins
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavigationBar",
  data() {
    return {
      isLogged: false
    };
  },
  props: {
    msg: String
  },
  created() {
    if (localStorage.PrvKey && localStorage.PubKey) {
      this.isLogged = true;
    }
    this.$root.$on("login-event", data => {
      this.isLogged = data;
    });
  },
  methods: {
    logout() {
      localStorage.removeItem("PrvKey");
      localStorage.removeItem("PubKey");
      this.$root.$emit("login-event", false);
    }
  }
};
</script>
<style scoped>
.container {
  padding: 10px;
}
</style>
