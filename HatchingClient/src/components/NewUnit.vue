<template>
  <section class="section">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-md-6">
          <div class="card card-plain">
            <div class="card-header">
              <h1 class="profile-title text-left">New Unit</h1>
            </div>
            <div class="card-body">
              <!-- Unit Image Form -->
              <form
                class="mb-3"
                enctype="multipart/form-data"
                novalidate
                v-if="isInitial || isSaving"
              >
                <h4>Unit image</h4>
                <div class="dropbox">
                  <input
                    type="file"
                    :name="uploadFieldName"
                    :disabled="isSaving"
                    @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                    accept="image/*"
                    class="input-file"
                  >
                  <p v-if="isInitial">
                    Drag your file here to begin
                    <br>or click to browse
                  </p>
                  <p v-if="isSaving">Uploading {{ fileCount }} file...</p>
                </div>
              </form>
              <div v-if="isSuccess">
                <h2>Uploaded {{ uploadedFiles.length }} file successfully.</h2>
                <p>
                  <a href="javascript:void(0)" @click="reset()">Upload again</a>
                </p>
                <ul class="list-unstyled">
                  <li v-for="item in uploadedFiles" v-bind:key="item.url">
                    <img
                      :src="item.url"
                      class="img-responsive img-thumbnail"
                      :alt="item.originalName"
                    >
                  </li>
                </ul>
              </div>
              <!--FAILED-->
              <div v-if="isFailed">
                <h2>Uploaded failed.</h2>
                <p>
                  <a href="javascript:void(0)" @click="reset()">Try again</a>
                </p>
                <pre>{{ uploadError }}</pre>
              </div>
              <!-- Unit Details Form -->
              <form @submit="NewUnitForm">
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
                          <input v-model="BirdPower.level1.rate" type="text" class="form-control">
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="form-group">
                          <label>unit</label>
                          <select v-model="BirdPower.level1.unit" class="form-control">
                            <option value="1">%</option>
                            <option value="2">+</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-8">
                        <div class="form-group">
                          <label>Level 2</label>
                          <input v-model="BirdPower.level2.rate" type="text" class="form-control">
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="form-group">
                          <label>unit</label>
                          <select v-model="BirdPower.level2.unit" class="form-control">
                            <option value="1">%</option>
                            <option value="2">+</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-8">
                        <div class="form-group">
                          <label>Level 3</label>
                          <input v-model="BirdPower.level3.rate" type="text" class="form-control">
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="form-group">
                          <label>unit</label>
                          <select v-model="BirdPower.level3.unit" class="form-control">
                            <option value="1">%</option>
                            <option value="2">+</option>
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
                      <div class="col-md-8">
                        <div class="form-group">
                          <label>Level 1</label>
                          <input v-model="PigPower.level1.rate" type="text" class="form-control">
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="form-group">
                          <label>unit</label>
                          <select v-model="PigPower.level1.unit" class="form-control">
                            <option value="1">%</option>
                            <option value="2">+</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="form-group">
                          <label>Type</label>
                          <select v-model="PigPower.level1.type" class="form-control">
                            <option value="1">Attack</option>
                            <option value="2">Defence</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-8">
                        <div class="form-group">
                          <label>Level 2</label>
                          <input v-model="PigPower.level2.rate" type="text" class="form-control">
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="form-group">
                          <label>unit</label>
                          <select v-model="PigPower.level2.unit" class="form-control">
                            <option value="1">%</option>
                            <option value="2">+</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="form-group">
                          <label>Type</label>
                          <select v-model="PigPower.level2.type" class="form-control">
                            <option value="1">Attack</option>
                            <option value="2">Defence</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-8">
                        <div class="form-group">
                          <label>Level 3</label>
                          <input v-model="PigPower.level3.rate" type="text" class="form-control">
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="form-group">
                          <label>unit</label>
                          <select v-model="PigPower.level3.unit" class="form-control">
                            <option value="1">%</option>
                            <option value="2">+</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="form-group">
                          <label>Type</label>
                          <select v-model="PigPower.level3.type" class="form-control">
                            <option value="1">Attack</option>
                            <option value="2">Defence</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="container levelup">
                  <h4 class="utitle">
                    <p>Max Unit</p>
                  </h4>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label>Level 1</label>
                        <input v-model="MaxLevel.level1" type="text" class="form-control">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label>Level 2</label>
                        <input v-model="MaxLevel.level2" type="text" class="form-control">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label>Level 3</label>
                        <input v-model="MaxLevel.level3" type="text" class="form-control">
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary btn-round float-right">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { upload } from "@/services/file-upload.service";
import UintMod from "@/services/admins.service";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  name: "NewUinit",
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "image",
      BaseRate: null,
      UnitType: "1",
      UnitName: null,
      UnitId: null,
      BirdPower: {
        level1: {
          rate: null,
          unit: "1"
        },
        level2: {
          rate: null,
          unit: "1"
        },
        level3: {
          rate: null,
          unit: "1"
        }
      },
      PigPower: {
        level1: {
          rate: null,
          unit: "1",
          type: "1"
        },
        level2: {
          rate: null,
          unit: "1",
          type: "1"
        },
        level3: {
          rate: null,
          unit: "1",
          type: "1"
        }
      },
      MaxLevel: {
        level1: null,
        level2: null,
        level3: null
      },
      BaseAttack: null,
      BaseDefence: null
    };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
    isBird() {
      return this.UnitType === "1";
    }
  },
  methods: {
    async NewUnitForm(e) {
      e.preventDefault();
      var formdata;
      if (this.UnitType == "1") {
        formdata = [
          this.UnitId,
          this.UnitType,
          this.UnitName,
          this.BaseRate,
          this.BirdPower,
          this.MaxLevel
        ];
      } else {
        formdata = [
          this.UnitId,
          this.UnitType,
          this.UnitName,
          this.BaseAttack,
          this.BaseDefence,
          this.PigPower,
          this.MaxLevel
        ];
      }
      var isEmpty = this.checkisnull(formdata);
      if (isEmpty) {
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "All Fields Required!"
        });
      } else {
        const addunit = new UintMod(localStorage.PrvKey);
        let response = await addunit.NewUnit(formdata);
        this.$swal({
          type: "success",
          title: "Success!!",
          text: "Successfull"
        });
      }
      //var asd = await addunit.Production(this.BaseRate);
      //console.log(asd);
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
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;

      upload(formData)
        .then(x => {
          console.log(x);
          this.UnitId = x.id;
          this.uploadedFiles = [].concat(x);
          this.currentStatus = STATUS_SUCCESS;
        })
        .catch(err => {
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map(x => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });

      // save it
      this.save(formData);
    }
  },
  mounted() {
    this.reset();
  }
};
</script>

<style scoped>
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: rgba(35, 0, 99, 0.747);
  color: #030303;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: rgba(
    48,
    3,
    133,
    0.973
  ); /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
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