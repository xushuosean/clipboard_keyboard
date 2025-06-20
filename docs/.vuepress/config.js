module.exports = {
  base: "/clipboard_keyboard/",
  themeConfig: {
    sidebar: [
      '/',
    ],
    search: false,
  },
  markdown: {
    lineNumbers: true
  },
  less: {},
  chainWebpack(config) {
    config.resolve.alias.set('core-js/library/fn', 'core-js/features');
  },
  head: [
    ['script', { src: 'https://www.googletagmanager.com/gtag/js?id=G-3LPK9KXQ75' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-3LPK9KXQ75');
    `]
  ]
}