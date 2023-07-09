const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Go程序员',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: '工具',
        items: [
          {
            text: '效率提升',
            items: [
              { text: 'Autojump', link: '/blog/01-工具/效率提升/autojump/' },
              { text: 'Karabiner', link: '/blog/01-工具/效率提升/karabiner-Elements/' },
              { text: 'KeyCastr', link: '/blog/01-工具/效率提升/KeyCastr/' },
              { text: 'Item2', link: '/blog/01-工具/效率提升/item2/' },
              { text: 'Zsh', link: '/blog/01-工具/效率提升/zsh/' },
              { text: 'Tmux', link: '/blog/01-工具/效率提升/tmux/' },
              { text: 'pnpm', link: '/blog/01-工具/效率提升/pnpm/' }
            ]
          },
          {
            text: '编程开发',
            items: [
              { text: 'Mac', link: '/blog/01-工具/编程开发/mac/' },
              { text: 'Linux', link: '/blog/01-工具/编程开发/linux/' },
              { text: 'Chrome', link: '/blog/01-工具/编程开发/chrome/' },
              { text: 'VsCode', link: '/blog/01-工具/编程开发/vscode/' },
              { text: 'Vim', link: '/blog/01-工具/编程开发/vim/' },
              { text: 'Git', link: '/blog/01-工具/编程开发/git/' },
              { text: 'Sublime', link: '/blog/01-工具/编程开发/sublime/' }
            ]
          },
          {
            text: '通用软件',
            items: [
              { text: 'Typora', link: '/blog/01-工具/通用软件/Typora/' },
              { text: 'Notion', link: '/blog/01-工具/通用软件/Notion/' },
              { text: 'Witeboard', link: '/blog/01-工具/通用软件/Witeboard/' },
              { text: '时光序', link: '/blog/01-工具/通用软件/时光序/' }
            ]
          },
          {
            text: '通用硬件',
            items: [{ text: '键盘', link: '/blog/01-工具/通用硬件/键盘/' }]
          }
        ]
      },
      {
        text: 'MySQL',
        link: '/blog/05-MySQL/toc/'
      },
      {
        text: 'Redis',
        link: '/blog/06-Redis/toc/'
      },
      {
        text: '操作系统',
        link: '/blog/02-操作系统/toc/'
      },
      {
        text: '计算机网络',
        link: '/blog/03-计算机网络/toc/'
      },
      {
        text: 'Golang',
        link: '/blog/04-Golang/toc/'
      },
      {
        text: '算法',
        link: '/blog/07-算法/toc/'
      },
      {
        text: '框架',
        link: '/blog/08-框架/'
      },
      {
        text: '架构设计',
        link: '/blog/09-架构设计/toc/'
      },
      {
        text: 'Github',
        link: 'https://github.com/caijinlin'
      },
      {
        text: 'Guide',
        link: '/guide/'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          sidebarDepth: 2, // 可选的, 默认值是 1
          collapsable: false, // 可选的, 默认值是 true,
          children: ['', '/guide/index1.md', '/guide/index2.md']
        }
      ],
      '/blog/08-框架/': [
        {
          text: '框架',
          sidebarDepth: 2, // 可选的, 默认值是 1
          collapsable: false, // 可选的, 默认值是 true,
          children: ['/blog/08-框架/toc.md']
        },
        {
          text: '框架',
          sidebarDepth: 2, // 可选的, 默认值是 1
          collapsable: false, // 可选的, 默认值是 true,
          children: ['']
        }
      ]
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom', '@vuepress/plugin-active-header-links']
}
