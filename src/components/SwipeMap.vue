<!--
 * @Description: leaflet实例
 * @Author: Xi Cheng
 * @LastEditors: Napier
 * @LastEditorTime: 2021-8-3
-->
<template >
  <div>
    <!-- SwipeMap固定, paddingLeft设置为0 z-index低于MapInfoCard的z-index-->
    <div class="map-container" id="map-container"
         v-if="param"
         :lefturl ="param.lefturl"
         :righturl ="param.righturl"
         style="z-index: 100;position: absolute;paddingLeft: 0px"
    >
      <input id="swipe" type="range" class="swipe">
    </div>
  </div>
</template>

<script>
// import utils from "@/util"
//import {onMounted} from 'vue'
import {swipe} from '@/util/operations'
export default {
  name: "SwipeMap",
  components: {},

  props: {
    param: {
      type: Object,
      default: () => ([]),
    },
  },

  data(){
    return {
      map: null,
      leftLayer: null,
      rightLayer: null,
      OSMUrl: "",
      WaterUrl: "",
    }
  },

  mounted() {
    swipe(this.param.lefturl, this.param.righturl, this.param.extent, 'map-container', 'swipe')
  },
};
</script>

<style lang="less">
.map-container {
  position: absolute;
  left: 0;
  top: 0;
  width: calc(100%);
  height: 100%;
}
.swipe {
  width: calc(100%);;
  background-color: transparent;
  -webkit-appearance: none;
  position: absolute;
  z-index: 1000;
  top: 50%
}
.swipe::-webkit-slider-thumb {
  -webkit-appearance: none;
  //border-radius:50%;
  width: 40px;
  height: 40px;
  //background: #ffffff;
  //border: solid 0.125em rgba(205, 224, 230, 0.5);
  background-image: url("../../public/swipe.png");
  background-size: 100% 100%;/*按比例缩放*/
  //z-index: 1000;
  //
  appearance: none;
}
// 点击小箭头, canvas继承以前的css保存显示比例, 由于AddData.vue中使用了initial, 导致无法正常继承。
.ol-layer canvas {
  width: inherit;
  height: inherit
}
.ol-zoom {
  margin-left: 20px;
}
// 改变缩放按钮的位置
.map-container .ol-zoom {
  top: auto;
  bottom: 20px;
  left: auto;
  right: 10px;

}
</style>
