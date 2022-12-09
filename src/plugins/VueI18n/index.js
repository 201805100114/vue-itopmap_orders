// src/plugins/VueI18n/index.js：
import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

// 定义各语言的配置
const messages = {
    zn: {
        message: {
            hello: '你好，世界',
        },
        name: '可乐',
    },
    en: {
        message: {
            hello: 'hello world',
        },
        name: 'cola',
    },
    ja: {
        message: {
            hello: 'こんにちは、世界',
        },
        name: 'コーラ',
    },
};

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'zn', // 设置默认地区
    messages, // 设置配置信息
});

export default i18n;
