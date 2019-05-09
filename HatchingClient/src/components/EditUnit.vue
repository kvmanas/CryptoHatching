<template>
  <div>
    <v-card color="#171941" v-loading="isLoad">
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex v-for="(item, index) in GameUnits" :key="item[0]" sm8 offset-sm2 class="pa-3">
            <v-card color="blue-grey darken-2" class="white--text">
              <v-layout>
                <v-flex sm3>
                  <v-img :src="item[1]" height="60px" contain></v-img>
                </v-flex>
                <v-flex sm6>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{item[4]}}</div>
                    </div>
                  </v-card-title>
                </v-flex>
                <v-flex sm3>
                  <v-btn
                    v-on:click="EditUnit(index)"
                    fab
                    dark
                    color="indigo"
                    data-toggle="modal"
                    data-target="#editunit"
                  >
                    <v-icon dark>edit</v-icon>
                  </v-btn>

                  <v-btn v-on:click="DelUnit(index)" fab dark color="red darken-1">
                    <v-icon dark>delete</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <div
      class="modal fade modal-black"
      id="editunit"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content" v-loading="isLoading">
          <div class="modal-header justify-content-center">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
              <i class="tim-icons icon-simple-remove text-white"></i>
            </button>
            <div class="text-muted text-center ml-auto mr-auto">
              <h3 class="mb-0">Edit</h3>
            </div>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Unit Name</label>
                  <input v-model="UnitName" type="text" class="form-control">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Unit Base Price</label>
                  <input v-model="UnitPrice" type="text" class="form-control">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="sel1">Select Unit Type:</label>
                  <select v-model="UnitType" class="form-control" id="sel1">
                    <option value="1">Production</option>
                    <option value="2">Attack</option>
                  </select>
                </div>
              </div>
            </div>
            <div v-if="isBird">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Base Production Rate</label>
                    <input v-model="BaseRate" type="text" class="form-control">
                  </div>
                </div>
              </div>
              <div class="container powerup">
                <h4 class="utitle">
                  <p>Power Up</p>
                </h4>
                <div class="row">
                  <div class="col-md-8">
                    <div class="form-group">
                      <label>Level 1</label>
                      <input v-model="BirdPower[1].rate" type="text" class="form-control">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>unit</label>
                      <select v-model="BirdPower[1].unit" class="form-control">
                        <option value="1">+</option>
                        <!-- <option value="2">+</option> -->
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-8">
                    <div class="form-group">
                      <label>Level 2</label>
                      <input v-model="BirdPower[2].rate" type="text" class="form-control">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>unit</label>
                      <select v-model="BirdPower[2].unit" class="form-control">
                        <option value="1">+</option>
                        <!-- <option value="2">+</option> -->
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-8">
                    <div class="form-group">
                      <label>Level 3</label>
                      <input v-model="BirdPower[3].rate" type="text" class="form-control">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>unit</label>
                      <select v-model="BirdPower[3].unit" class="form-control">
                        <option value="1">+</option>
                        <!-- <option value="2">+</option> -->
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Base Attack</label>
                    <input v-model="BaseAttack" type="text" class="form-control">
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Base Defence</label>
                    <input v-model="BaseDefence" type="text" class="form-control">
                  </div>
                </div>
              </div>
              <div class="container powerup">
                <h4 class="utitle">
                  <p>Power Up</p>
                </h4>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Level 1</label>
                      <input v-model="PigPower[1].rate" type="text" class="form-control">
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>unit</label>
                      <select v-model="PigPower[1].unit" class="form-control">
                        <option value="1">+</option>
                        <!-- <option value="2">+</option> -->
                      </select>
                    </div>
                  </div>
                  <!-- <div class="col-md-3">
                    <div class="form-group">
                      <label>Type</label>
                      <select v-model="PigPower[1].type" class="form-control">
                        <option value="1">Attack</option>
                        <option value="2">Defence</option>
                      </select>
                    </div>
                  </div>-->
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Level 2</label>
                      <input v-model="PigPower[2].rate" type="text" class="form-control">
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>unit</label>
                      <select v-model="PigPower[2].unit" class="form-control">
                        <option value="1">+</option>
                        <!-- <option value="2">+</option> -->
                      </select>
                    </div>
                  </div>
                  <!-- <div class="col-md-3">
                    <div class="form-group">
                      <label>Type</label>
                      <select v-model="PigPower[2].type" class="form-control">
                        <option value="1">Attack</option>
                        <option value="2">Defence</option>
                      </select>
                    </div>
                  </div>-->
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Level 3</label>
                      <input v-model="PigPower[3].rate" type="text" class="form-control">
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>unit</label>
                      <select v-model="PigPower[3].unit" class="form-control">
                        <option value="1">+</option>
                        <!-- <option value="2">+</option> -->
                      </select>
                    </div>
                  </div>
                  <!-- <div class="col-md-3">
                    <div class="form-group">
                      <label>Type</label>
                      <select v-model="PigPower[3].type" class="form-control">
                        <option value="1">Attack</option>
                        <option value="2">Defence</option>
                      </select>
                    </div>
                  </div>-->
                </div>
              </div>
            </div>
            <!-- <div class="container levelup">
              <h4 class="utitle">
                <p>Max Unit</p>
              </h4>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Level 1</label>
                    <input v-model="MaxLevel[1]" type="text" class="form-control">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Level 2</label>
                    <input v-model="MaxLevel[2]" type="text" class="form-control">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Level 3</label>
                    <input v-model="MaxLevel[3]" type="text" class="form-control">
                  </div>
                </div>
              </div>
            </div>-->
            <button
              v-on:click="SubmitEdit"
              type="submit"
              class="btn btn-primary btn-round float-right"
            >Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GetUnits } from "@/services/user.service";
import UintMod from "@/services/admins.service";
export default {
  name: "EditUnit",
  data() {
    return {
      GameUnits: [],
      isLoading: false,
      isLoad: false,
      BaseRate: null,
      UnitType: "1",
      UnitName: null,
      UnitPrice: null,
      UnitId: null,
      BirdPower: {
        1: {
          rate: null,
          unit: "1"
        },
        2: {
          rate: null,
          unit: "1"
        },
        3: {
          rate: null,
          unit: "1"
        }
      },
      PigPower: {
        1: {
          rate: null,
          unit: "1"
        },
        2: {
          rate: null,
          unit: "1"
        },
        3: {
          rate: null,
          unit: "1"
        }
      },
      // MaxLevel: {
      //   1: 1,
      //   2: 2,
      //   3: 3
      // },
      BaseAttack: null,
      BaseDefence: null
    };
  },
  async created() {
    this.GameUnits = await GetUnits();
  },
  computed: {
    isBird() {
      return this.UnitType === "1";
    }
  },
  methods: {
    EditUnit(index) {
      var UnitData = this.GameUnits[index];
      this.UnitId = UnitData[2];
      this.UnitType = UnitData[3];
      this.UnitName = UnitData[4];
      this.UnitPrice = UnitData[5];
      if (UnitData[3] == "1") {
        this.BaseRate = UnitData[6];
        this.BirdPower = UnitData[7];
        //this.MaxLevel = UnitData[8];
      } else {
        this.BaseAttack = UnitData[6];
        this.BaseDefence = UnitData[7];
        this.PigPower = UnitData[8];
        //this.MaxLevel = UnitData[9];
      }
    },
    async SubmitEdit() {
      this.isLoading = true;
      var formdata;
      if (this.UnitType == "1") {
        formdata = [
          this.UnitId,
          this.UnitType,
          this.UnitName,
          this.UnitPrice,
          this.BaseRate,
          this.BirdPower
        ];
        // ,
        //   this.MaxLevel
      } else {
        formdata = [
          this.UnitId,
          this.UnitType,
          this.UnitName,
          this.UnitPrice,
          this.BaseAttack,
          this.BaseDefence,
          this.PigPower
        ];
        // ,
        //   this.MaxLevel
      }
      var isEmpty = this.checkisnull(formdata);
      var that = this;
      if (isEmpty) {
        setTimeout(function() {
          that.$swal({
            type: "error",
            title: "Oops...",
            text: "All Fields Required!"
          });
          that.isLoading = false;
        }, 3000);
      } else {
        const editunit = new UintMod(localStorage.PrvKey);
        let response = await editunit.EditUnit(formdata);
        setTimeout(async function() {
          that.GameUnits = await GetUnits();
          that.$swal({
            type: "success",
            title: "Success!!",
            text: "Successfull"
          });
          $("#editunit").modal("hide");
          that.isLoading = false;
        }, 3000);
      }
    },
    checkisnull(data) {
      for (var y in data) {
        var x = data[y];
        if (x === Object(x)) {
          for (var key in x) {
            if (x[key] === Object(x[key])) {
              for (var keyz in x[key]) {
                if (x[key][keyz] === null || x[key][keyz] === "") {
                  return true;
                }
              }
            } else {
              if (x[key] === null || x[key] === "") {
                return true;
              }
            }
          }
        } else {
          if (x === null || x === "") {
            return true;
          }
        }
      }
      return false;
    },
    async DelUnit(index) {
      this.isLoad = true;
      var that = this;
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async result => {
        if (result.value) {
          let unitid = this.GameUnits[index][2];
          let unittype = this.GameUnits[index][3];
          let delunit = new UintMod(localStorage.PrvKey);
          let response = await delunit.DelUnit([unitid, unittype]);
          setTimeout(async function() {
            that.GameUnits = await GetUnits();
            that.$swal({
              type: "success",
              title: "Deleted!",
              text: "Your file has been deleted."
            });
            that.isLoad = false;
          }, 3000);
        } else {
          this.isLoad = false;
        }
      });
    }
  }
};
</script>
<style scoped>
option {
  color: black;
}
.powerup {
  border: 1px solid #e14eca;
  margin-bottom: 20px;
}
.levelup {
  border: 1px solid #def12a;
  margin-bottom: 20px;
}
.utitle {
  text-align: center;
  font-weight: bold !important;
  font-size: 16px !important;
}
</style>