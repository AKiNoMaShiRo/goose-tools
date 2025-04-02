import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Goose Tools",
  description: "A Tools Introduce Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      // { text: '工具', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '组件',
        items: [
          { text: '签名', link: '/sign' },
          { text: '无缝滚动', link: '/seamlessScroll' },
          { text: '海量数据自动滚动', link: '/virtualInfiniteScroll' },
        ]
      },
      {
        text: '指令',
        items: [
          { text: '拖拽', link: '/directives/drag' },
          { text: '元素外点击', link: '/directives/outsideClick'  }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/AKiNoMaShiRo/goose-tools' }
    ]
  }
})
