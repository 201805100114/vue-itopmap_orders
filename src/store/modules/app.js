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
            title: 'navigationbar.characteristicintroduction',
            icon: 'mdi-view-dashboard',
            to: '/doc/introduction',
            items: [
                {
                    title: 'navigationbarItem.servicestandards',
                    icon: '',
                    to: '/doc/introduction/biaozhun',
                },
                {
                    title: 'navigationbarItem.serviceflow',
                    icon: '',
                    to: '/doc/introduction/liucheng',
                },],
        },
        {
            title: 'navigationbar.spatialdatamanagement',
            icon: 'mdi-view-dashboard',
            to: '/useraccountmanage/',
            items: [
                {
                    title: 'navigationbarItem.dataentry',
                    icon: 'mdi-database-plus-outline',
                    to: '/useraccountmanage/adddata/',
                }
            ],
        },
        {
            id: 'extract',
            title: 'navigationbar.extractionofinformationonthematicelements',
            icon: 'mdi-clipboard-outline',
            to: '/examples/',
            items: [
                {
                    icon: '',
                    title: 'navigationbarItem.urbangreenspaceextraction',
                    to: '/examples/landcover1/'
                },
                {
                    title: 'navigationbarItem.urbanwaterbodyextraction',
                    to: '/examples/landcover2/'
                },
                {
                    title: 'navigationbarItem.urbanbuildingextraction',
                    to: '/examples/landcover3/'
                },
                {
                    title: 'navigationbarItem.urbanroadextraction',
                    to: '/examples/landcover4/'
                },
                {
                    title: 'navigationbarItem.agriculturalplotextraction',
                    to: '/examples/landcover5/'
                }],
        },
        {
            id: 'extract',
            title: 'navigationbar.otherremotesensinginformationextraction',
            icon: 'mdi-cube',
            to: '/examples/',
            items: [
                {
                    title: 'navigationbarItem.Changedetectionconstructionland',
                    icon: '',
                    to: '/examples/landcover6/',
                },
                {
                    title: 'navigationbarItem.ecovalueproducts',
                    icon: '',
                    to: '/examples/landcover7/',
                },
            ],
        },
        {
            title: 'navigationbar.aboutus',
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
