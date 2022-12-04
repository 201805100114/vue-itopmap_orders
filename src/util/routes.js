// Imports
import { kebabCase } from 'lodash'
import { leadingSlash, trailingSlash } from '@/util/helpers'
// 配置路由 libin
export function abort (code = 404) {
  return {
    name: 'FourOhFour',
    path: '*',
    component: () => error(code),
  }
}

export function error (code = 404) {
  return import(
    /* webpackChunkName: "error-[request]" */
    `@/views/${code}.vue`
  )
}

export function redirect (
  path = '*',
  rhandler,
) {
  if (typeof path === 'function') {
    rhandler = path
    path = '*'
  }

  return {
    path,
    redirect: to => {
      const rpath = rhandler(to)
      const url = rpath !== ''
        ? leadingSlash(trailingSlash(rpath))
        : rpath

      return `/${url}`
    },
  }
}

// 指定 /layerouts/{dir}/目录下的 index.vue 生成layout，其中的组件由 route 函数提供
export function layout (layout = 'Default', children, path = '') {
  // 短横线隔开式函数 libin
  const dir = kebabCase(layout)
  return {
    children,
    component: () => import(
      /* webpackChunkName: "layout-[request]" */
      `@/layouts/${dir}/index`
    ),
    path,
  }
}

// 生成view目录下面组件所对应的 route
export function route (name, component, path = '') {
  component = Object(component) === component
    ? component
    : { default: name.replace(' ', '') }
  const components = {}
  for (const [key, value] of Object.entries(component)) {
    components[key] = () => import(
      /* webpackChunkName: "views-[request]" */
      `@/views/${value}`
    )
  }
  // 路由的标准格式 libin
  return {
    name,
    components,
    path,
  }
}
