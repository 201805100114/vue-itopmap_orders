<template>
  <div class="about">
      <h1>{{ $t('message.hello') }}</h1>
      <h1>{{ $t('name') }}</h1>
      
      <div class="mt-6">
          <p @click="isChoose = true" style="cursor:point">请选择语言</p>
          <ul v-if="isChoose">
              <li v-for="(item, index) in languages" :key="index" @click="chooesLange(item[0])">{{ item[1] }}</li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          languages: new Map([
              ['zn', '中文'],
              ['en', 'English'],
              ['ja', '日本语'],
          ]),
          isChoose: false,
      };
  },
  methods: {
      chooesLange(languageItem) {
          this.$i18n.locale = languageItem;
          this.isChoose = false;
      },
  },
};
</script>

<style scoped>
p,
ul {
  cursor: pointer;
}
</style>

