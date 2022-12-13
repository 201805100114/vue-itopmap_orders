<template>
  <div class="mapInfoCard" id="mapInfoCard">
      <div v-show="leftCardShowFlag" id="left-card-container" class="left-card-container"
         style="width:350px;position:relative;transition:left 3s linear;z-index: 200;">
      <v-navigation-drawer
          app
          width="350"
          class="left-card-navigation"
          id="left-card-navigation"
          style="margin-top: 64px;"
      >
        <v-card
            :loading="loading"
            class="mx-auto my-auto"
            height="750"
            style="border-radius: 0;"
        >
          <!-- 顶部图片 -->
          <v-img
              height="200"
              :src=this.param.imgUrl
          ></v-img>

          <!-- <template slot="progress">
            <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
            ></v-progress-linear>
          </template> -->

          <!-- 标题 -->
          <v-card-title style="font-size:1.5em">{{ $t(this.param.title) }}</v-card-title>
          <!-- 评分（暂时保留） -->
          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                  :value="5.0"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
              ></v-rating>

              <div class="grey--text ms-4">
                5.0 (0)
              </div>
            </v-row>
            <!-- 副标题 -->
            <!-- <div class="my-4 text-subtitle-1">
              $ • Italian, Cafe
            </div> -->
            <!-- 总体描述 -->
            <v-row align="center" class="mx-0">
              <div>{{ $t(this.param.description) }}</div>
            </v-row>
          </v-card-text>

          <!-- 基本信息 -->
          <v-divider class="mx-auto"></v-divider>
          <div class="mx-4 my-4 text-subtitle-1">
            <v-list-item
                v-for="(item, i) in this.param.items"
                :key="i"
                dense
            >
              <v-list-item-icon>
                <v-icon
                    v-text="item.icon"
                    color="blue darken-1">
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="$t(item.text)"></v-list-item-title>
              </v-list-item-content>
              <v-btn
                  v-if="item.detail"
                  color="deep-purple lighten-2"
                  text
                  @click="sendData(item.detail)"
              >
                详情
              </v-btn>
            </v-list-item>
          </div>
          <v-divider class="mx-auto"></v-divider>
          <v-card-title style="font-size:1.0em">可用模型</v-card-title>

          <!-- 选项 -->
          <v-card-text style="border: none">
            <v-chip-group
                v-model="selection"
                active-class="deep-purple accent-4 white--text"
                column
            >
              <v-chip
                  medium
                  v-for="(item, i) in this.param.models"
                  :key="i"
              >{{ item }}
              </v-chip>

            </v-chip-group>
          </v-card-text>
          <!-- 联系信息 -->
          <v-card-actions>
            <v-btn
                color="deep-purple lighten-2"
                text
                @click="formShowFlag = !formShowFlag"
                style="width: 100px;font-size: 20px; position:absolute;right:0%; margin-top: 50px"
            >
              提交表单
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-divider class="mx-auto"></v-divider>
      </v-navigation-drawer>
    </div>

    <div v-show="arrowShowFlag" id="arrow-button" class="arrow-button">
      <!-- 左滑标识 -->
      <div @click="change" class="arrow-button-div" style="">
        <v-icon left style="margin-left: 3px;margin-top: 12px">
          {{ leftCardShowFlag ? 'mdi-menu-left' : 'mdi-menu-right' }}
        </v-icon>
      </div>
    </div>
    </div>
</template>

<script>

import {sync} from "vuex-pathify";
import bus from '../util/eventBus'

export default {
  name: "MapInfoCard",
  data: () => ({
    loading: false,
    selection: 0,
    arrowClass: 0,
    detailHeight: null,
    show: true,
    swipeLeftStyle: "left:350px;position: fixed;z-index:1000;padding-top: 12px"
  }),
  props: {
    param: {
      type: Object,
      default: () => ([]),
    },
  },

  computed: {
    ...sync('app', [
      'navigationShowFlag','detailCardShowFlag', 'leftCardShowFlag',
      'arrowShowFlag','formShowFlag'
    ]),
  },

  methods: {
    showForm() {
      this.$router.push('/Form')
      this.formShowFlag = true
    },
    sendData(data) {
      this.detailCardShowFlag = !this.detailCardShowFlag
      bus.$emit('detailData', data)
    },
    change() {
      this.leftCardShowFlag = !this.leftCardShowFlag
    },

    initStyle() {
      let arrowButton = document.getElementById('arrow-button')
      let cardContainer = document.getElementsByClassName('v-navigation-drawer')[0]
      arrowButton.style.paddingTop = '350px'
      cardContainer.style.height = window.screen.height + 'px'
      const el1 = document.getElementById('arrow-button');
      // 设置左滑按钮的位置
      const el2 = document.getElementById('mapInfoCard');
      el1.style = "left:350px;position: fixed;z-index:1000;top:" + (window.getComputedStyle(el2).height.slice(0, -2) - '0') + "px"
    }

  },

  mounted() {
    this.initStyle()
  },

}
</script>

<style scoped>
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}
.arrow-button-div {
  width:30px;
  height:50px;
  background-color: #fdfcfc;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  transform: scale(1.1)
}

</style>
