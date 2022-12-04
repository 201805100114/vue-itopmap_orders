import {Control} from 'ol/control';
import $ from 'jquery'
// 自定义的图层切换控件
export class LayersControl extends Control {
  /**
   * @param {Object} [opt_options] Control options.
   */
  constructor(opt_options) {
    const options = opt_options || {};
    var element = document.getElementById('layers');
    super({
      element: element,
      target: options.target,
    });
    this.element = element;
    this.baseMap = opt_options["baseMap"];
    this.overlay = opt_options["overlay"];
    
    // 容器
    this.element.addEventListener('mouseover', this.handleOnMouseOver.bind(this), false);
    this.element.addEventListener('mouseleave', this.handleOnMouseLeave.bind(this), false);

    // 监听 鼠标悬浮高亮，鼠标离开取消高亮，鼠标点击时切换底图
    var bmapGemArray = $('.bmapGem');
    for (let i = 0; i < bmapGemArray.length; i++) {
      let bmapGem = bmapGemArray[i];
      bmapGem.addEventListener('mouseover', this.handleBmapGemOnMouseOver.bind(this), false);
      bmapGem.addEventListener('mouseleave', this.handleBmapGemOnMouseLeave.bind(this), false);
      bmapGem.addEventListener('click', this.handleBmapGemOnClick.bind(this), false);
    }

    // 监听 鼠标悬浮高亮，鼠标离开取消高亮，鼠标点击时切换Overlay
    var overlayGemArray = $('.overlayGem');
    for (let i = 0; i < overlayGemArray.length; i++) {
      let overlayGem = overlayGemArray[i];
      this.overlayGem = overlayGem;
      overlayGem.addEventListener('mouseover', this.handleOverlayGemOnMouseOver.bind(this), false);
      overlayGem.addEventListener('mouseleave', this.handleOverlayGemOnMouseleave.bind(this), false);
      overlayGem.addEventListener('click', this.handleOverlayGemOnClick.bind(this), false);
    }
  }
  handleOnMouseOver(event){
    let target = event.target;
    if(target.nodeName == "IMG"){
      target = event.target.parentNode;
    }
    let content = $('#lyscontent');
    target.style.opacity = 1;
    content.show(100);
  }
  handleOnMouseLeave(event){
    let target = event.target;
    if(target.nodeName == "IMG"){
      target = event.target.parentNode;
    }
    let content = $('#lyscontent');
    content.hide(100);
    target.style.opacity = 0.8;
  }
  handleBmapGemOnMouseOver(event){
    //console.log(event.target);
    let target = event.target;
    if(target.nodeName == "IMG"){
      target = event.target.parentNode;
    }
    target.style.border = '2px #4682b4 solid';
  }
  handleBmapGemOnMouseLeave(event){
    let target = event.target;
    if(target.nodeName == "IMG"){
      target = event.target.parentNode;
    }
    target.style.border = '1px #ccc solid';
  }
  handleBmapGemOnClick(event){
    let target = event.target;
    if(target.nodeName == "IMG"){
      target = event.target.parentNode;
    }
    this.baseMap.baseMap = target.id;
  }
  handleOverlayGemOnMouseOver(event){
    let target = event.target;
    if(target.nodeName == "IMG"){
      target = event.target.parentNode;
    }
    target.style.border = '2px #4682b4 solid';
  }
  handleOverlayGemOnMouseleave(event){
    let target = event.target;
    if(target.nodeName == "IMG"){
      target = target.parentNode;
    }
    target.style.border = '1px #ccc solid';
  }
  handleOverlayGemOnClick(event){
    let target = event.target;
    if(target.nodeName == "IMG"){
      target = event.target.parentNode;
    }
    this.overlay.overlay = target.id;
  }
}