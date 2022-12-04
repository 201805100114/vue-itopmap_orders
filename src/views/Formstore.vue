<!-- 修改:在form的positon:relative后添加了偏移;边界外的元素添加了class='ml-3' -->
<template>

  <!-- persistent 无法通过在外部单击来关闭 -->
  <!-- z-index 属性设置元素的堆叠顺序。拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面。 -->
    <v-dialog
        v-model="formShowFlag"
        persistent
        width="900px"
        height="800px"
        style="z-index: 1001"
    >

      <v-card
          height="700px"
          style="border-radius: 0"
          raised
          color = "grey lighten-5"
      >
      <!-- fab 将按钮指定为 floating-action-button - _round_。 -->
      <!-- absolute 给组件应用 position: absolute -->
      <!-- right 将组件向右对齐。这应该与 absolute 或 fixed 属性一起使用 -->
        <v-btn
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
        <!-- style 设置距离顶部30px 相对布局 -->
        <!-- relative 脱离文档流 -->
        <v-form
            id="form-data"
            ref="form"
            v-model="valid"
            @submit.prevent="submit"
            style="top:30px;position: relative;right: 11.9px;"
        >
          <v-text-field
              v-model="formData.name"
              :counter="10"
              :rules="formRule.name"
              label="称呼"
              required
              class="ml-3"
              style="width:55%;"
              filled
          ></v-text-field>
          <!-- row 按行排列? -->
          <!-- absolute 距离form顶部0px, 距离form右部0px -->
          <v-radio-group
              v-model="formData.select"
              row
              style="top:0px;right:0px; width:35%;position:absolute"
          >
            <v-radio
                label="先生"
                value="sir"
            ></v-radio>
            <v-radio
                label="女士"
                value="lady"
            ></v-radio>
          </v-radio-group>
          <v-row>
            <v-col cols = "4">
              <v-text-field
              v-model="formData.telnumber"
              :rules="formRule.telnumber"
              class="ml-3"
              label="电话号码/电子邮件/微信/QQ"
              type="telephone"
              required
              filled
          ></v-text-field>
            </v-col>
          <v-col cols = "8">
            <v-text-field
              v-model="formData.companyAdress"
              :counter="30"
              class="ml-3"
              label="单位名称"
              filled
          ></v-text-field>
          </v-col>
          </v-row>
          <!-- <span class="ml-3">您需要什么</span> -->
          <v-chip class="ml-3" color="white">您需要什么?</v-chip>
          <v-row class="ml-1">
            <v-col cols="3">
              <!-- outlined 将轮廓样式应用于输入 -->
              <v-autocomplete
                  v-model="formData.extractionSelect"
                  :items="extractTarget"
                  multiple
                  label="提取目标"
                  dense
                  style="margin-top:10px;width: 150px"
              ></v-autocomplete>
              <!-- blur 当输入焦点时发出 -->
              <div v-show="customExtractshowFlag">
                <v-text-field
                    v-model="customExtractInput"
                    label="自定义提取目标"
                    @blur="customExtractBlurEvent"
                ></v-text-field>
              </div>

            </v-col>
            <v-col cols="3">
              <v-select
                  v-model="formData.extractionModelSelect"
                  :items="extractModel"
                  label="提取模型"
                  dense
                  style="margin-top:10px;width: 150px"
              ></v-select>
              <div v-show="customExtractModelShowFlag">
                <v-text-field
                    v-model="customExtractModelInput"
                    label="自定义提取模型"
                    @blur="customExtractModelBlurEvent"
                ></v-text-field>
              </div>
            </v-col>
            <v-col cols="3">
              <v-select
                  v-model="formData.extractionImageSelect"
                  :items="extractImage"
                  label="提取影像"
                  dense
                  style="margin-top:10px;width: 150px"
              ></v-select>
              <div v-show="customExtractImageShowFlag">
                <v-text-field
                    v-model="customExtractImageInput"
                    label="自定义提取影像"
                    @blur="customExtractImageBlurEvent"
                ></v-text-field>
              </div>
            </v-col>
            <v-col
                cols="3"
            >
            <!-- ref unknown -->
            <!-- transition 设置组件转换。可以是一个 built in transitions 或者是自己自定义的。 -->
            <!-- offset-y 在y轴上偏移菜单，与上/下方向一起工作 -->
              <v-menu
                  ref="menu"
                  v-model="dateShowFlag"
                  :close-on-content-click="false"
                  :return-value.sync="formData.date"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="formData.date"
                      label="影像日期"
                      prepend-icon="mdi-calendar"
                      readonly
                      dense
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="formData.date"
                    type="month"
                    no-title
                    scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                      text
                      color="primary"
                      @click="dateShowFlag = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(formData.date)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <span class="upload-span ml-3" v-show = "uploadFileShowFlag">请上传研究区范围文件</span>
          <!-- dense 降低输入高度 -->
          <v-row>
            <v-col cols = "7">
              <v-file-input
              class="ml-3"
              label="File input"
              v-model="formData.file"
              outlined
              dense
              v-show = "uploadFileShowFlag"
          ></v-file-input>
            </v-col>
            <v-col cols = "5">
              <v-chip
              class="ml-3 mb-3"
              v-model="formData.area"
              style="text-align=right"
          >预计提取区域面积:{{formData.area}} "（平方公里）"</v-chip>
            </v-col>
          </v-row>
          <v-spacer></v-spacer>
          <!-- clearable 添加输入框清除功能，默认图标是 Material Icons clear -->
          <v-textarea
              clearable
              clear-icon="mdi-close-circle"
              class="ml-3"
              label="请尽可能准确地描述其他需求"
              value=''
              v-model="formData.describe"
              filled
              dense
          ></v-textarea>

          <div style="position:absolute;right:30%;margin-top:0px">
            <v-btn
                color="error"
                @click="reset"
                style="width:150px;font-size: 20px"
                class = "mr-4"
                depressed
                elevation="1"
            >
              重置
            </v-btn>
            <v-btn
                class="mr-4"
                type="submit"
                style="width:150px;font-size: 20px"
                depressed
                elevation="1"
            >
              现在上传
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-dialog>

</template>

<script>
import {sync} from "vuex-pathify";

export default {
  name: "Form",
  data: () => ({
    valid: false,
    row: null,
    checkbox: false,
    customExtractModelInput: null,
    customExtractImageInput: null,
    customExtractInput: null,
    value: null,
    extractTarget: [],
    extractModel: [],
    extractImage: [],
    updateareaMap: "",
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
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        let formData = new FormData();
        for (let param in this.formData) {
          formData.append(param, this.formData[param])
        }
        var request = new XMLHttpRequest()
        request.open("POST", "http://dataserver/update");
        request.send(formData);
      }
    },

    customExtractBlurEvent() {
      // 限定选项只添加一个
      if (this.extractTarget[this.extractTarget.length - 1] === '自定义/其他') {
        if (this.customExtractInput !== null) {
          this.extractTarget.push(this.customExtractInput)
          this.formData.extractionSelect = this.extractTarget[this.extractTarget.length - 1]
        }

      } else {
        // 已经添加过一次了，先弹出再push
        if (this.customExtractInput === null) {
          this.extractTarget.pop()
        } else {
          this.extractTarget.pop()
          this.extractTarget.push(this.customExtractInput)
          this.formData.extractionSelect = this.extractTarget[this.extractTarget.length - 1]
        }
      }
      if (this.customExtractInput !== null) {
        this.customExtractshowFlag = false
      }
      this.customExtractInput = null
    },

    customExtractModelBlurEvent() {
      // 限定选项只添加一个
      if (this.extractModel[this.extractModel.length - 1] === '自定义/其他') {
        if (this.customExtractModelInput !== null) {
          this.extractModel.push(this.customExtractModelInput)
          this.formData.extractionModelSelect = this.extractModel[this.extractModel.length - 1]
        }
      } else {
        if (this.customExtractModelInput === null) {
          this.extractModel.pop()
        } else {
          this.extractModel.pop()
          this.extractModel.push(this.customExtractModelInput)
          this.formData.extractionModelSelect = this.extractModel[this.extractModel.length - 1]
        }
      }
      if (this.customExtractModelInput !== null) {
        this.customExtractModelShowFlag = false
      }
      this.customExtractModelInput = null
    },

    customExtractImageBlurEvent() {
      // 限定选项只添加一个
      if (this.extractImage[this.extractImage.length - 1] === '自定义/其他') {
        if (this.customExtractImageInput !== null) {
          this.extractImage.push(this.customExtractImageInput)
          this.formData.extractionImageSelect = this.extractImage[this.extractImage.length - 1]
        }
      } else {
        if (this.customExtractImageInput === null) {
          this.extractImage.pop()
        } else {
          this.extractImage.pop()
          this.extractImage.push(this.customExtractImageInput)
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
          this.updateareaMap = newV;//将监听到修改的值赋予到dataAttrs中
        },
        deep: true
      },
    extractionSelect(newVal) {
      if (newVal === '自定义/其他') {
        this.customExtractshowFlag = true
      } else {
        this.customExtractshowFlag = false
      }
    },
    extractionModelSelect(newVal) {
      if (newVal === '自定义/其他') {
        this.customExtractModelShowFlag = true
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
    }

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
