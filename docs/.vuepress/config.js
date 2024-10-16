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
    chainWebpack (config) {
        config.resolve.alias.set('core-js/library/fn', 'core-js/features');
    },
  }