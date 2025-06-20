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
    `],
    [
      'script', {}, `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?773588e2732a2b3ffc55c8f04c49db60";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
        `
    ]
  ]
}