<template>
  <v-app>
    <default-bar/>
    <v-navigation-drawer
        v-model="navigationShowFlag"
        fixed
        bottom
        style="z-index: 999;margin-top: 64px;"
    >
      <DefaultDrawer/>
    </v-navigation-drawer>
    <!-- 包含router-view libin -->
      <default-view/> 
  </v-app>
</template>

<script>
import {sync} from "vuex-pathify";
import {watchShowFlag} from "@/util/operations"
// import store from "@/store";
export default {
  name: 'DefaultLayout',

  computed: {
    ...sync('app', [
      'navigationShowFlag',
    ]),
    ...sync('app', [
      'leftCardShowFlag',
    ]),
  },
  // 控制appbar的显示，具有扩展性 --libin
  watch: {
    leftCardShowFlag(newVal) {
      this.leftCardShowFlag = newVal
      watchShowFlag()
    },

    navigationShowFlag(newVal) {
      console.log(newVal)
      this.navigationShowFlag = newVal
      watchShowFlag()
    },
  },

  components: {
    DefaultBar: () => import(
        /* webpackChunkName: "default-app-bar" */
        './AppBar'
        ),

    DefaultView: () => import(
        /* webpackChunkName: "default-view" */
        './View'
        ),

    DefaultDrawer: () => import(
        /* webpackChunkName: "default-view" */
        './Drawer'
        ),
  },

}
</script>

