<template>
   <div class="text-center">
        <v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on" color="#444">
              {{ role }}
              <v-icon class="ml-1">mdi-translate</v-icon>
            </v-btn>
          </template>
          <v-sheet class="overflow-hidden">
            <v-list dense expand nav>
              <v-list-item @click="toCN()">
                <v-list-item-title class="d-flex align-center">
                  简体中文
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="toEn()">
                <v-list-item-title class="d-flex align-center">
                  English
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-menu>
      </div>
  </template>
  
  <script>
    export default {
      data: () => ({
        // items: [
        //   { title: 'Click Me' },
        //   { title: 'Click Me' },
        //   { title: 'Click Me' },
        //   { title: 'Click Me 2' },
        // ],
      }),
      methods: {
        toCN() {
          this.$i18n.locale = 'zn'
        },
        toEn() {
          this.$i18n.locale = 'en'
      }
    }
  }
  </script>