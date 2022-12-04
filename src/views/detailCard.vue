/**
* @name: detailCard
* @author: Sun
* @date: 2022/2/16 21:13
* @description：
* @update: 2022/2/16 21:13
*/
<template>
  <v-row
  >
    <v-dialog
        v-model="detailCardShowFlag"
        persistent
        width="300"
        height="500"
        style="z-index: 1001"
    >
      <v-card
          class="mx-auto"
          max-width="300"
          tile
      >
        <v-icon @click="detailCardShowFlag = !detailCardShowFlag"
                style="z-index: 999;height:20px;width:20px;position:absolute;right:5px;top:5px">
          {{ 'mdi-close' }}
        </v-icon>
        <v-list disabled>
          <v-list-item-group
              color="primary"
          >
            <v-list-item
                v-for="(item, i) in items"
                :key="i"
                dense
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.text" style="font-size: 20px"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {sync} from "vuex-pathify";
import bus from '../util/eventBus'
export default {
  name: "detailCard",
  data: () => ({
    items: [],
  }),
  props: {
    data: {
      type: Array,
      default: () => ([]),
    },
  },
  created() {
    bus.$on('detailData', (val)=> {
      this.items = val
    })
  },
  computed: {
    ...sync('app', [
      'detailCardShowFlag',
    ]),
  },
}
</script>

<style scoped>

</style>
