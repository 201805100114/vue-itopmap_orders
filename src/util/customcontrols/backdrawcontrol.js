  import {Control} from 'ol/control';
  
  // 自定义的撤销绘制按钮
  export class BackDrawControl extends Control {
      /**
       * @param {Object} [opt_options] Control options.
       */
      constructor(opt_options) {
        const options = opt_options || {};
        var button = document.getElementsByClassName('back-draw button')[0];
        var element = document.getElementsByClassName('back-draw ol-unselectable ol-control')[0];
        super({
          element: element,
          target: options.target,
        });
        this.draw = opt_options["draw"];
        button.addEventListener('click', this.handleBackDraw.bind(this), false);
      }
      handleBackDraw() {
        this.getMap();
        if(this.draw.draw){
          this.draw.draw.removeLastPoint();
        }
        //this.draw.draw
      }
    }