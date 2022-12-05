<template>
<div class = "main">    
    <div id="map-container" class="map-container"></div>
    <layerswitchcontrol />
  </div>
</template>
<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {Polygon} from 'ol/geom';
import {OSM, Vector as VectorSource, ImageWMS} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer,Image as ImageTile} from 'ol/layer';
import {sync} from "vuex-pathify";
import Feature from 'ol/Feature';
import '@/styles/ol3-layerswitcher.css';
import {defaults as defaultControls, ScaleLine} from 'ol/control';
import {CreateDrawControl} from '@/util/customcontrols/createdrawcontrol'
import {BackDrawControl} from '@/util/customcontrols/backdrawcontrol'
import {ClearDrawControl} from '@/util/customcontrols/cleardrawcontrol'
import {LayersControl } from '../util/customcontrols/layerscontrol';
import XYZ from 'ol/source/XYZ'
import TileArcGISRest from 'ol/source/TileArcGISRest'
import Stamen from 'ol/source/Stamen'
import layerswitchcontrol from '../components/LayerSwitchControl.vue'
// import { truncate } from 'fs';

//基于变量在外部, 监听函数内存在访问不到的问题(javascript基础问题), 变量被统一定义在data域中
export default {
  name: 'Map',
  data() {
    return {
      /**
       * Openlayers地图对象           ，。
       * @type {Object}
       */
      map: null,
      baseMap: {
        baseMap: null
      },
      overlay: {
        overlay: null
      },
      layers : null,
      testGeojsonArray: [
        {"type" : "Feature","properties": "","geometry" : {"type": "Polygon", "coordinates":  [11591141.978821806609631, 3546469.098744962830096 , 11577227.042500456795096, 3546469.098744962830096 , 11577227.042500456795096, 3557221.684605775866657 ,11591141.978821806609631, 3557221.684605775866657 ,11591141.978821806609631, 3546469.098744962830096 ] ,"realcoordinates": ""}},
        {"type" : "Feature","properties": "","geometry" : {"type": "Polygon", "coordinates":  [ 11591141.978821806609631, 3557221.684605775866657 , 11577227.042500456795096, 3557221.684605775866657 , 11577227.042500456795096, 3567983.455974561162293 , 11591141.978821806609631, 3567983.455974561162293 , 11591141.978821806609631, 3557221.684605775866657 ] ,"realcoordinates": ""}}
       ],
      /**
       * roi:region of interest
      */
      roiArea: {
        roiArea : ''
      },
      /**
       * 一维数组, 依次存放用户绘制区域点的经纬度，保存用户点信息需要用到这个数组
       */
      coordinateArray: {
        coordinateArray : []
      },
      /**
       * Openlayers绘图对象           ，。
       */
      draw: {
        draw : null
      },
      /**
       * 用户绘制的region of interest polygon数组
       */
      userDrawnPolygons : {
        userDrawnPolygons : []
      },
      /**
       * 存放测量信息全部overlay的索引数组，后面删除roi需要用
       * @type {Array}
       */
      measureOverlayIndexArray: {
        measureOverlayIndexArray : []
      },
      /**
       * 当前overlay的索引, 处理用户绘制需要用
       * @type {Number}
       */
      currentOverlayIndex: {
        currentOverlayIndex : -1
      },
      /**
       * 用户是否正在绘制ROI，处理用户绘制需要用
       * @type {Boolean}
       */
      isDrawingRoiFlag: {
        isDrawingRoiFlag : false
      },
       /**
       * 当前绘制的特征。
       * @type {import("../src/ol/Feature.js").default}
       */
      sketch: {
        sketch: null
      },
      /**
       * 帮助工具提示元素。
       * @type {HTMLElement}
       */
      helpTooltipElement: {
        helpTooltipElement: null
      },
      /**
       * 覆盖以显示帮助消息。
       * @type {Overlay}
       */
      helpTooltip: {
        helpTooltip: null
      },
      /**
       * 度量工具提示元素。
       * @type {HTMLElement}
       */
      measureTooltipElement: {
        measureTooltipElement : null
      },
      /**
       * 覆盖以显示测量值。
       * @type {Overlay}
       */
      measureTooltip: {
        measureTooltip : null
      },
       /**
       * 用户绘制多边形时显示的消息。Msg: Message
       * @type {string}
       */
      userContinueToDrawPolygonMsg: '单击以继续绘制多边形',
      pointerMoveHandler: null,
      source: {
        source : null
      },
      userHelpMsg : ""
    }
  },
  components: {
    layerswitchcontrol,
  },
  computed: {
    ...sync('app', [
      'navigationShowFlag','detailCardShowFlag', 'leftCardShowFlag',
      'arrowShowFlag','formShowFlag'
    ]),
    ...sync('form', [
      'formData','area','uploadFileShowFlag','coordinateArrayLength'
    ]),
   },
  // 初始化页面完成后，再对dom节点进行相关操作
  mounted(){
    this.source.source = new VectorSource();
    var this1 = this;   // 解决访问不到data中属性的问题(javascript基础薄弱)
    this.pointerMoveHandler = function (evt) {
    if (evt.dragging) {
      return;
    }
    /** @type {string} */
    this1.userHelpMsg = '单击以开始绘制';
    if (this1.sketch.sketch) {
      const geom = this1.sketch.sketch.getGeometry();
      if (geom instanceof Polygon) {
        this1.userHelpMsg = this1.userContinueToDrawPolygonMsg;
      }
    }
    this1.helpTooltipElement.helpTooltipElement.innerHTML = this1.userHelpMsg;
    this1.helpTooltip.helpTooltip.setPosition(evt.coordinate);
    this1.helpTooltipElement.helpTooltipElement.classList.remove('hidden');
    };
    
    //创建绘制按钮需要操作的变量通过字典传入，测试不通过这种方式变量值无法成功修改(javascript薄弱)
    let createDrawControlOptions = {
      "pointerMoveHandler" : this1.pointerMoveHandler,
      "source" : this1.source,
      "measureTooltipElement" : this1.measureTooltipElement,
      "measureTooltip" : this1.measureTooltip,
      "currentOverlayIndex" : this1.currentOverlayIndex,
      "measureOverlayIndexArray" : this1.measureOverlayIndexArray,
      "helpTooltipElement" : this1.helpTooltipElement,
      "helpTooltip" : this1.helpTooltip,
      "isDrawingRoiFlag" : this1.isDrawingRoiFlag,
      "sketch" : this1.sketch,
      "coordinateArray" : this1.coordinateArray,
      "userDrawnPolygons" : this1.userDrawnPolygons,
      "draw" : this1.draw,
      "roiArea" : this1.roiArea
    };
    //创建撤销绘制按钮需要操作的变量通过字典传入，测试不通过这种方式变量值无法成功修改(javascript基础薄弱)
    let backDrawControlOptions = {
      "draw" :  this1.draw,
    }
    //创建清空绘制按钮需要操作的变量通过字典传入，测试不通过这种方式变量值无法成功修改(javascript基础薄弱)
    let clearDrawControlOptions = {
      "draw" :  this1.draw,
      "isDrawingRoiFlag" : this1.isDrawingRoiFlag,
      "userDrawnPolygons" : this1.userDrawnPolygons,
      "source" : this1.source,
      "measureOverlayIndexArray" : this1.measureOverlayIndexArray,
      "currentOverlayIndex" : this1.currentOverlayIndex,
      "helpTooltipElement" : this1.helpTooltipElement,
    }
    //创建图层切换按钮需要操作的变量通过字典传入，测试不通过这种方式变量值无法成功修改(javascript基础薄弱)
    let layersControlOptions = {
      "baseMap": this1.baseMap,
      "overlay": this1.overlay,
      "controldiv": {"controldiv": document.getElementById("layers")}
    }

    var format = 'image/png';
    this.layers = [
      //  OSM底图
      new TileLayer({
        source: new OSM(),
        visible: true,
        title: 'osmLayer',
        class: 'basemap' // 自定义属性：class（basemap/layer）  方便底图切换时,与要素图层区分开
      }),
      new ImageTile({
        title: 'waterextractcase',
        visible: false,
        source: new ImageWMS({
          ratio: 1,
          projectiton: 'EPSG:3857',
          url: 'https://geo.culturalmapofcdutyouth.com/geoserver/TestLoading/wms',
          params: {'FORMAT': format,
                'VERSION': '1.1.1',  
                "STYLES": '',
                "LAYERS": 'TestLoading:H48F019017_result',
                "exceptions": 'application/vnd.ogc.se_inimage',
          }
        },
        ),
        class: 'overlay',
      }),
      new VectorLayer({
        source: this.source.source,
        style: new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
          }),
          stroke: new Stroke({
            color: '#ffcc33',
            width: 2,
          }),
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({
              color: '#ffcc33',
            }),
          }),
        }),
      }),
      //  google 栅格带标注 底图
      new TileLayer({
        title: 'hybridLayer_2020',
        visible: false,
        class: 'basemap',
        source: new XYZ({
          projectiton: 'EPSG:4326',
          crossOrigin: 'anonymous',
          url: 'http://mt2.google.cn/vt/lyrs=y&x={x}&y={y}&z={z}&s=G' //  标注地图 ，mt1/mt2/mt3 均可用
        })
      }),
      // google 栅格无标注 底图
      new TileLayer({
        title: 'satelliteLayer_2020',
        visible: false,
        class: 'basemap',
        source: new XYZ({
          projectiton: 'EPSG:4326',
          crossOrigin: 'anonymous',
          url: 'http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}' // 无标注地图
        })
      }),
      // esri-satellite 底图
      new TileLayer({
        title: 'esri-satellite',
        visible: false,
        class: 'basemap',
        source: new TileArcGISRest({
          crossOrigin: 'anonymous',
          projectiton: 'EPSG:4326',
          url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
        })
      }),
      // stamen 底图
      new TileLayer({
        title: 'stamen',
        visible: false,
        class: 'basemap',
        source: new Stamen({
          layer: 'toner'
        })
      }),
      // new TileLayer({
      //   source: source,
      // })
    ]
    this.drawGeojson();
    this.map = new Map({
      // 添加绘制，撤销绘制，清空绘制控制
      controls: defaultControls({ attribution: false, zoom: true, rotate: false }).extend([
        new ScaleLine(),
        new CreateDrawControl(createDrawControlOptions),
        new BackDrawControl(backDrawControlOptions),
        new ClearDrawControl(clearDrawControlOptions),
        new LayersControl(layersControlOptions)
      ]),
      layers: this.layers,
      target: 'map-container',
      view: new View({
        center: [11550688.058143763, 3612881.4592794343],
        zoom: 4,
      }),
    });
  
  /**
     * 手柄指针移动。
     * @param {import("../src/ol/MapBrowserEvent").default} evt The event.
     */
  let mouseoutthis = this;
  this.map.getViewport().addEventListener('mouseout', function () {
    mouseoutthis.helpTooltipElement.helpTooltipElement.classList.add('hidden');
  });
  this.drawGeojson();
},
methods: {
    // 根据测试的geojson在地图绘制面
    drawGeojson() {
      let features = [];
      for(let r = 0; r < this.testGeojsonArray.length; r++){
        let polygoncoordinates = [];
        for(let i = 0; i < this.testGeojsonArray[r]["geometry"]["coordinates"].length; i += 2) {
          if (i < this.testGeojsonArray[r]["geometry"]["coordinates"].length - 1) {
            polygoncoordinates.push([this.testGeojsonArray[r]["geometry"]["coordinates"][i], this.testGeojsonArray[r]["geometry"]["coordinates"][i + 1]]);
          }
        }
        let featurePolygon = new Feature({
          geometry : new Polygon([polygoncoordinates]),
        })
        features.push(featurePolygon);
      }
      let layer = new VectorLayer();
      let source = new VectorSource();
      source.addFeatures(features);
      layer.setSource(source);
      layer.set('title', 'geoJson');
      layer.set('id', 'geoJson');
      layer.set('class', 'overlay');
      layer.set('visible', false);
      this.layers.push(layer);
    },

    setBasemap (title) {
      var layers = this.map.getLayers().array_
      // 循环遍历图层数组, 找到图层名为title的图层显示 --libin
      for (var i = 0; i < layers.length; i++) {
        // 图层类型为basemap才进行visible更改 --libin
        if (layers[i].values_.class === 'basemap') {
          if (layers[i].values_.title === title) {
              layers[i].setVisible(true);
          } else {
              layers[i].setVisible(false);
          }
        }
      }
    },

    setOverlay (title) {
      var layers = this.map.getLayers().array_;
      // 循环遍历图层数组, 找到图层名为title的图层显示 --libin
      for (var i = 0; i < layers.length; i++) {
        // 图层类型为basemap才进行visible更改 --libin
        if (layers[i].values_.class === 'overlay') {
          if (layers[i].values_.title === title) {
              layers[i].setVisible(true);
          } else {
              layers[i].setVisible(false);
          }
        }
      }
    },
    },

    watch: {
      // 同步更新用户绘制的roi的面积数据到formData
      roiArea: {
        deep: true,
        handler(nv) {
          this.formData.area = nv.roiArea;
        },
      },
      coordinateArray: {
        deep: true,
        handler(nv) {
          this.coordinateArrayLength = nv.length;
        },
      },
      baseMap: {
        deep: true,
        handler(nv) {
          this.setBasemap(nv.baseMap);
        },
      },
      overlay: {
        deep: true,
        handler(nv) {
          this.setOverlay(nv.overlay);
        },
      }
  },
}
</script>
<style scoped>
      .main {
        width: calc(100%);
        height: 100%
      }
      .map-container {
        position: absolute;
        left: 0;
        top: 0;
        width: calc(100%);
        height: 100%;
      }
</style>
