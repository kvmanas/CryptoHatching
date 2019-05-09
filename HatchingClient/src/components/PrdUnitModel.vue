<template>
  <div class="unitmodel col-lg-4 col-md-6 ml-auto mr-auto" v-loading="isLoading">
    <div class="card card-coin card-plain">
      <div class="card-header">
        <img
          :src="UnitData[1]"
          width="150"
          height="150"
          class="img-center img-fluid rounded-circle"
        >
        <h4 class="title">{{UnitData[4]}}</h4>
        <p class="card-category unitpower">{{UserBirds}}/{{MaxUnit}}</p>
      </div>
      <div class="card-body">
        <div class="container buyunit">
          <h4 class="unitpower">
            <p>Makes: {{ProductionRate}} eggs/s</p>
            <p class="unitcost">Cost: {{UnitData[5]}} eggs</p>
          </h4>
          <div class="row">
            <div class="col-9">
              <div class="form-group">
                <input v-model="BuyQty" type="text" value placeholder="Amount" class="form-control">
              </div>
            </div>
            <div class="col-3">
              <button v-on:click="MaxBtn" class="btn maxbtn">max</button>
            </div>
          </div>
          <button v-on:click="BuyUnit" class="btn buybtn">Buy</button>
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
                  <p class="card-title" v-if="isPowerMax">+{{PowerRate}} Production</p>
                  <p class="card-category tupgrade">{{Powerlevel}}/3</p>
                </div>
              </div>
              <div class="col-5">
                <div v-if="isPowerMax">
                  <button v-on:click="BuyPower" class="btn btn-info">Buy</button>
                  <p class="card-category">{{PowerPrice}} eggs</p>
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
                  <p class="card-title" v-if="isMaxMax">{{MaxUnit}} max unit</p>
                  <p class="card-category tupgrade">{{MaxLevel}}/3</p>
                </div>
              </div>
              <div class="col-5">
                <div v-if="isMaxMax">
                  <button v-on:click="BuyMax" class="btn btn-info">Buy</button>
                  <p class="card-category">{{MaxPrice}} eggs</p>
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
import GameClient from "@/services/game.service";
export default {
  name: "PrdUnitModel",
  data() {
    return {
      BuyQty: null,
      isLoading: false
    };
  },
  props: {
    UnitData: Array,
    UserData: Object,
    EggBalance: Number,
    isBird: Boolean
  },
  computed: {
    UserBirds() {
      // if (this.UserData[this.UnitData[2]].Qty === undefined) {
      //   return 0;
      // } else {
      //   return this.UserData[this.UnitData[2]].Qty === undefined;
      // }
      try {
        return this.UserData[this.UnitData[2]].Qty;
      } catch (e) {
        return 0;
      }
    },
    ProductionRate() {
      try {
        if (this.UserData[this.UnitData[2]].Power == 1) {
          return (
            parseInt(this.UnitData[6]) + parseInt(this.UnitData[7][1].rate)
          );
        } else if (this.UserData[this.UnitData[2]].Power == 2) {
          return (
            parseInt(this.UnitData[6]) +
            parseInt(this.UnitData[7][1].rate) +
            parseInt(this.UnitData[7][2].rate)
          );
        } else if (this.UserData[this.UnitData[2]].Power == 3) {
          return (
            parseInt(this.UnitData[6]) +
            parseInt(this.UnitData[7][1].rate) +
            parseInt(this.UnitData[7][2].rate) +
            parseInt(this.UnitData[7][3].rate)
          );
        } else {
          return parseInt(this.UnitData[6]);
        }
      } catch (e) {
        return parseInt(this.UnitData[6]);
      }
    },
    MaxLevel() {
      try {
        return this.UserData[this.UnitData[2]].Max;
      } catch (e) {
        return 1;
      }
    },
    MaxUnit() {
      try {
        return Math.pow(10, this.UserData[this.UnitData[2]].Max + 1) - 1;
      } catch (e) {
        return 9;
      }
    },
    MaxPrice() {
      try {
        return (
          Math.pow(10, this.UserData[this.UnitData[2]].Max) *
          parseInt(this.UnitData[6]) *
          200
        );
      } catch (e) {
        return parseInt(this.UnitData[6]) * 200;
      }
    },
    isMaxMax() {
      try {
        if (this.UserData[this.UnitData[2]].Max >= 3) {
          return false;
        } else {
          return true;
        }
      } catch (e) {
        return true;
      }
    },
    Powerlevel() {
      try {
        return this.UserData[this.UnitData[2]].Power;
      } catch (e) {
        return 0;
      }
    },
    PowerRate() {
      try {
        return this.UnitData[7][this.UserData[this.UnitData[2]].Power + 1].rate;
      } catch (e) {
        return this.UnitData[7][1].rate;
      }
    },
    isPowerMax() {
      try {
        if (this.UserData[this.UnitData[2]].Power >= 3) {
          return false;
        } else {
          return true;
        }
      } catch (e) {
        return true;
      }
    },
    PowerPrice() {
      try {
        if (this.UserData[this.UnitData[2]].Power === undefined) {
          return parseInt(this.UnitData[6]) * 100;
        } else {
          return (
            Math.pow(10, this.UserData[this.UnitData[2]].Power) *
            parseInt(this.UnitData[6]) *
            100
          );
        }
      } catch (e) {
        return parseInt(this.UnitData[6]) * 100;
      }
    }
  },
  methods: {
    MaxBtn() {
      var Qty = Math.floor(this.EggBalance / this.UnitData[5]);
      if (Qty > this.MaxUnit - this.UserBirds) {
        this.BuyQty = this.MaxUnit - this.UserBirds;
      } else {
        this.BuyQty = Qty;
      }
    },
    async BuyUnit() {
      if (
        this.BuyQty === null ||
        this.BuyQty === "" ||
        this.BuyQty > this.MaxUnit - this.UserBirds ||
        this.EggBalance < this.BuyUnit * parseInt(this.UnitData[5])
      ) {
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "Invalid Qty!"
        });
      } else {
        this.isLoading = true;
        const Gameclient = new GameClient(localStorage.PrvKey);
        var formdata = [
          1,
          this.UnitData[2],
          this.BuyQty,
          this.ProductionRate,
          this.UnitData[5]
        ];
        let response = await Gameclient.BuyUnit(formdata);
        var that = this;
        setTimeout(async function() {
          that.$swal({
            type: "success",
            title: "Success!!",
            text: "Successfull"
          });
          that.$root.$emit("login-event", true);
          that.isLoading = false;
        }, 5000);
      }
    },
    async BuyPower() {
      if (this.EggBalance < this.PowerPrice) {
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "Not enough Eggs!"
        });
      } else {
        this.isLoading = true;
        const Gameclient = new GameClient(localStorage.PrvKey);
        var formdata = [1, this.UnitData[2], this.PowerPrice];
        let response = await Gameclient.BuyPower(formdata);
        var that = this;
        setTimeout(async function() {
          that.$swal({
            type: "success",
            title: "Success!!",
            text: "Successfull"
          });
          that.$root.$emit("login-event", true);
          that.isLoading = false;
        }, 5000);
      }
    },
    async BuyMax() {
      if (this.EggBalance < this.MaxPrice) {
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "Not enough Eggs!"
        });
      } else {
        this.isLoading = true;
        const Gameclient = new GameClient(localStorage.PrvKey);
        var formdata = [1, this.UnitData[2], this.MaxPrice];
        let response = await Gameclient.BuyMax(formdata);
        var that = this;
        setTimeout(async function() {
          that.$swal({
            type: "success",
            title: "Success!!",
            text: "Successfull"
          });
          that.$root.$emit("login-event", true);
          that.isLoading = false;
        }, 5000);
      }
    }
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


