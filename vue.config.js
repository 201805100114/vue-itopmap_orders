module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
    '/api': {
    target: 'http://121.4.138.96',
    changeOrigin: true, // 解决跨域
    pathRewrite: {
    '^/api': '',
    },
    '/cgi-bin': {
      target: 'https://mp.weixin.qq.com',
      changeOrigin: true, // 解决跨域
      pathRewrite: {
      '^/cgi-bin': '',
      },
      }
    },
    },
    },
}

const path = require('path');//引入path模块
// frontmatter-markdown-loader
const Mode = require('frontmatter-markdown-loader/mode')

function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}
module.exports={	
    chainWebpack: config =>{
        // path
		config.resolve.alias
        .set("@", resolve("src"))
        .set("assets", resolve("src/assets"))
        .set("components", resolve("src/components"))
        .set("views", resolve("src/views"));
        //set第一个参数：设置的别名，第二个参数：设置的路径　　
		// frontmatter-markdown-loader
		config.module
		.rule('markdown')
		.test(/\.md$/)
		.use('frontmatter-markdown-loader')
        .loader('frontmatter-markdown-loader')
        .tap(options => {
          return {
            mode: [Mode.VUE_COMPONENT],
			vue: {
              root: 'markdown-body'
            }
          }
        })　　
    }
}