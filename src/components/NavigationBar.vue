<template>
    <v-navigation-drawer
      id = "default-drawer"
      :color="dark ? '#272727' : undefined"
      :right="rtl"
      app
      clipped
    >

    <v-divider class="mx-1 my-0"></v-divider>

    <v-list
      dense
      expand
      nav
    >
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon= item.action
        >
          <!-- this template is for the title of top-level items with children -->
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item-content>
          </template>
  
          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            color="indigo"
            link
            @click.prevent.stop="onClick(item.to)"
          >        
            <v-list-item-content>
              <v-list-item-title >{{child.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
// Data
//import nav from '@/data/nav'

export default {
  name: 'NavigationBar',

  data: () => ({
    items: [
      {
        title: '特性介绍',
        action: 'mdi-satellite-variant',
        items: [
            { title: 'List Item' },
        ], 
        to: "/introducation"
      },
      {
        title: '开始遥感提取',
        action: 'mdi-map-marker-multiple-outline',
        active: true,
        items: [
          { title: '1 - 土地利用分类' },
          { title: '2 - 土地利用分类（GEP）' },
          { title: '3 - 城市绿地提取' },
          { title: '4 - 城市道路提取' },
          { title: '5 - 城市水体提取' },
          { title: '6 - 农业地块提取' },
        ],  
        to: "/getting_started"
      },
      {
        title: 'Education',
        action: 'mdi-school',
        items: [
            { title: 'List Item' }
        ],
      },
      {
        title: 'Family',
        action: 'mdi-run',
        items: [
            { title: 'List Item' }
        ],
      },
      {
        title: '其他资源',
        action: 'mdi-bottle-tonic-plus',
        items: [
            { title: 'List Item' }
        ],
      },
      {
        title: '关于我们',
        action: 'mdi-rugby',
        items: [
            { title: 'List Item' }
        ],
      },
      {
        title: 'Promotions',
        action: 'mdi-tag',
        items: [
            { title: 'List Item' }
        ],
      },
    ],
  }),

  methods:{
     async onClick (hash) {
        if (this.hash === hash) return

        this.scrolling = true

        this.$router.push({ path: this.path, hash })

        await this.$vuetify.goTo(hash)

        this.scrolling = false
      },
  }

};
</script>