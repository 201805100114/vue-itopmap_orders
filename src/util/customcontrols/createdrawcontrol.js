// 必须加{}，不然会报错
import {Control} from 'ol/control';
import Draw from 'ol/interaction/Draw';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {createMeasureTooltip,formatArea, createHelpTooltip} from '@/util/operations'
import {unByKey} from 'ol/Observable';
import {Polygon} from 'ol/geom';
     
//自定义的开始绘制按钮
export class CreateDrawControl extends Control {
          /**
           * @param {Object} [opt_options] Control options.
           */
            constructor(opt_options) {
              const options = opt_options || {};
              var button = document.getElementsByClassName('start-draw button')[0];
              var element = document.getElementsByClassName('start-draw ol-unselectable ol-control')[0];
              console.log(button)
              console.log(element)
              super({
                element: element,
                target: options.target,
              });
              this.pointerMoveHandler = opt_options["pointerMoveHandler"];
              this.source = opt_options["source"];
              this.measureTooltipElement = opt_options["measureTooltipElement"];
              this.measureTooltip = opt_options["measureTooltip"];
              this.currentOverlayIndex = opt_options["currentOverlayIndex"];
              this.measureOverlayIndexArray = opt_options["measureOverlayIndexArray"];
              this.helpTooltipElement = opt_options["helpTooltipElement"];
              this.helpTooltip = opt_options["helpTooltip"];
              this.isDrawingRoiFlag = opt_options["isDrawingRoiFlag"];
              this.sketch = opt_options["sketch"];
              this.coordinateArray = opt_options["coordinateArray"];
              this.userDrawnPolygons = opt_options["userDrawnPolygons"];
              this.draw = opt_options["draw"];
              this.roiArea = opt_options["roiArea"];
              button.addEventListener('click', this.handleCreateDraw.bind(this), false);
            }
      
            handleCreateDraw() {
              this.getMap().on('pointermove', this.pointerMoveHandler);
              const type = 'Polygon';
              this.draw.draw = new Draw({
                source: this.source.source,
                type: type,
                style: new Style({
                  fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)',
                  }),
                  stroke: new Stroke({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2,
                  }),
                  image: new CircleStyle({
                    radius: 5,
                    stroke: new Stroke({
                      color: 'rgba(0, 0, 0, 0.7)',
                    }),
                    fill: new Fill({
                      color: 'rgba(255, 255, 255, 0.2)',
                    }),
                  }),
                }),
              });
              
              this.getMap().addInteraction(this.draw.draw);
              // 不采用浅拷贝
              this.measureTooltip.measureTooltip = createMeasureTooltip(this.measureTooltipElement);
              this.getMap().addOverlay(this.measureTooltip.measureTooltip);
              this.currentOverlayIndex.currentOverlayIndex = this.currentOverlayIndex.currentOverlayIndex + 1
              this.measureOverlayIndexArray.measureOverlayIndexArray.push(this.currentOverlayIndex.currentOverlayIndex);
              //// 不采用浅拷贝
              this.helpTooltip.helpTooltip = createHelpTooltip(this.helpTooltipElement, this.currentOverlayIndex);
              this.getMap().addOverlay(this.helpTooltip.helpTooltip);
              this.currentOverlayIndex.currentOverlayIndex = this.currentOverlayIndex.currentOverlayIndex + 1;
              let listener;
              let this1 = this;
              this.draw.draw.on('drawstart', function (evt) {
              this1.isDrawingRoiFlag.isDrawingRoiFlag = true;
              this1.sketch.sketch = evt.feature;
              let flatCoordinates = evt.feature["values_"]["geometry"]["flatCoordinates"];
              let toGeoJson = function(togeojsoncoordinates) {
                let ret = '{"type" : "Feature","properties": "","geometry" : {"type": "Polygon", "coordinates": ['+togeojsoncoordinates.toString()+'],"realcoordinates": ""}}';
                return ret;
              }
              let polygonjson = toGeoJson(flatCoordinates);
              console.log(typeof(polygonjson));
              this1.coordinateArray.coordinateArray = evt.feature["values_"]["geometry"]["flatCoordinates"];
              /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
              let tooltipCoord = evt.coordinate;
              let this2 = this1;
              // 点击开始绘制后鼠标移动过程中的触发, 执行次数较多
              listener = this1.sketch.sketch.getGeometry().on('change', function (evt) {//正常
                const geom = evt.target;
                let output;
                if (geom instanceof Polygon) {
                  output = formatArea(geom);
                  this2.roiArea.roiArea = output;
                  tooltipCoord = geom.getInteriorPoint().getCoordinates();
                }
                this2.measureTooltipElement.measureTooltipElement.innerHTML = output;
                this2.measureTooltip.measureTooltip.setPosition(tooltipCoord);
              });
              this2.getMap().addInteraction(this2.draw.draw);
            });
            
            // roi最后一个点绘制完后调用的函数
            this.draw.draw.on('drawend', function () {// 没有evt
              this1.isDrawingRoiFlag.isDrawingRoiFlag = false;
              this1.measureTooltipElement.measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
              this1.measureTooltip.measureTooltip.setOffset([0, -7]);
              // 用户绘制完一个polygon时存储其对象
              this1.userDrawnPolygons.userDrawnPolygons.push(this1.sketch.sketch);
              // unset sketch
              this1.sketch.sketch = null;
              // unset tooltip so that a new one can be created
              this1.measureTooltipElement.measureTooltipElement = null;
              this1.measureTooltip.measureTooltip = createMeasureTooltip(this1.measureTooltipElement);
              this1.getMap().addOverlay(this1.measureTooltip.measureTooltip);
              this1.currentOverlayIndex.currentOverlayIndex = this1.currentOverlayIndex.currentOverlayIndex + 1;
              this1.measureOverlayIndexArray.measureOverlayIndexArray.push(this1.currentOverlayIndex.currentOverlayIndex);
              unByKey(listener);
              this1.getMap().removeInteraction(this1.draw.draw);
              this1.helpTooltipElement.helpTooltipElement.innerHTML = '';
              this1.helpTooltipElement.helpTooltipElement = null;
            });
          }
        }

