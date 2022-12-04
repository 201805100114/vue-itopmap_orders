<template>
 <v-container fluid>
  <!-- 左边卡片 -->
  <div>
  <map-info-card
    :param ="mapParam.info"
  />
  </div>
  <!-- <v-spacer> -->
  <!-- 地图 -->
    <swipe-map
     :param ="mapParam.map"
    />
  <!-- </v-spacer> -->
   <Form />
   <detailCard />
</v-container>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  name: 'Examples',
  components: {
    MapInfoCard: () => import("../components/MapInfoCard.vue"),
    SwipeMap: () => import("../components/SwipeMap.vue"),
    Form: () => import("../views/Form"),
    detailCard: () => import("../views/detailCard"),
  },

  computed: {
    maps: get('maps/maps'),

    mapParam () {
      return this.maps[this.Position(this.maps)[0]]
    },
  },

  methods: {
    // 通过当前路由path匹配mapid
    mapId(){
      return this.$route.path.split("/").reverse()[1]
    },
    // mapid在maps中的位置
    Position(maps) {
      return maps.reduce((t, v, i) => (v.id === this.mapId() && t.push(i), t), [])
    },
  },
}
</script>

