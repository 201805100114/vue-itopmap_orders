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
              const button = document.createElement('button');
              button.innerHTML = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M9.75 20.85C11.53 20.15 11.14 18.22 10.24 17C9.35'
              + ' 15.75 8.12 14.89 6.88 14.06C6 13.5 5.19 12.8 4.54 12C4.26 11.67 3.69 11.06 4.27 10.94C4.86 10.82 5.88 11.4 6.4 11.62C7.31 12 8.21 12.44 9.05 12.96L10.06 11.26C8.5 10.23 6.5 9.32 4.64 9.05C3.58 8.89 2.46 9.11 2.1 10.26C1.78 11.25 2.29 12.25 2.87 13.03C4.24 14.86 6.37 15.74 7.96 17.32C8.3 17.65 8.71 18.04 8.91 18.5C9.12 18.94 9.07 18.97 8.6 18.97C7.36 18.97 5.81 18 4.8 17.36L3.79 19.06C5.32 20 7.88 21.47 9.75 20.85M20.84 5.25C21.06 5.03 21.06 4.67 20.84 4.46L19.54 3.16C19.33 2.95 18.97 2.95 18.76 3.16L17.74 4.18L19.82 6.26M11 10.92V13H13.08L19.23 6.85L17.15 4.77L11 10.92Z" /></svg>';
              const element = document.createElement('div');
              element.className = 'start-draw ol-unselectable ol-control';
              element.appendChild(button);
              var style = document.createElement('style');
              style.type="text/css";
              style.appendChild(document.createTextNode(".start-draw { top: 90px; left: 1.7em;} .ol-touch"));
              document.body.appendChild(style);
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

