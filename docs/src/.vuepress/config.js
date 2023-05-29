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
                    {text: 'Autojump', link: '/blog/工具/效率提升/autojump/'},
                    {text: 'Karabiner', link: '/blog/工具/效率提升/karabiner-Elements/'},
                    {text: 'KeyCastr', link: '/blog/工具/效率提升/KeyCastr/'},
                    {text: 'Item2', link: '/blog/工具/效率提升/item2/'},
                    {text: 'Zsh', link: '/blog/工具/效率提升/zsh/'},
                    {text: 'Tmux', link: '/blog/工具/效率提升/tmux/'},
                ]
            },
            {
                text: '编程开发', 
                items: [
                    {text: 'Vim', link: '/blog/工具/编程开发/vim/'},
                ]
            },
            {
                text: '通用软件', 
                items: [
                    {text: 'Notion', link: '/blog/工具/通用软件/Notion/'},
                    {text: 'Witeboard', link: '/blog/工具/通用软件/Witeboard/'},
                    {text: '时光序', link: '/blog/工具/通用软件/时光序/'},
                ]
            },
            {
                text: '通用硬件', 
                items: [
                    {text: '笔记本', link: '/blog/工具/通用硬件/笔记本/'},
                    {text: '键盘', link: '/blog/工具/通用硬件/键盘/'},
                ]
            }
        ]
      },
      {
        text: 'Github',
        link: 'https://github.com/caijinlin'
      }
    ],
    sidebar: 'auto',
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    '@vuepress/plugin-active-header-links'
  ]
}
