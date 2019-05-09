<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <h1 class="title">Crypto•Hatching</h1>
        </div>
        <div class="col-md-3"></div>
        <div class="col-md-3"></div>
        <div class="col-md-3">
          <h3 class="title">Follow us:</h3>
          <div class="btn-wrapper profile">
            <a
              target="_blank"
              href="#"
              class="btn btn-icon btn-neutral btn-round btn-simple"
              data-toggle="tooltip"
              data-original-title="Follow us"
            >
              <i class="fab fa-twitter"></i>
            </a>
            <a
              target="_blank"
              href="#"
              class="btn btn-icon btn-neutral btn-round btn-simple"
              data-toggle="tooltip"
              data-original-title="Like us"
            >
              <i class="fab fa-facebook-square"></i>
            </a>
            <a
              target="_blank"
              href="#"
              class="btn btn-icon btn-neutral btn-round btn-simple"
              data-toggle="tooltip"
              data-original-title="Follow us"
            >
              <i class="fab fa-dribbble"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  props: {
    msg: String
  }
};
</script>