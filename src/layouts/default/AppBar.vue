<template>
  <v-app-bar
    id="default-app-bar"
    app
    ref="bar"
    class="v-bar--underline"
    height="64"
    dense
    flat
    :style="appBarStyle"
  >
    <default-drawer-toggle class="hidden-sm-and-down" />

    <v-toolbar-title
      class="font-weight-light text-h5"
      style="padding-left: 50px"
    >iTopMap</v-toolbar-title>

    <v-spacer />

    <default-search class="hidden-sm-and-down" />

    <default-theme-switcher />


    <default-notifications />

    <LanguageSwitchVue />

    <default-account />
  </v-app-bar>
</template>

<script>
  // Utilities
  import {changeAppStyle} from "@/util/operations";
  import {sync} from "vuex-pathify";
  import LanguageSwitchVue from "./widgets/LanguageSwitch";
  export default {
    name: 'DefaultBar',

    computed: {
      ...sync('app', [
        'appBarStyle',
      ]),
    },
    mounted() {
      this.appBarStyle = changeAppStyle()
    },
    components: {
      DefaultAccount: () => import(
        /* webpackChunkName: "default-account" */
        './widgets/Account'
      ),
      DefaultDrawerToggle: () => import(
        /* webpackChunkName: "default-drawer-toggle" */
        './widgets/DrawerToggle'
      ),
      DefaultThemeSwitcher: () => import(
        './widgets/ThemeSwitcher'
      ),
      DefaultNotifications: () => import(
        /* webpackChunkName: "default-notifications" */
        './widgets/Notifications'
      ),
      DefaultSearch: () => import(
        /* webpackChunkName: "default-search" */
        './widgets/Search'
      ),
      LanguageSwitchVue
    },
  }
</script>
