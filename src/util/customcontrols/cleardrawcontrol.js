import {Control} from 'ol/control';

// 自定义的清除绘制按钮
export class ClearDrawControl extends Control {
  /**
   * @param {Object} [opt_options] Control options.
   */
  constructor(opt_options) {
    const options = opt_options || {};
    var button = document.getElementsByClassName('clear-draw button')[0];
    var element = document.getElementsByClassName('clear-draw ol-unselectable ol-control')[0];
    super({
      element: element,
      target: options.target,
    });
    this.draw = opt_options["draw"];
    this.isDrawingRoiFlag = opt_options["isDrawingRoiFlag"];
    this.userDrawnPolygons = opt_options["userDrawnPolygons"];
    this.source = opt_options["source"];
    this.measureOverlayIndexArray = opt_options["measureOverlayIndexArray"];
    this.currentOverlayIndex = opt_options["currentOverlayIndex"];
    button.addEventListener('click', this.handleClearDraw.bind(this), false);
  }
  handleClearDraw() {
      this.getMap().removeInteraction(this.draw.draw);
      // 判断用户现在处于正在绘制状态还是处于绘制完成状态
      // 用户绘制完一个roi的状态
      if(this.isDrawingRoiFlag.isDrawingRoiFlag == false){
        /**
         * 用户当前想要删除的polygon。
         * @type {object}
         */
        // 用户绘制的roi个数大于零
        if(this.userDrawnPolygons.userDrawnPolygons.length > 0){
          // 找到并删除roi
          let targetDeletePolygon = this.userDrawnPolygons.userDrawnPolygons.pop();
          this.source.source.removeFeature(targetDeletePolygon);
        }
        // 获取Overlayes数组
        let olLyrs = this.getMap().getOverlays().getArray();
        // 获取Overlays数组长度
        let olLyrsLength = this.getMap().getOverlays().getArray().length;
        console.log(olLyrsLength);
        // 记录测量Overlay序号的数组不为空时执行
        if(this.measureOverlayIndexArray.measureOverlayIndexArray.length > 0){
          this.measureOverlayIndexArray.measureOverlayIndexArray.pop();
          this.getMap().removeOverlay(olLyrs[this.measureOverlayIndexArray.measureOverlayIndexArray.pop()]);
          this.currentOverlayIndex.currentOverlayIndex = this.currentOverlayIndex.currentOverlayIndex - 1;
          // console.log("this.currentOverlayIndex.currentOverlayIndex", this.currentOverlayIndex.currentOverlayIndex);
      }
      // 用户正在绘制的roi的状态
      } else {
        let olLyrs = this.getMap().getOverlays().getArray();
        let olLyrsLength = this.getMap().getOverlays().getArray().length;
        console.log(olLyrsLength);
        if(this.measureOverlayIndexArray.measureOverlayIndexArray.length > 0){
          this.getMap().removeOverlay(olLyrs[this.measureOverlayIndexArray.measureOverlayIndexArray.pop()]);
          this.currentOverlayIndex.currentOverlayIndex = this.currentOverlayIndex.currentOverlayIndex - 1;
        }
        this.isDrawingRoiFlag.isDrawingRoiFlag = false;
      }
      if(this.userDrawnPolygons.userDrawnPolygons.length == 0){
       this.helpTooltipElement.helpTooltipElement.innerHTML = '';
       this.helpTooltipElement.helpTooltipElement = null;
      }
  }
}