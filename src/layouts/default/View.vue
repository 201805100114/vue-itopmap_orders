<template>
  <!-- 解决需要点击折叠按钮铺开地图的问题 -->
  <v-main style="paddingLeft: 0px">
    <v-container fluid>
      <router-view :key="$route.path" />
    </v-container>
  </v-main>
</template>

<script>
  export default {
    name: 'DefaultView',
  }
</script>
