import data from "../store/modules/app"
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import * as olProj from 'ol/proj';
import 'ol/ol.css';
import WMTS from 'ol/source/WMTS'
import Projection from 'ol/proj/Projection';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import {getArea} from 'ol/sphere';
import Overlay from 'ol/Overlay';
import {getRenderPixel} from 'ol/render';
import {defaults as defaultControls} from 'ol/control';

export function addOver() {
    if (!document.getElementsByClassName('overDiv')[0]) {
        let overDiv = document.createElement('div');
        let app = document.getElementsByClassName('v-application')[0];
        app.appendChild(overDiv);
        overDiv.style.width = '100%';
        overDiv.style.height = '100%';
        overDiv.style.backgroundColor = 'black';
        overDiv.style.opacity = '0.5';
        overDiv.style.position = 'fixed';
        overDiv.style.zIndex = '998';
        overDiv.className = 'overDiv';
    }
}

export function removeOver() {
    let app = document.getElementsByClassName('v-application')[0];
    let overDiv = document.getElementsByClassName('overDiv')[0];
    if (overDiv) {
        app.removeChild(overDiv);
    }
}

/** 监听各个flag变化 **/
export function watchShowFlag() {
    // 固定SwipMap不变, 点击MapInfoCard旁的折叠按钮不需要调整SwipMap的比例
    changeVMainStyle();
    changeMapContainerStyle();
    changeArrowButtonStyle();
    // data.state.appBarStyle = changeAppStyle()
}

/** 控制appbar显示比例, 具有扩展性 --libin **/
export function changeAppStyle() {
    if (data.state.leftCardShowFlag) {
        // return {'z-index': 999, left: '350px'}
        return {'z-index': 999, left: '0px'}
    } else {
        if (data.state.navigationShowFlag) {
            // return {'z-index': 999, left: '256px'}
            return {'z-index': 999, left: '0px'}
        } else {
            // return {'z-index': 999, left: '0px'}
            return {'z-index': 999, left: '0px'}
        }
    }
}

/**
 *  在点击MapInfoCard旁的折叠按钮时，不调整右侧的地图(SwipMap)比例
 * **/
export function changeVMainStyle() {
    let element = document.getElementsByClassName('v-main')[0];
    if (element) {
        if (data.state.leftCardShowFlag) {
            // element.style.paddingLeft = '350px'
            element.style.paddingLeft = '0px';
        } else if (data.state.navigationShowFlag) {
            // element.style.paddingLeft = '256px'
            element.style.paddingLeft = '0px';
        } else {
            element.style.paddingLeft = '0px';
        }
    }
}

export function changeMapContainerStyle() {
    let mapContainer = document.getElementsByClassName('map-container')[0]
    if (mapContainer) {
        if (data.state.leftCardShowFlag) {
            mapContainer.style.width = '100%';
            mapContainer.style.left = '0%';
        } else if (data.state.navigationShowFlag) {
            mapContainer.style.width = '100%';
            mapContainer.style.left = '0%';
        } else {
            mapContainer.style.width = '100%';
            mapContainer.style.left = '0%';
        }
    }
}

// 点击箭头按钮
export function changeArrowButtonStyle() {
    let arrowButton = document.getElementById('arrow-button');
    if (arrowButton) {
        if (data.state.leftCardShowFlag) {
            data.state.arrowShowFlag = true;
            arrowButton.style.left = '350px';
        } else if (data.state.navigationShowFlag) {
            data.state.arrowShowFlag = false;
        } else {
            data.state.arrowShowFlag = true;
            arrowButton.style.left = '0px';
        }
    }
}

// 当前代码块可在tilelayers预览右键查看源代码查看 --libin
export function setSource(layerName) {
    const resolutions = [0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 6.866455078125E-4, 3.4332275390625E-4, 1.71661376953125E-4, 8.58306884765625E-5, 4.291534423828125E-5, 2.1457672119140625E-5, 1.0728836059570312E-5, 5.364418029785156E-6, 2.682209014892578E-6, 1.341104507446289E-6, 6.705522537231445E-7, 3.3527612686157227E-7]
    const gridNames = ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8', 'EPSG:4326:9', 'EPSG:4326:10', 'EPSG:4326:11', 'EPSG:4326:12', 'EPSG:4326:13', 'EPSG:4326:14', 'EPSG:4326:15', 'EPSG:4326:16', 'EPSG:4326:17', 'EPSG:4326:18', 'EPSG:4326:19', 'EPSG:4326:20', 'EPSG:4326:21']
    const baseParams = ['VERSION', 'LAYER', 'STYLE', 'TILEMATRIX', 'TILEMATRIXSET', 'SERVICE', 'FORMAT']
    const baseUrl = 'https://geo.culturalmapofcdutyouth.com/geoserver/gwc/service/wmts'
    let params = {
        'VERSION': '1.0.0',
        'LAYER': layerName,
        'STYLE': '',
        'TILEMATRIX': gridNames,
        'TILEMATRIXSET': 'EPSG:4326',
        'SERVICE': 'WMTS',
        'FORMAT': 'image/png',
    };

    var url = baseUrl + '?';
    for (var param in params) {
        if (baseParams.indexOf(param.toUpperCase()) < 0) {
            url = url + param + '=' + params[param] + '&';
        }
    }
    url = url.slice(0, -1);
    return new WMTS({
        url: url,
        layer: params['LAYER'],
        matrixSet: params['TILEMATRIXSET'],
        format: params['FORMAT'],
        projection: new Projection({
            code: 'EPSG:4326',
            units: 'degrees',
            axisOrientation: 'neu'
        }),
        tileGrid: new WMTSTileGrid({
            tileSize: [256, 256],
            extent: [-180.0, -90.0, 180.0, 90.0],   // 修改可将其限制在一定范围内
            origin: [-180.0, 90.0],
            resolutions: resolutions,
            matrixIds: params['TILEMATRIX']
        }),
        style: params['STYLE'],
        wrapX: true,
        crossOrigin: 'anonymous'
    });
}

// layerName为工作区加图层名
export function swipe(leftLayerName, rightLayerName, extent, mapDivId, swipeDivId) {
    // center of map
    const center = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2]
    let oriSource = setSource(leftLayerName)
    let resultSource = setSource(rightLayerName)
    var oriLayer = new TileLayer({
        preLoad: 0,
        source:oriSource,
    });
    var resultLayer = new TileLayer({
        preLoad: 0,
        source: resultSource,
    });

    var map = new Map({
        controls: defaultControls({ attribution: false, zoom: true, rotate: false }),
        layers: [oriLayer, resultLayer],
        target: mapDivId,
        view: new View({
            center: olProj.fromLonLat(center),
            extent: olProj.transformExtent(extent, 'EPSG:4326','EPSG:3857'),
            zoom: 12,
            maxZoom: 17
        })
    })    
    var swipe = document.getElementById(swipeDivId)
    resultLayer.on('prerender', (event)=> {
        const ctx = event.context;
        const mapSize = map.getSize();
        const width = mapSize[0] * (swipe.value / 100);
        const tl = getRenderPixel(event, [width, 0]);
        const tr = getRenderPixel(event, [mapSize[0], 0]);
        const bl = getRenderPixel(event, [width, mapSize[1]]);
        const br = getRenderPixel(event, mapSize);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(tl[0], tl[1]);
        ctx.lineTo(bl[0], bl[1]);
        ctx.lineTo(br[0], br[1]);
        ctx.lineTo(tr[0], tr[1]);
        ctx.closePath();
        ctx.clip();
    })
    resultLayer.on('postrender', function (event) {
        const ctx = event.context;
        ctx.restore();
    });
    var listener = function () {
        map.render();
    };
    swipe.addEventListener('input', listener);
    swipe.addEventListener('change', listener);    
}

// 给地图添加测量结果  
export function createMeasureTooltip(measureTooltipElement) {
    // 这里能拿到 currentOverlayIndex.currentOverlayIndex
    if (measureTooltipElement.measureTooltipElement) {
        measureTooltipElement.measureTooltipElement.parentNode.removeChild(measureTooltipElement.measureTooltipElement);
    }
    measureTooltipElement.measureTooltipElement = document.createElement('div');
    measureTooltipElement.measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
    var measureTooltip = null;
    let createMeasureTooltipElement = measureTooltipElement;
    measureTooltip = new Overlay({
    element: createMeasureTooltipElement.measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center',
        stopEvent: false,
        insertFirst: false,
    });
    return measureTooltip;
}

  /**
     * Format area output.
     * @param {Polygon} polygon The polygon.
     * @return {string} Formatted area.
     */
export function formatArea(polygon) {
    const area = getArea(polygon);
    if(area == 0) {
      return ""
    }
    let output;
    if (area > 10000) {
      output = Math.round((area / 1000000) * 100) / 100 + ' ' + '平方千米';
    } else {
      output = Math.round(area * 100) / 100 + ' ' + '平方米';
    } 
    return output;
}

export function createHelpTooltip(helpTooltipElement) {
    if (helpTooltipElement.helpTooltipElement) {
      helpTooltipElement.helpTooltipElement.parentNode.removeChild(helpTooltipElement.helpTooltipElement);
    }
    helpTooltipElement.helpTooltipElement = document.createElement('div');
    helpTooltipElement.helpTooltipElement.className = 'ol-tooltip hidden';
    var helpTooltip = null;
    let createHelpTooltipElement = helpTooltipElement;
    helpTooltip = new Overlay({
        element: createHelpTooltipElement.helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left',
    });
    return helpTooltip;
}