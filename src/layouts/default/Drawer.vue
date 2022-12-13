<template>
  <div>
    <div class="px-2"  style="z-index: 998;left: 1.7em;">
      <!-- <default-drawer-header/> -->

      <v-divider class="mx-3 mb-2"/>

      <default-list :items="items"/>

      <div class="pa-4 text-center">
        <v-btn
            block
            class="text-none"
            color="secondary"
            href="https://www.itopmap.com"
        >
          <v-icon left>
            mdi-package-up
          </v-icon>
          Upgrade to Pro
        </v-btn>
      </div>
      <div class="pt-12"/>
    </div>
  </div>

</template>

<script>
// Utilities
import {get, sync} from 'vuex-pathify'

export default {
  name: 'DefaultDrawer',

  components: {
    // DefaultDrawerHeader: () => import(
    //     /* webpackChunkName: "default-drawer-header" */
    //     './widgets/DrawerHeader'
    //     ),
    DefaultList: () => import(
        /* webpackChunkName: "default-list" */
        './List'
        ),
  },

  computed: {
    ...get('user', [
      'dark',
      'gradient',
      'image',
    ]),
    ...get('app', [
      'items',
      'version',
    ]),
    ...sync('app', [
      'drawer',
      'drawerImage',
      'mini',
    ]),
  },
}
</script>

<style lang="sass">
#default-drawer
  .v-list-item
    margin-bottom: 8px

  .v-list-item::before,
  .v-list-item::after
    display: none

  .v-list-group__header__prepend-icon,
  .v-list-item__icon
    margin-top: 12px
    margin-bottom: 12px
    margin-left: 4px

  &.v-navigation-drawer--mini-variant
    .v-list-item
      justify-content: flex-start !important
</style>
