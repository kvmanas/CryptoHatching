<template>
  <div id="app">
    <!-- Navbar -->
    <NavigationBar/>
    <!-- End Navbar -->
    <div class="wrapper">
      <router-view name="main"/>
      <Footer/>
    </div>
    <LoginModel/>
    <RegisterModel/>
  </div>
</template>
<script>
import NavigationBar from "@/components/NavigationBar.vue";
import Footer from "@/components/Footer.vue";
import LoginModel from "@/components/Login.vue";
import RegisterModel from "@/components/Register.vue";

// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    NavigationBar,
    Footer,
    LoginModel,
    RegisterModel
  }
};
</script>