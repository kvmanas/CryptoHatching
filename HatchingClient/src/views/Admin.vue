<template>
  <div>
    <PageHeader/>
    <v-card height="50px">
      <v-bottom-nav :active.sync="bottomNav" :color="color" :value="true" absolute dark shift>
        <v-btn dark to="/Admin">
          <span>New Unit</span>
          <i aria-hidden="true" class="v-icon theme--dark fas fa-plus-square"></i>
        </v-btn>

        <v-btn dark to="/Admin/Edit">
          <span>Edit Unit</span>
          <i aria-hidden="true" class="v-icon theme--dark fas fa-edit"></i>
        </v-btn>
      </v-bottom-nav>
    </v-card>
    <router-view name="admin"/>
  </div>
</template>
<script>
import PageHeader from "@/components/PageHeader.vue";
export default {
  name: "Admin",
  data() {
    return {
      bottomNav: 0
    };
  },
  components: {
    PageHeader
  },
  computed: {
    color() {
      switch (this.bottomNav) {
        case 0:
          return "blue-grey";
        case 1:
          return "teal";
        case 2:
          return "brown";
        case 3:
          return "indigo";
      }
    }
  }
};
</script>
