// Pathify
// import { mdiEarth } from '@mdi/js'
import { make } from 'vuex-pathify'
// 修改折叠其他字典
const state = {
    maps:[
        {
            //id, 用于匹配路由路径
            id: "landcover1",
            //map, 地图参数
            map:
                {
                    lefturl: 'Order:01_origin',
                    righturl: 'Order:01_result',
                    extent: [102.99997502565384,30.63120648264885,105.03923586010933,30.666814148426056]
                },
            //info, 地图卡片参数
            info:
                {
                    imgUrl:"https://cdn.jsdelivr.net/gh/Napier7/Picgo/itopmap-order/1-green.jpg",
                    title: "navigationbarItem.urbangreenspaceextraction",
                    //数据描述（对应卡片中标题下的灰色字体）
                    description:"mapinfoItem.urbangreenspaceextraction.Informationontheboundariesofgreenspacessuchasparkstreesandmeadowsinthecity",
                    //数据信息（与卡片中的List title对应）
                    items:
                        [
                            {icon: 'mdi-heart', text: "mapinfoItem.urbangreenspaceextraction.datasourcehighresolutionimageslices"},
                            {icon: 'mdi-table', text: "分辨率：1.34e-06 d / 0.5 m"},
                            {icon: 'mdi-archive-clock', text: "覆盖范围",detail:[
                                    {text: 'QAI：***'},
                                    {text: 'Recoll：***'},
                                    {text: 'Fi_Score：***'},
                                ]},
                            {icon: 'mdi-archive-clock', text: "获取时间"},
                            {icon: 'mdi-archive-clock', text: "提取精度", detail:[
                                    {text: 'QA：***'},
                                    {text: 'Recoll：***'},
                                    {text: 'Fi_Score：***'},
                                    {text: 'lol：***'},
                                ]},
                            {icon: 'mdi-chart-line', text: "数据格式：（点、线、面）矢量、栅格"},
                        ],
                    //可用模型（与卡片对应）
                    models:["UNet", "DLinkNet", "PSPNet", 'HRNet', 'Swin-Transformer']
                }
        },
        {
            id: "landcover2",
            map:
                {
                    lefturl: 'Order:02_origin',
                    righturl: 'Order:02_result',
                    extent: [103.000000,30.416,105.125000,30.500000]
                },
            info:
                {
                    imgUrl:"https://s3.bmp.ovh/imgs/2022/03/941ef347e2d44195.jpg",
                    title: "navigationbarItem.urbanwaterbodyextraction",
                    description:"",
                    items:
                        [
                            {icon: 'mdi-heart', text: "数据源：高分辨率影像切片"},
                            {icon: 'mdi-table', text: "分辨率：1.34e-06 d / 0.5 m"},
                            {icon: 'mdi-archive-clock', text: "覆盖范围"},
                            {icon: 'mdi-archive-clock', text: "获取时间"},
                            {icon: 'mdi-archive-clock', text: "提取精度"},
                            {icon: 'mdi-chart-line', text: "数据格式：（点、线、面）矢量、栅格"},
                        ],
                    //可用模型（与卡片对应）
                    models:["UNet", "DLinkNet", "PSPNet", 'HRNet', 'Swin-Transformer']
                }
        },
        {
            id: "landcover3",
            map:
                {
                    lefturl: 'Order:03_origin',
                    righturl: 'Order:03_result',
                    extent: [115.4512586593628,39.8638379573822,117.47271633148193,39.88529562950134]
                },
            info:
                {
                    imgUrl:"https://s3.bmp.ovh/imgs/2022/03/2bb440794a0ed62e.jpg",
                    title: "navigationbarItem.urbanbuildingextraction",
                    description:"",
                    items:
                        [
                            {icon: 'mdi-heart', text: "数据源：高分辨率影像切片"},
                            {icon: 'mdi-table', text: "分辨率：1.34e-06 d / 0.5 m"},
                            {icon: 'mdi-archive-clock', text: "覆盖范围"},
                            {icon: 'mdi-archive-clock', text: "获取时间"},
                            {icon: 'mdi-archive-clock', text: "提取精度"},
                            {icon: 'mdi-chart-line', text: "数据格式：（点、线、面）矢量、栅格"},
                        ],
                    //可用模型（与卡片对应）
                    models:["UNet", "DLinkNet", "PSPNet", 'HRNet', 'Swin-Transformer']
                }
        },
        {
            id: "landcover4",
            map:
                {
                    lefturl: 'Order:04_origin',
                    righturl: 'Order:04_result',
                    extent: [103.44290161132812,31.537628173828125,105.56649780273438, 31.680450439453125]
                },
            info:
                {
                    imgUrl:"https://s3.bmp.ovh/imgs/2022/03/0c906bc1d36edc80.jpg",
                    title: "navigationbarItem.urbanroadextraction",
                    description:"",
                    items:
                        [
                            {icon: 'mdi-heart', text: "数据源：高分辨率影像切片"},
                            {icon: 'mdi-table', text: "分辨率：1.34e-06 d / 0.5 m"},
                            {icon: 'mdi-archive-clock', text: "覆盖范围"},
                            {icon: 'mdi-archive-clock', text: "获取时间"},
                            {icon: 'mdi-archive-clock', text: "提取精度"},
                            {icon: 'mdi-chart-line', text: "数据格式：（点、线、面）矢量、栅格"},
                        ],
                    //可用模型（与卡片对应）
                    models:["UNet", "DLinkNet", "PSPNet", 'HRNet', 'Swin-Transformer']
                }
        },
        {
            id: "landcover5",
            map:
                {
                    lefturl: 'Order:05_origin',
                    righturl: 'Order:05_result',
                    extent: [104.828031125696,29.87627039999999,106.93544072569601, 29.9706984]
                },
            info:
                {
                    imgUrl:"https://s3.bmp.ovh/imgs/2022/03/bfe4171044b63193.webp",
                    title: "navigationbarItem.agriculturalplotextraction",
                    description:"",
                    items:
                        [
                            {icon: 'mdi-heart', text: "数据源：高分辨率影像切片"},
                            {icon: 'mdi-table', text: "分辨率：1.34e-06 d / 0.5 m"},
                            {icon: 'mdi-archive-clock', text: "覆盖范围"},
                            {icon: 'mdi-archive-clock', text: "获取时间"},
                            {icon: 'mdi-archive-clock', text: "提取精度"},
                            {icon: 'mdi-chart-line', text: "数据格式：（点、线、面）矢量、栅格"},
                        ],
                    //可用模型（与卡片对应）
                    models:["UNet", "DLinkNet", "PSPNet", 'HRNet', 'Swin-Transformer']
                },
        },
        {
            id: "landcover6",
            map:
                {
                    lefturl: 'Order:06_origin_before',
                    righturl: 'Order:06_result&after',
                    extent: [171.55896317156083,-43.55939727656563,173.57140822352105, -43.550346238656715]
                },
            info:
                {
                    imgUrl:"https://s3.bmp.ovh/imgs/2022/03/2bb440794a0ed62e.jpg",
                    title: "变化检测（建设用地）",
                    description:"",
                    items:
                        [
                            {icon: 'mdi-heart', text: "数据源：高分辨率影像切片"},
                            {icon: 'mdi-table', text: "分辨率：1.34e-06 d / 0.5 m"},
                            {icon: 'mdi-archive-clock', text: "覆盖范围"},
                            {icon: 'mdi-archive-clock', text: "获取时间"},
                            {icon: 'mdi-archive-clock', text: "提取精度"},
                            {icon: 'mdi-chart-line', text: "数据格式：（点、线、面）矢量、栅格"},
                        ],
                    //可用模型（与卡片对应）
                    models:["UNet", "DLinkNet", "PSPNet", 'HRNet', 'Swin-Transformer']
                },
        },
        {
            id: "landcover7",
            map:
                {
                    // 无数据 （用绿地数据占位）
                    lefturl: 'Order:09_origin',
                    righturl: 'Order:09_result',
                    extent: [119.472014,30.594255,121.493325,30.612688]
                },
            info:
                {
                    imgUrl:"",
                    title: "变化检测（林地）",
                    description:"",
                    items:
                        [
                            {icon: 'mdi-heart', text: "数据源：Google Earth 影像"},
                            {icon: 'mdi-table', text: "分辨率：1.34e-06 d / 0.5 m"},
                            {icon: 'mdi-archive-clock', text: "覆盖范围"},
                            {icon: 'mdi-archive-clock', text: "获取时间"},
                            {icon: 'mdi-archive-clock', text: "提取精度"},
                            {icon: 'mdi-chart-line', text: "数据格式：（点、线、面）矢量、栅格"},
                        ],
                    //可用模型（与卡片对应）
                    models:["UNet", "DLinkNet", "PSPNet", 'HRNet', 'Swin-Transformer']
                },
        },
          //8
        {
            id: "landcover8",
            map:
                {
                    // 无数据 （用绿地数据占位）
                    lefturl: 'Order:01_origin',
                    righturl: 'Order:01_result',
                    extent: [103.99997502565384,30.63120648264885,104.03923586010933,30.666814148426056]
                },
            info:
                {
                    imgUrl:"",
                    title: "土地覆盖分类",
                    description:"",
                    items:
                        [
                            {icon: 'mdi-heart', text: "数据源：Google Earth 影像"},
                            {icon: 'mdi-table', text: "分辨率：1.34e-06 d / 0.5 m"},
                            {icon: 'mdi-archive-clock', text: "覆盖范围"},
                            {icon: 'mdi-archive-clock', text: "获取时间"},
                            {icon: 'mdi-archive-clock', text: "提取精度"},
                            {icon: 'mdi-chart-line', text: "数据格式：（点、线、面）矢量、栅格"},
                        ],
                    //可用模型（与卡片对应）
                    models:["UNet", "DLinkNet", "PSPNet", 'HRNet', 'Swin-Transformer']
                },
        },
         //9
        {
            id: "landcover9",
            map:
                {
                    lefturl: 'Order:09_origin',
                    righturl: 'Order:09_result',
                    extent: [117.79062313580414,29.396149033934808,119.84265813580414, 29.441709033934806]
                },
            info:
                {
                    imgUrl:"https://www.corporateknights.com/wp-content/uploads/2021/12/photojoiner_photo-16.jpeg",
                    title: "生态价值产品",
                    description:"",
                    items:
                        [
                            {icon: 'mdi-heart', text: "数据源：高分辨率影像切片"},
                            {icon: 'mdi-table', text: "分辨率：1.34e-06 d / 0.5 m"},
                            {icon: 'mdi-archive-clock', text: "覆盖范围"},
                            {icon: 'mdi-archive-clock', text: "获取时间"},
                            {icon: 'mdi-archive-clock', text: "提取精度"},
                            {icon: 'mdi-chart-line', text: "数据格式：（点、线、面）矢量、栅格"},
                        ],
                    //可用模型（与卡片对应）
                    models:["UNet", "DLinkNet", "PSPNet", 'HRNet', 'Swin-Transformer']
                },
        },
    ],
}

const mutations = make.mutations(state)

const actions = {}

const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
