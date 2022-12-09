<!-- 修改:在form的positon:relative后添加了偏移;边界外的元素添加了class='ml-3' -->
<template>
<v-row justify="center">
<v-dialog
      v-model="formShowFlag"
      persistent
      max-width="650"
      style="z-index: 2001"
    >
      <v-card
          style="border-radius: 0;"
          raised
          color = "grey lighten-5"
      >
        <!-- fab 将按钮指定为 floating-action-button - _round_。 -->
        <!-- absolute 给组件应用 position: absolute -->
        <!-- right 将组件向右对齐。这应该与 absolute 或 fixed 属性一起使用 -->
        <!-- relative 脱离文档流 -->
        <v-form
            id="form-data"
            ref="form"
            v-model="valid"
            @submit.prevent="submit"
            style=" position: relative; top:5%; left:0%; right: 0%;"
        >
        <!-- 关闭按钮 -->
          <v-row>
              <v-col cols = "12">
                  <v-btn
                      class = "mr-0"
                      icon
                      fab
                      absolute
                      right
                      @click="formShowFlag = !formShowFlag"
                      style="z-index: 999;"
                  >
                  <v-icon>
                      {{ 'mdi-close' }}
                  </v-icon>
                  </v-btn>
              </v-col>
          </v-row>
          <!-- 第1行 -->
            <v-card-text  class="pa-0">联系信息</v-card-text>
            <v-row dense>
              <v-col cols = "12" md = "6">
                <v-text-field
                    v-model="formData.name"
                    :rules="formRule.name"
                    :disabled="isUpdating"
                    :counter="10"
                    filled
                    label="联系人名字"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols = "12" md = "6">
                <v-text-field
                    v-model="formData.title"
                    :rules="formRule.title"
                    :disabled="isUpdating"
                    :counter="10"        
                    label="职位/称谓（选填）"
                    filled
                ></v-text-field>
            </v-col>
          </v-row>
          
        <!-- 第2行 -->        
          <v-row dense>
            <v-col cols = "12" md = "6">
              <v-text-field
              v-model="formData.telnumber"
              :rules="formRule.telnumber"
              :disabled="isUpdating"
              label="电话号码/电子邮件/微信/QQ"
              type="telephone"
              required
              filled
            ></v-text-field>
            </v-col>
            <v-col cols = "12" md = "6">
              <v-text-field
                v-model="formData.companyAdress"
                :counter="30"
                label="单位名称(选填)"
                filled
              ></v-text-field>
            </v-col>
          </v-row>
        
        <!-- 第3行 -->
          <v-card-text  class="pa-0" >感兴趣区域范围</v-card-text>
          <!-- dense 降低输入高度 -->
          <v-row dense>
            <v-col cols = "12" md = "6">
              <v-file-input
              v-model="formData.file"
              :disabled="isUpdating"
              label="上传ROI文件（建议为shp格式）"
              outlined
              dense
              v-show = "uploadFileShowFlag"
              ></v-file-input>
            </v-col>
            <v-col cols = "12" md = "6">
              <v-card-text
              v-model="formData.area"
              style="text-align=right"
              >预计提取区域面积:{{formData.area}}</v-card-text>
            </v-col>
          </v-row>

        <!-- 第4行 -->
          <v-card-text  class="pa-0">遥感数据</v-card-text>
          <v-row dense>
            <v-col cols = "12" md = "6">
              <v-select
                  style="margin-top:5px;margin-left:0px;"
                  v-model="formData.extractionImageSelect"
                  :items="extractImage"
                  :disabled="isUpdating"
                  label="选择影像"
                  dense
                  outlined
              ></v-select>
              <div v-show="customExtractImageShowFlag">
                <v-text-field
                    v-model="customExtractImageInput"
                    label="自定义提取影像"
                    @blur="customExtractImageBlurEvent"
                ></v-text-field>
              </div>
            </v-col>
            <v-col cols="6">
            <!-- ref unknown -->
            <!-- transition 设置组件转换。可以是一个 built in transitions 或者是自己自定义的。 -->
            <!-- offset-y 在y轴上偏移菜单，与上/下方向一起工作 -->
            <!-- 这里考虑将日期选择打包为一个组件，直接引用就可以了 -->
              <DatePicker />
            </v-col>
          </v-row>

          <!-- 第5行 -->
          <!-- <span class="ml-3">您需要什么</span>
          <v-chip class="ml-3" color="white">您需要什么?</v-chip> -->
          <v-card-text  class="pa-0">您所需要的影像提取?</v-card-text>
          <v-row dense>
            <v-col cols ="12">
              <!-- outlined 将轮廓样式应用于输入 -->
              <v-autocomplete
                  style="margin-top:5px;"
                  v-model="formData.extractionSelect"
                  :items="extractTarget"
                  :disabled="isUpdating"
                  chips
                  multiple
                  close
                  outlined
                  label="提取目标"
              >
              <!-- todo：插入一个可以关闭所选择的按钮 -->
              </v-autocomplete>
              <!-- blur 当输入焦点时发出 -->
              <div v-show="customExtractshowFlag">
                <v-text-field
                    v-model="customExtractInput"
                    label="自定义提取目标"
                    @blur="customExtractBlurEvent"
                ></v-text-field>
              </div>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                  style="margin-top:5px;"
                  v-model="formData.extractionModelSelect"
                  :items="extractModel"
                  :disabled="isUpdating"
                  chips
                  multiple
                  close
                  outlined
                  label="提取模型"    
              ></v-autocomplete>
              <div v-show="customExtractModelShowFlag">
                <v-text-field
                    v-model="customExtractModelInput"
                    label="自定义提取模型"
                    @blur="customExtractModelBlurEvent"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>
            
          <!-- 第6行 -->
          <!-- clearable 添加输入框清除功能，默认图标是 Material Icons clear -->
          <v-row dense>
            <v-col cols ="12">
              <v-textarea
              v-model="formData.describe"
              clearable
              clear-icon="mdi-close-circle"
              label="请尽可能地描述其他需求"
              value=''     
              filled
              class = "mt-5"
              ></v-textarea>
            </v-col>
          </v-row>

          <!-- 第7行 -->
          <v-divider></v-divider>
          <v-card-actions>
          <v-switch
            v-model="valid"
            :disabled="isUpdating"
            class="mt-0"
            hide-details
            label="共享提取信息"
          ></v-switch>
          <!-- 按钮 -->
          <v-spacer></v-spacer>
          <v-btn
            style="font-size: 15px"
            type="submit"
            depressed
            elevation="1"
          >
            <v-icon left>
              mdi-update
            </v-icon>
          现在上传
          </v-btn>
          <v-btn
            color="error"
            @click="reset"
            depressed
          >
          重置
          </v-btn>
        </v-card-actions>
        </v-form>  
      </v-card>
</v-dialog>
</v-row>
  <!-- persistent 无法通过在外部单击来关闭 -->
  <!-- z-index 属性设置元素的堆叠顺序。拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面。 -->
</template>

<script>
import {sync} from "vuex-pathify";
import DatePicker from '../components/DatePicker.vue'
// import axios from 'axios'
export default {
  name: "Form",
  data: () => ({
    valid: false,
    row: null,
    checkbox: false,
    // 自定义提取模型绑定的属性 --libin
    customExtractModelInput: null,
    // 自定义提取影像绑定的属性 --libin
    customExtractImageInput: null,
    // 自定义提取目标绑定的属性 --libin
    customExtractInput: null,
    value: null,
    // v-autocomplete(提取目标)绑定的数据源数组,  --libin
    extractTarget: [],
    // v-autocomplete(提取模型)绑定的数据源数组 --libin
    extractModel: [],
    //  对应遥感数据选择影像 --libin
    extractImage: [],
    updateareaMap: "",
    isUpdating: false,
    formRule: {
      name: [
        v => !!v || '名字不能为空',
        v => /^[\u4e00-\u9fa5]{2,4}$/.test(v) || '名字应为2-4字中文'
      ],
      telnumber: [
        v => !!v || '联系方式不能为空'
      ]
    },
  }),
  computed: {
    ...sync('app', [
      'formShowFlag'
    ]),
    ...sync('form', [
      'form','formData', 'uploadFileShowFlag' ,'customExtractshowFlag', 'customExtractModelShowFlag',
        'customExtractImageShowFlag', 'dateShowFlag'
    ]),
    extractionSelect() {
      return this.formData.extractionSelect
    },
    extractionModelSelect() {
      return this.formData.extractionModelSelect
    },
    extractionImageSelect() {
      return this.formData.extractionImageSelect
    }

  },
  mounted() {
    this.init()
    this.updateareaMap = this.child
  },
  components: {
    DatePicker,
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()||!this.$refs.form.validate()) {
        var fileReader = new FileReader();
        fileReader.readAsArrayBuffer(this.formData.file);
        // fileReader读取文件并转化二进制流需要时间，在读取结束后就可以调用filereader实例的result属性查看读取的二进制流数组
        var that = this;
        fileReader.onload = function () {
          let url = '/api/uploadFile';
          that.$http.post(
          url+'?fileName='+that.formData.file.name+'&name='+that.formData.name+'&telnumber='+that.formData.telnumber+'&date='+that.formData.date+'&area='+that.formData.area+'&describe='+that.formData.describe+'&companyAdress='+that.formData.companyAdress,
          fileReader.result).then((response) => {
            console.log(response)
          });
        }
        
      }
    },
    // 自定义提取目标blur(输入焦点)触发函数 --libin
    customExtractBlurEvent() {
      // 如果extractTarget数组中包含了'自定义/其他' --libin
      let ret = false;
      for(let i = 0; i < this.extractTarget.length; i++) {
        if (this.extractTarget[i] == '自定义/其他'){
          ret = true;
        }
      }
      if (ret) {
        // 用户自定义的输入如果不为空的话, 将用户自定义提取的输入添加data中提取目标的数组中。 --libin
        if (this.customExtractInput !== null) {
          // 给下拉框添加了一个选项
          this.extractTarget.push(this.customExtractInput);
          // 将用户自定义的输入数据对应的项选中 --libin

          // 删掉自定义选项
          let newExtractionSelect = []
          for(let i = 0;i < this.extractionSelect.length; i++){
            if(this.extractionSelect[i] != '自定义/其他') {
              newExtractionSelect.push(this.extractionSelect[i]);
            }
          }
          this.formData.extractionSelect = newExtractionSelect;

          this.formData.extractionSelect.push(this.extractTarget[this.extractTarget.length - 1]);
        }
      // 如果用户没有选择'自定义/其他'。 --libin
      } else {
        // 已经添加过一次了，先弹出再push
        if (this.customExtractInput === null) {
          this.extractTarget.pop()
        } else {
        // 用户选择了已有的项, 将用户选择的项加入到formData中。 --libin
          this.extractTarget.pop()
          this.extractTarget.push(this.customExtractInput)

          // 删掉自定义选项
          let newExtractionSelect = []
          for(let i = 0;i < this.extractionSelect.length; i++){
            if(this.extractionSelect[i] != '自定义/其他') {
              newExtractionSelect.push(this.extractionModelSelect[i]);
            }
          }
          this.formData.extractionSelect = newExtractionSelect;
          
          this.formData.extractionSelect.push(this.extractTarget[this.extractTarget.length - 1]);
        }
      }
      if (this.customExtractInput !== null) {
        this.customExtractshowFlag = false
      }
      this.customExtractInput = null
    },
    // 自定义提取模型输入焦点触发函数 --libin
    customExtractModelBlurEvent() {
      let ret = false;
      for(let i = 0; i < this.extractModel.length; i++) {
        if (this.extractModel[i] == '自定义/其他'){
          ret = true;
        }
      }
      // 限定选项只添加一个 --libin
      if (ret) {
        if (this.customExtractModelInput !== null) {
          this.extractModel.push(this.customExtractModelInput)
          // 删掉自定义选项
          let newExtractionModelSelect = []
          for(let i = 0;i < this.extractionModelSelect.length; i++){
            if(this.extractionModelSelect[i] != '自定义/其他') {
              newExtractionModelSelect.push(this.extractionModelSelect[i]);
            }
          }
          this.formData.extractionModelSelect = newExtractionModelSelect;

          this.formData.extractionModelSelect.push(this.extractModel[this.extractModel.length - 1]);
        }
      } else {
        if (this.customExtractModelInput === null) {
          this.extractModel.pop()
        } else {
          this.extractModel.pop()
          this.extractModel.push(this.customExtractModelInput)

          // 删掉自定义选项
          let newExtractionModelSelect = []
          for(let i = 0;i < this.extractionModelSelect.length; i++){
            if(this.extractionModelSelect[i] != '自定义/其他') {
              newExtractionModelSelect.push(this.extractionModelSelect[i]);
            }
          }
          this.formData.extractionModelSelect = newExtractionModelSelect;

          this.formData.extractionModelSelect.push(this.extractModel[this.extractModel.length - 1]);
        }
      }
      if (this.customExtractModelInput !== null) {
        this.customExtractModelShowFlag = false
      }
      this.customExtractModelInput = null
    },
    // 自定义提取影像输入焦点触发函数
    customExtractImageBlurEvent() {
      // 限定选项只添加一个
      if (this.extractImage[this.extractImage.length - 1] === '自定义/其他') {
        // 表单存在自定义输入框
        if (this.customExtractImageInput !== null) {
          // 将自定义提取影像输入放置到影像提取中
          this.extractImage.push(this.customExtractImageInput)
          // 将提取影像的最后一个保存到表单数据中
          this.formData.extractionImageSelect = this.extractImage[this.extractImage.length - 1]
        }
      // 用户没有选择 自定义/其他
      } else {
        if (this.customExtractImageInput === null) {
          // 自定义提取影像输入为空时，删除提取影像的最后一个元素
          this.extractImage.pop()
        } else {
          // 自定义提取影像输入不为空, 删除提取影像的最后一个元素，提取影像添加自定义提取影像输入
          this.extractImage.pop()
          this.extractImage.push(this.customExtractImageInput)
          // 将提取影像的最后一个保存到表单数据中
          this.formData.extractionImageSelect = this.extractImage[this.extractImage.length - 1]
        }
      }
      if (this.customExtractImageInput !== null) {
        this.customExtractImageShowFlag = false
      }
      this.customExtractImageInput = null

    },

    init() {
      let _ = this
      for (let i = 0; i < _.form.length; i++) {
        if (_.form[i].id === 'extractTarget') {
          for (let j = 0; j < _.form[i].items.length; j++) {
            _.extractTarget.push(_.form[i].items[j])
          }
        } else if (_.form[i].id === 'extractModel') {
          for (let j = 0; j < _.form[i].items.length; j++) {
            _.extractModel.push(_.form[i].items[j])
          }
        } else if (_.form[i].id === 'extractImage') {
          for (let j = 0; j < _.form[i].items.length; j++) {
            _.extractImage.push(_.form[i].items[j])
          }
        }
      }
    },

    reset() {
      this.$refs.form.reset()
    }
  },
  watch: {
    child :{
      // 监听数据发生变化的处理函数
      handler(newV) {
        console.log("newV", newV)
        this.updateareaMap = newV;//将监听到修改的值赋予到dataAttrs中
      },
      deep: true
    },
    // 提取选择数组发生了变化, 就将自定义提取显示或者关闭。 --libin
    extractionSelect(newVal) {
      // 判读newVal数组中是否包含'自定义/其他'
      let flag = false;
      for(let i = 0; i < newVal.length; i++) {
        if(newVal[i] == '自定义/其他') {
          flag = true;
        }
      }
      if (flag) {
        this.customExtractshowFlag = true
      } else {
        this.customExtractshowFlag = false
      }
    },
    extractionModelSelect(newVal) {
      // 判读newVal数组中是否包含'自定义/其他'
      let flag = false;
      for(let i = 0; i < newVal.length; i++) {
        if(newVal[i] == '自定义/其他') {
          flag = true;
        }
      }
      if (flag) {
        this.customExtractModelShowFlag = true;
      } else {
        this.customExtractModelShowFlag = false
      }
    },
    extractionImageSelect(newVal) {
      if (newVal === '自定义/其他') {
        this.customExtractImageShowFlag = true
      } else {
        this.customExtractImageShowFlag = false
      }
    },
    deep: true
  }

}
</script>

<style scoped>
/* 请上传文件提示语 */
/deep/ .upload-span {
  margin-top: 40px;
}
.transfer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.transfer > .list {
  width: 200px;
  height: 300px;
  border: 1px solid #000;
  list-style: none;
} 

.content {
  font-size: 30px;
  margin: 0 20px;
}

.list > li {
  padding: 5px;
  box-sizing: border-box;
}
</style>
