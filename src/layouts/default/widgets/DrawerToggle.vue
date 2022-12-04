<template>
  <v-btn
    class="ml-3 mr-4"
    elevation="0"
    fixed
    fab
    small
    @click="change"
    style= "z-index: 999;left:0;"
  >
    <v-icon>
      {{'mdi-format-list-bulleted'}}
      <!-- {{ navigationShowFlag ? 'mdi-format-list-bulleted' : 'mdi-dots-vertical' }} -->
    </v-icon>
  </v-btn>
</template>

<script>
  // Utilities
  import { sync } from 'vuex-pathify'
  import {removeOver, addOver} from '@/util/operations'
  // import store from "@/store";
  export default {
    name: 'DefaultDrawerToggle',
    // data: () => {
    //   return {
    //     navigationShowFlag: store.state.navigationShowFlag,
    //   }
    // },
    // data: ()=> {
    //   btnStyle: "z-index: 999;left:0"
    // },
    computed: {
      ...sync('app', [
        'navigationShowFlag',
        'mini',
      ]),
    },
    methods: {
      change(event) {
        // store.commit('changeNavigationShowFlag', !this.navigationShowFlag)
        this.navigationShowFlag = !this.navigationShowFlag;
        let target = event.target;
        console.log(target.nodeName);
        if(target.nodeName == "I"){
            target = event.target.parentNode.parentNode;
        }
        target.blur();
      },
    },

    watch: {
      navigationShowFlag(newVal) {
        if (newVal){
          addOver()
        } else {
          removeOver()
        }
      }
    }
  }
</script>
