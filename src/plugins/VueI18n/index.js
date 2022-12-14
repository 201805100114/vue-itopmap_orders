// src/plugins/VueI18n/index.js：
import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

// 定义各语言的配置
const messages = {
    zn: {
        navigationbar: {
            characteristicintroduction: '特性介绍',
            spatialdatamanagement: '空间数据管理',
            extractionofinformationonthematicelements: '专题要素信息提取',
            otherremotesensinginformationextraction: '其他遥感信息提取',
            aboutus: '关于我们'
        },
        navigationbarItem:{
            servicestandards: '服务标准',
            serviceflow: '服务流程',
            dataentry: '数据入库',
            urbangreenspaceextraction: '城市绿地提取',
            urbanwaterbodyextraction: '城市水体提取',
            urbanbuildingextraction: '城市建筑提取',
            urbanroadextraction: '城市道路提取',
            agriculturalplotextraction: '农业地块提取',
            Changedetectionconstructionland: '变化检测',
            ecovalueproducts: '生态价值产品'
        },
        mapinfoItem: {
            urbangreenspaceextraction: {
                Informationontheboundariesofgreenspacessuchasparkstreesandmeadowsinthecity: '城市内公园、树木、草地等绿地边界信息',
                datasourcehighresolutionimageslices:'数据源：高分辨率影像切片',
            }
        },
        name: '可乐',
    },
    en: {
        navigationbar: {
            characteristicintroduction: 'characteristic introduction',
            spatialdatamanagement: 'spatial datamanagement',
            extractionofinformationonthematicelements: 'Extraction of information on thematic elements',
            otherremotesensinginformationextraction: 'Other remote sensing information extraction',
            abouts: 'About us',
        },
        navigationbarItem:{
            servicestandards: 'Service standards',
            serviceflow: 'Service flow',
            dataentry: 'Data entry',
            urbangreenspaceextraction: 'Urban green space extraction',
            urbanwaterbodyextraction: 'Urban water body extraction',
            urbanbuildingextraction: 'Urban Building Extraction',
            urbanroadextraction: 'Urban Road Extraction',
            agriculturalplotextraction: 'Agricultural plot extraction',
            changedetectionconstructionland: 'Change detection (construction land)',
            ecovalueproducts: 'Eco-value products'
        },
        mapinfoItem: {
            urbangreenspaceextraction: {
                Informationontheboundariesofgreenspacessuchasparkstreesandmeadowsinthecity: 'Information on the boundaries of green spaces such as parks, trees and meadows in the city',
                datasourcehighresolutionimageslices: 'Data source: High-resolution image slices'
            }
        },
        name: 'cola',
    },
};

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'zn', // 设置默认地区
    messages, // 设置配置信息
});

export default i18n;
