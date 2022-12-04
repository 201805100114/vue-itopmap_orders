import "leaflet/dist/leaflet.css"
import * as L from "leaflet"
import 'leaflet-side-by-side'

const createMap = (divId, options) => {
    
    let map = L.map(divId, options); 

    
    return map;
};

//添加创建地图的函数
const createTileLayer = (map, url, options) => {
    let tileLayer = L.tileLayer(url, options);
    tileLayer.addTo(map);
    return tileLayer;
};

//卷帘，compare-side-by-side函数
const compareSBS = (mapLayer1, mapLayer2, map, options) => {
    let compareLayer = L.control.sideBySide(mapLayer1, mapLayer2, options).addTo(map);
    let em = document.getElementsByClassName('map-container')[0];
    let el = document.getElementsByClassName('leaflet-sbs-range')[0].style;
    let ed = document.getElementsByClassName('leaflet-sbs-divider')[0].style;
    el.position = 'relative'
    el.top = em.offsetHeight/2 - 10 + 'px' 
    ed.position = 'relative'   
    return compareLayer;
};

//test
export default { 
    createMap,
    createTileLayer,
    compareSBS
};