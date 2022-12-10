<template>
  <v-list-item
    :href="item.href"
    :rel="item.href ? 'nofollow' : undefined"
    :target="item.href ? '_blank' : undefined"
    color="indigo"
    :to="item.to"
    active-class="primary white--text"
    link
    class="py-1"
    v-bind="$attrs"
    v-on="$listeners"
    @click="handleBtnClickFn(item)"
  >
    <v-list-item-icon
      v-if="!item.icon"
      class="text-caption text-uppercase justify-center ml-1 my-2 align-self-center"
    >
      {{ title }}
    </v-list-item-icon>

    <v-list-item-avatar v-if="item.avatar">
      <v-img :src="item.avatar" />
    </v-list-item-avatar>

    <v-list-item-icon
      v-if="item.icon"
      class="my-2 align-self-center"
    >
      <v-icon v-text="item.icon" />
    </v-list-item-icon>

    <v-list-item-content v-if="item.title">
      <v-list-item-title v-text="$t(item.title)"
      />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  import {sync} from "vuex-pathify";
  import {addOver, removeOver} from '@/util/operations'
  export default {
    name: 'DefaultListItem',
    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
    },

    computed: {
      title () {
        const matches = this.item.title.match(/\b(\w)/g)
        return matches.join('')
      },
      ...sync('app', [
        'navigationShowFlag',
      ]),
      ...sync('app', [
        'leftCardShowFlag',
      ]),
    },

    methods: {
      handleBtnClickFn(item) {
        // 路由中有landcover
        if (item.to.search('landcover') !== -1){
          this.navigationShowFlag = false;
          // adddata页面渲染不需要左边卡片
          this.leftCardShowFlag = true;
          addOver();
        }else {
          this.navigationShowFlag = true;
          this.leftCardShowFlag = false;
          if (item.to.search('adddata') !== -1) {
            this.navigationShowFlag = false;
          }
          removeOver();
        }
      }
    },

  }
</script>
