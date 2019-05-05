<template>
  <div>
    <PageHeader fullscreen/>
    <MainComponent/>
    <UserDetails/>
  </div>
</template>

<script>
import MainComponent from "@/components/MainComponent";
import PageHeader from "@/components/PageHeader.vue";
import UserDetails from "@/components/UserDetails.vue";

// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    MainComponent,
    PageHeader,
    UserDetails
  },
  created() {
    document.title = "Look ok!";
    var metaTag = document.createElement("meta");
    metaTag.name = "description";
    metaTag.content =
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0";
    document.getElementsByTagName("head")[0].appendChild(metaTag);
  }
};
</script>
