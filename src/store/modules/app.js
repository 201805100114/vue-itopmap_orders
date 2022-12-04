// Pathify
import {make} from 'vuex-pathify'

// Data
const state = {
    navigationShowFlag: false,
    // MapInfoCard地图固定 --libin
    leftCardShowFlag: false,
    formShowFlag: false,
    appBarStyle: null,
    arrowShowFlag: true,
    detailCardShowFlag: false,
    drawerImage: true,
    mini: false,
    // 路由相关信息 --libin
    items: [
        {
            title: '特性介绍',
            icon: 'mdi-view-dashboard',
            to: '/doc/introduction',
            items: [
                {
                    title: '1-服务标准',
                    icon: '',
                    to: '/doc/introduction/biaozhun',
                },
                {
                    title: '2-服务流程',
                    icon: '',
                    to: '/doc/introduction/liucheng',
                },],
        },
        {
            title: '空间数据管理',
            icon: 'mdi-view-dashboard',
            to: '/useraccountmanage/',
            items: [
                {
                    title: '1-数据入库',
                    icon: 'mdi-database-plus-outline',
                    to: '/useraccountmanage/adddata/',
                }
            ],
        },
        {
            id: 'extract',
            title: '专题要素信息提取',
            icon: 'mdi-clipboard-outline',
            to: '/examples/',
            items: [
                {
                    icon: '',
                    title: '1-城市绿地提取',
                    to: '/examples/landcover1/'
                },
                {
                    title: '2-城市水体提取',
                    to: '/examples/landcover2/'
                },
                {
                    title: '3-城市建筑提取',
                    to: '/examples/landcover3/'
                },
                {
                    title: '4-城市道路提取',
                    to: '/examples/landcover4/'
                },
                {
                    title: '5-农业地块提取',
                    to: '/examples/landcover5/'
                }],
        },
        {
            id: 'extract',
            title: '其他遥感信息提取',
            icon: 'mdi-cube',
            to: '/examples/',
            items: [
                {
                    title: '6-变化检测（建设用地）',
                    icon: '',
                    to: '/examples/landcover6/',
                },
                {
                    title: '7-生态价值产品',
                    icon: '',
                    to: '/examples/landcover7/',
                },
            ],
        },
        {
            title: '关于我们',
            icon: 'mdi-rugby',
            to: '/about/',
        },
    ],
}

const mutations = make.mutations(state)

const actions = {
    ...make.actions(state),
    // eslint-disable-next-line no-unused-vars
    init: async ({dispatch}) => {
        //
    },
}

const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
