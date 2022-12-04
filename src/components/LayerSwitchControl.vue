<template>
   <!-- 底图切换控件 容器 -->
   <div id='layers' class="ol-control notPhone" style="bottom:2.5em;background:white;left:0.5em;border:1px solid #969696;opacity:0.8">
      <img src="../assets/BasemapInactive.png" id="bming" style="margin:1px">
      <div id='lyscontent' style="margin:6px;display:none;float:left;height:250px">
        <div style="float:left;height:25px">
          <span style="background:#00688b;font-size:14px;border-radius:7px;padding:2px 6px 3px;color:white">底图切换</span>
        </div>
        <div id="pnlBasemaps" style="clear:both;margin-top:5px">
          <div class="bmapGem" id="emptyLayer">
            <img src="../assets/empty.png" class="bmImg">
            <br>
            Empty
          </div>
          <div class="bmapGem" id="osmLayer">
            <img src="../assets/esriStreet.png" class="bmImg">
            <br>
            Open Street Map
          </div>
          <div class="bmapGem" id="satelliteLayer_2020">
            <img src="../assets/aerials2010.png" class="bmImg">
            <br>
            Google
          </div>
          <div class="bmapGem" id="hybridLayer_2020" style="clear:both">
            <img src="../assets/aerials2010.png" class="bmImg">
            <br>
            Google (hybrid)
          </div>
          <div class="bmapGem" id="esri-satellite">
            <img src="../assets/aerials2010.png" class="bmImg">
            <br>
            Esri-satellite
          </div>
          <div class="bmapGem" id="stamen">
            <img src="../assets/esriGray.png" class="bmImg">
            <br>
            Stamen
          </div>
        </div>
        <div style="float:left;height:25px">
          <span style="background:#00688b;font-size:14px;border-radius:7px;padding:2px 6px 3px;color:white">加载Overlay</span>
        </div>
        <div id = "overlays" style="clear:both;margin-top:5px">
          <div class="overlayGem" id="emptyLayer">
            <img src="../assets/empty.png" class="overlayImg">
            <br>
            Empty
          </div>
          <div class="overlayGem" id="geoJson">
            <img src="../assets/esriStreet.png" class="geoJson">
            <br>
            geoJson
          </div>
        </div>
        </div>
      </div>
</template>
<script>

export default {
  name: "DatePicker",
  data: () => ({
    
  }),
  computed: {

  },
}
</script>
<style>
.bmapGem {
        border: 2px #ccc solid;
        margin: 3px;
        width: 100px;
        height: 60px;
        float: left;
        font-size: 12px;
        text-align: center;
        border-radius: 6px;
      }
      .overlayGem {
        border: 2px #ccc solid;
        margin: 3px;
        width: 100px;
        height: 60px;
        float: left;
        font-size: 12px;
        text-align: center;
        border-radius: 6px;
      }
      .bmImg {
        margin: 7px 7px 0px 7px;
      }
      .overlayImg{
        margin: 7px 7px 0px 7px;
      }
</style>