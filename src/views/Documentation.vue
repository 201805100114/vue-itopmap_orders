<template>
  <v-container
    class="pa-4 pa-sm-6 pa-md-8"
    fluid
    tag="section"
  >
    <v-responsive
      :max-width="category !== 'api' ? 868 : 1368"
      class="mx-auto overflow-visible"
    >
 
      <keep-alive max="3">
    <!-- <h1>This component mounts `../contents/${file name which is passed through props}.md` as Vue component dynamically</h1>
    <h2>{{ title }}</h2> -->
        <component class="markdown-body" :is="Component"/>
      </keep-alive>
    </v-responsive>
  </v-container>
</template>

<script>
  // Utilities
  //import { error } from '@/util/routes'
  import { genMetaInfo } from '@/util/metadata'
  import { get, sync } from 'vuex-pathify'
  //import { IN_BROWSER } from '@/util/globals'
  import 'github-markdown-css/github-markdown.css'

  // function load (route){
  //   const { category, page } = route.params

  //   const path = '@/pages/'
  //   path.join({category})
  //   path.join('/')
  //   path.join({page})
  //   path.join('.md')

  //   return require(path)
  // }

  export default {
    name: 'Documentation',

    async asyncData ({ store }) {  
      store.state.pages.md = this.markdown
    },
   
    metaInfo () {
      if (!this.frontmatter) return {}

      const { meta } = this.frontmatter

      if (!meta) return

      const {
        description = '',
        keywords = '',
        title = '',
      } = meta

      return genMetaInfo(
        title,
        description,
        keywords,
      )
    },
   
    data () {
      return {
        title: null,
        Component: null
      }
    },

    computed: {
      ...sync('pages', [
        'frontmatter',
        'toc',
        'md',
      ]),
      ...get('route', [
        'hash',
        'params@category',
        'params@page',
      ]),
    },

    async created () {

      //  this.$options.asyncData(
      //    {store: this.$store}
      //  )
      //this.init(this.md)

    //   const { category, page } = this.$route.params

    // const path = '@/pages/'
    // path.join({category})
    // path.join('/')
    // path.join({page})
    // path.join('.md')

      const markdown = require(`@/pages/${this.$route.params.category}/${this.$route.params.page}.md`)
      
      this.title = markdown.attributes.title
      this.Component = markdown.vue.component

      this.init(this.markdown)

      const { assets, actions = [] } = this.frontmatter
      this.$load(assets)

      for (const action of actions) {
        this.$store.dispatch(action)
      }

      // Use Async Components for the benefit of code splitting
      // https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components
      // this.dynamicComponent = () => import(`~/articles/${this.fileName}.md`).then(({ vue }) => vue.component
    },

    methods: {
      init (md) {
        const {
          attributes = {},
          toc = [],
          vue = {},
        } = md

        vue.Component.name = this.page
        this.frontmatter = attributes
        this.toc = toc
        this.Component = vue.component
      },

    },

  }
</script>

<style>
	.markdown-body {
		box-sizing: border-box;
		min-width: 200px;
		max-width: 980px;
		margin: 0 auto;
		padding: 45px;
	}

	@media (max-width: 767px) {
		.markdown-body {
			padding: 15px;
		}
	}
</style>