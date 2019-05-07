<template>
  <div class="unitmodel col-lg-4 col-md-6 ml-auto mr-auto">
    <div class="card card-coin card-plain">
      <div class="card-header">
        <img
          :src="UnitData[1]"
          width="150"
          height="150"
          class="img-center img-fluid rounded-circle"
        >
        <h4 class="title">{{UnitData[4]}}</h4>
        <p class="card-category unitpower">3/99</p>
      </div>
      <div class="card-body">
        <div class="container buyunit">
          <h4 class="unitpower">
            <p>Makes: 40 eggs/s</p>
            <p class="unitcost">Cost: {{UnitData[5]}} eggs</p>
          </h4>
          <div class="row">
            <div class="col-9">
              <div class="form-group">
                <input type="text" value placeholder="Amount" class="form-control">
              </div>
            </div>
            <!-- <div class="col-3">
              <button class="btn maxbtn">max</button>
            </div>-->
          </div>
          <button class="btn buybtn">Buy</button>
        </div>
        <div class="card upper bg-default">
          <div class="card-body">
            <div class="row">
              <div class="col-2">
                <div class="icon-big text-center icon-warning">
                  <i class="fas fa-wrench text-white"></i>
                </div>
              </div>
              <div class="col-5">
                <div>
                  <p class="card-title">+10% Production</p>
                  <p class="card-category tupgrade">3/3</p>
                </div>
              </div>
              <div class="col-5">
                <div>
                  <button class="btn btn-info">Buy</button>
                  <p class="card-category">2000 eggs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card upper bg-default">
          <div class="card-body">
            <div class="row">
              <div class="col-2">
                <div class="icon-big text-center icon-warning">
                  <i class="tim-icons icon-coins text-white"></i>
                </div>
              </div>
              <div class="col-5">
                <div>
                  <p class="card-title">99 max unit</p>
                  <p class="card-category tupgrade">1/4</p>
                </div>
              </div>
              <div class="col-5">
                <div>
                  <button class="btn btn-info">Buy</button>
                  <p class="card-category">2000 eggs</p>
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
export default {
  name: "UnitModel",
  props: {
    UnitData: Array
  }
};
</script>
<style scoped>
.card-header {
  margin-bottom: 0px !important;
}
.unitmodel {
  padding-top: 90px;
  padding-bottom: 20px;
}
.title {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 5px;
  font-size: 26px !important;
}
.icon-big {
  font-size: 3em;
  min-height: 64px;
}
.card-category {
  color: #9a9a9a;
  font-size: 16px;
  line-height: 1.4em;
}
.numbers {
  text-align: right;
  font-size: 2em;
}
.card-title,
.tupgrade {
  text-align: center;
}
.card-title {
  font-size: 16px;
}
.card-category {
  font-size: 14px;
}
.unitpower {
  text-align: center;
  font-weight: bold !important;
  font-size: 16px !important;
}
.buyunit {
  border: 1px solid #e14eca;
  margin-bottom: 20px;
}
.maxbtn {
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 0px;
}
.buybtn {
  width: 100%;
  background-image: linear-gradient(
    to bottom left,
    #42b91d,
    #2d8627,
    #4d8a14de
  );
}
.buybtn:hover {
  background-image: linear-gradient(
    to bottom left,
    #0e3303,
    #0c3309,
    #1d3a01de
  ) !important;
}
.unitcost {
  color: #e62828;
  font-weight: bold;
}
</style>


