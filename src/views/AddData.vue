<!-- 修改.ol-layer canvas, 优化显示, 不改变SwipMap的.ol-layer canvas -->
<!-- 显示比例的问题几乎都是在此组件内修改 libin-->
<template>
<v-container 
  fluid 
  >
  <div class = "main" >
    <div class="head" style="position: absolute;z-index: 997;left: 1.2em;">
          <v-row>
          <v-col cols = "12">
              <v-btn
                  @click = "submitRoi()"
                  class="black--text mt-0 pr-0"
                  color="sucess"
                  icon
                  >
                  <v-icon dark style="padding-left:0">
                    mdi-cloud-upload-outline
                  </v-icon>
                </v-btn>                  
          </v-col>
        </v-row>  
    </div>
    <AppMap />
    <Form />
    <createdrawcontrol />
    <backdrawcontrol />
    <cleardrawcontrol />
    <layerswitchcontrol />
  </div>
</v-container> 
</template>

<script>
import AppMap from '../components/Map.vue'
import {sync} from "vuex-pathify"

import createdrawcontrol from  '../components/CreateDrawControl.vue';
import backdrawcontrol from  '../components/BackDrawControl.vue';
import cleardrawcontrol from  '../components/ClearDrawControl.vue';
import layerswitchcontrol from '../components/LayerSwitchControl.vue';
import Form from '../views/Form.vue';
export default {
  name: 'AddData',
  components: {
    AppMap,
    Form,
    layerswitchcontrol,
    createdrawcontrol,
    backdrawcontrol,
    cleardrawcontrol,
  },
  data() {
    return {
      unWatch : null
    }
  },

  methods: {
    // emulates external source
    loadFeatures () {
      return new Promise(resolve => {
        setTimeout(() => {
          // generate GeoJSON random features
          resolve([
            this.currentFeature
          ])
        }, 5000)
      })
    },
    submitRoi() {
    this.formShowFlag = !this.formShowFlag
    // if (this.coordinateArrayLength != 0){
    //   this.uploadFileShowFlag = false;
    // }
  }
  },
  computed: {
    ...sync('app', [
      'navigationShowFlag','detailCardShowFlag', 'leftCardShowFlag',
      'arrowShowFlag','formShowFlag'
    ]),
    ...sync('form', [
      'formData','area','uploadFileShowFlag'
    ]),
  },
  }
</script>
<style lang="less">
  // 页面布局与Examples不同，重置css, 由.ol-layer canvas改为.ol-layer(由adddata->解决其他点击arrow未撑满全屏)，待考虑, 以前采用的是leaflet，后面采用的openlayers, 不知道是否有冲突
  // 使用了可以解决roi错位的问题(transform使用了最高优先级覆盖默认的css)
  .ol-layer canvas{
    transform: matrix(1, 0, 0, 1, 0, 0)!important;
  }
  .main {
    position: absolute;
    /*去除地图左右的边界*/
    left: 0;
    right: 0;
    width: calc(100%);
    height: 90%;
  }

  </style>