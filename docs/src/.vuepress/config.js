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
            items: [{ text: '键盘', link: '/blog/工具/通用硬件/键盘/' }]
          }
        ]
      },
      {
        text: 'MySQL',
        items: [
          { text: '基础篇', link: '/blog/05-MySQL/toc/' },
          { text: '索引篇', link: '/blog/05-MySQL/toc/' },
          { text: '事务篇', link: '/blog/05-MySQL/toc/' },
          { text: '锁篇', link: '/blog/05-MySQL/toc/' },
          { text: '日志篇', link: '/blog/05-MySQL/toc/' }
        ]
      },
      {
        text: 'Redis',
        items: [
          { text: '数据类型篇 ', link: '/blog/06-Redis/toc/' },
          { text: '持久化篇', link: '/blog/06-Redis/toc/' },
          { text: '缓存篇', link: '/blog/06-Redis/toc/' },
          { text: '高可用篇', link: '/blog/06-Redis/toc/' }
        ]
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
        link: '/blog/08-框架/toc/'
      },
      {
        text: '架构设计',
        link: '/blog/09-架构设计/toc/'
      },
      {
        text: 'Github',
        link: 'https://github.com/caijinlin'
      }
    ],
    sidebar: 'auto'
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom', '@vuepress/plugin-active-header-links']
}
