  import {Control} from 'ol/control';
  
  // 自定义的撤销绘制按钮
  export class BackDrawControl extends Control {
      /**
       * @param {Object} [opt_options] Control options.
       */
      constructor(opt_options) {
        const options = opt_options || {};
        const button = document.createElement('button');
        button.innerHTML = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M12,3A9,9 0 0,0 3,12H0L4,16L8,12H5A7,7 0 0,1 12,5A7,7 0 0,'
        + '1 19,12A7,7 0 0,1 12,19C10.5,19 9.09,18.5 7.94,17.7L6.5,19.14C8.04,20.3 9.94,21 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M14,12A2,2 0 0,0 12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12Z" /></svg>';
        const element = document.createElement('div');
        element.className = 'back-draw ol-unselectable ol-control';
        element.appendChild(button);
        var style = document.createElement('style');
        style.type="text/css";
        style.appendChild(document.createTextNode(".back-draw { top: 125px; left: 1.7em;} .ol-touch"));
        document.body.appendChild(style);
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