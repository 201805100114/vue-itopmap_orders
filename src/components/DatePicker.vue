<template>
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
</template>
<script>
import {sync} from "vuex-pathify";

export default {
  name: "DatePicker",
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
}
</script>
