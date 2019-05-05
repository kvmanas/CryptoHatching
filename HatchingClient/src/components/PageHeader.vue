<template>
<div>
  <div class="page-header header-filter" :style="style">
    <div class="squares square1"></div>
    <div class="squares square2"></div>
    <div class="squares square3"></div>
    <div class="squares square4"></div>
    <div class="squares square5"></div>
    <div class="squares square6"></div>
    <div class="squares square7"></div>
    <div class="container">
      <div class="content-center brand">
        <h1 class="h1-seo">BLK•</h1>
        <h3>A beautiful Design System for Bootstrap 4. It's Free and Open Source.</h3>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  name: "PageHeader",
  props: {
    fullscreen: Boolean
  },
  computed: {
      style () {
        if(this.fullscreen){
          return (`
            height: 100vh;
            min-height: 100vh;
          `)
        }else{
          return (`
            height: 40vh;
            min-height: 40vh;
          `)
        }
      }
    },
};
</script>
