<template>
  <div class="row container">
    <UnitModel Uname="unit1"/>
    <UnitModel Uname="unit2"/>
    <UnitModel Uname="unit3"/>
    <UnitModel Uname="unit3"/>
    <UnitModel Uname="unit3"/>
  </div>
</template>
<script>
import UnitModel from "@/components/UnitModel.vue";
export default {
  name: "Production",
  components: {
    UnitModel
  }
};
</script>


