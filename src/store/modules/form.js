/**
 * @author: Sun
 * @date: 2022-03-20 14:37
 * @description:
 */
import { make } from 'vuex-pathify'

const state = {
    customExtractshowFlag: false,
    customExtractModelShowFlag: false,
    customExtractImageShowFlag: false,
    dateShowFlag: false,
    uploadFileShowFlag: true,
    form:[
        {
            id: 'extractTarget',
            items:["绿地", "水体", "道路", "建筑", "农业地块","变化检测（建筑）", "生态价值GEP", "影像分类", "自定义/其他"]
        },
        {
            id: 'extractModel',
            items:["最优精度", "UNet", "DeepLab V3+", "DLinkNet","PSPNet", "HRNet","Swin-Transformer","自定义/其他"]
        },
        {
            id: 'extractImage',
            items: ["默认高分影像", "国产高分影像", "自定义/其他"]
        }
    ],
    formData: {
        name: '',
        extractionSelect: [],
        extractionModelSelect: [],
        extractionImageSelect: null,
        telnumber: '',
        date: new Date().toISOString().substr(0, 7),
        area: "",
        describe: '',
        companyAdress: '',
        select: null,
        file: null,
        coordinateArrayLength: null,
    },
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
