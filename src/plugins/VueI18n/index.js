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
        },
        name: 'cola',
    },
    ja: {
        navigationbar: {
            characteristicintroduction: 'キャラクタライゼーション',
        },
        navigationbarItem:{
            servicestandards: 'サービス基準',
            serviceflow: 'サービスの流れ',
            dataentry: 'データ入力',
            urbangreenspaceextraction: 'Urban green space extraction',
        },
        name: 'コーラ',
    },
};

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'ja', // 设置默认地区
    messages, // 设置配置信息
});

export default i18n;
