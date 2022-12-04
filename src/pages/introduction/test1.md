---
meta:
  title: Why you should be using Vuetify
  description: Vuetify has an extremely active community, provides easy to use Material Design components and is consistently updated.
  keywords: why vuetify, why choose vuetify, best vue framework, best ui framework
related:
  - /getting-started/installation/
  - /introduction/roadmap/
  - /about/meet-the-team/
nav: Why Vuetify?
---

```html
<style lang="scss">
  @import '~vuetify/src/components/VStepper/_variables.scss';

  .custom-class {
    padding: $stepper-step-padding;
  }
</style>

```

Detailed variable information is located on each component's API page; e.g. [v-alert](/api/v-alert/#sass-variables).

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |


~~删除效果~~

![文本内容](https://help.github.com/assets/images/site/favicon.ico "logo")

[Waring]

[百度](https://www.baidu.com)

:::tip

这是一个提示

:::

* 这是一个提示
  > 一级引用
  >> 二级引用

这是一个脚注的例子[^1]

<font face="微软雅黑" color="red" size="6">字体及字体颜色和大小</font>
<font color="#0000ff">字体颜色</font>

<v-alert type="warning">

  When importing Vuetify styles, ensure that your import is prefixed with a tilde **~**; e.g. `~vuetify/src/.../_variables.scss`

</v-alert>

<v-btn>btn</v-btn>

<v-alert border="right" colored-border type="error" elevation="2"> v1.5 reached end of life on **July 31st, 2020** and is no longer actively maintained. It is recommended to update to the latest stable version of Vuetify using our [Upgrade guide](/getting-started/upgrade-guide/). </v-alert>

<span v-for="i in 3"> {{ i }} </span>


{{ 1 + 1 }}


# 特性介绍

这是一段文字这是一段文字这是一段文字Learn more about what Vuetify is, how to create an application from scratch, browse API references, sample code, tutorials, and more.

<promoted-ad slug="vuemastery-getting-started" />

## Getting started

The easiest way to try Vuetify is to use our [Codepen template](https://template.vuetifyjs.com/). This template is used by all examples within the documentation and is the perfect sandbox to play around with the framework. If you prefer to use a local `index.html` file, we have a guide on how to [use via CDN](/getting-started/installation/#usage-with-cdn).

For additional installation options such as **Nuxt** and **VuePress**, visit the [Installation](/getting-started/installation/) page.

## What is Vuetify?

Vuetify is a complete UI framework built on top of Vue.js. The goal of the project is to provide developers with the tools they need to build rich and engaging user experiences. Unlike other frameworks, Vuetify is designed from the ground up to be easy to learn and rewarding to master with hundreds of carefully crafted components from the [Material Design specification](https://material.io/).

Vuetify takes a mobile first approach to design which means your application just works out of the box—whether it's on a phone, tablet, or desktop computer.

If you are an experienced developer and want to compare Vuetify to other libraries/frameworks, check out our [Vue Framework Comparison Chart](#comparison).

## Why Vuetify?

Since its initial release in 2014, [Vue.js](https://vuejs.org/) has grown to be one of the most popular JavaScript frameworks in the world. One of the reasons for this popularity is the wide use of _components_ which enable developers to create concise modules to be used and re-used throughout their application. UI Libraries are collections of these modules that implement a specific style guideline and provide the necessary tools to build expansive web applications.

Vuetify is developed exactly according to [Material Design specification](https://material.io/) with every component meticulously crafted to be modular, responsive, and performant. Customize your application with unique and dynamic [Layouts](/features/layouts/) and customize the styles of your components using [SASS variables](/features/sass-variables/).

Vuetify has a very active development cycle and is patched weekly, responding to community issues and reports at breakneck speed, allowing you to get your hands on bug fixes and enhancements more often. In addition, every major release is accompanied with 18 months of [Long-term support](/introduction/long-term-support/) for the previous minor version.

Unlike other frameworks, when you develop with Vuetify, you are never alone. Stuck on a problem? Take advantage of our massive [Discord community](https://community.vuetifyjs.com/) and collaborate with other Vuetify developers in one of our public help channels. Need a more personalized support solution? Vuetify offers **elite support** through [GitHub sponsorship](https://github.com/sponsors/johnleider) with options tailored to individuals and businesses. Check out some other ways to [Sponsor Vuetify development](/about/sponsors-and-backers/).

Below is a list of the top Vue.js frameworks and the features that we feel are important to single developers and businesses when choosing a UI library.

<vuetify-comparison />

So what are you waiting for? Head over to the [Installation](/getting-started/installation/) page and start building your next great idea today.

## Feature Guides

Learn more about the inner workings of Vuetify and become a skilled **v-developer** with our detailed feature guides. Each guide is designed to teach you how to get the most out of your development experience with information on: how to build responsive pages using [Layouts](/features/layouts/), how to customize the style of your application with [SASS variables](/features/sass-variables/), and how to slim down your application's package size via [Treeshaking](/features/treeshaking/), and more.

| Feature | Skill level | Time to read |
| ------- | ----------- | ------------ |
| [Bidirectionality (LTR/RTL)](/features/bidirectionality/) | Beginner | 1 min |
| [Global configuration](/features/global-config/) | Beginner | 1 min |
| [Icons](/features/icon-fonts/) | Beginner | 15 min |
| [Layouts](/features/layouts/) | Beginner | 5 min |
| [Theme](/features/theme/) | Beginner | 15 min |
| [Accessibility (a11y)](/features/accessibility) | Intermediate | 10 min |
| [Breakpoints](/features/breakpoints) | Intermediate | 15 min |
| [Internationalization (i18n)](/features/internationalization/) | Intermediate | 5 min |
| [Programmatic scrolling](/features/scrolling/) | Intermediate | 2 min |
| [SASS variables](/features/sass-variables/) | Intermediate | 10 min |
| [Presets](/features/presets/) | Advanced | 15 min |
| [Treeshaking](/features/treeshaking/) | Advanced | 15 min |

Can't find what you're looking for? Help us improve! Please reach out to [john@vuetifyjs.com](mailto:john@vuetifyjs.com) with your feedback or join us in the Vuetify [Discord community](https://community.vuetifyjs.com/).

<promoted-ad slug="vuetify-discord" />

<backmatter />