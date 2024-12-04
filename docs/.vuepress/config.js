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
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': 'G-3LPK9KXQ75' // UA-00000000-0
      }
    ]
  ]
}