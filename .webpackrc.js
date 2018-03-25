export default {
  alias: {
    components: `${__dirname}/src/components`,
    utils: `${__dirname}/src/utils`,
    config: `${__dirname}/src/utils/config`,
    enums: `${__dirname}/src/utils/enums`,
    services: `${__dirname}/src/services`,
    models: `${__dirname}/src/models`,
    routes: `${__dirname}/src/routes`,
    themes: `${__dirname}/src/themes`,
  },
  env: {
    development: {
      extraBabelPlugins: [
        'dva-hmr',
        [
          'import', {
            'libraryName': 'antd',
            'libraryDirectory': 'es',
            'style': true
          }
        ]
      ],
      proxy: {
        "/api": {
          "target": "http://127.0.0.1:7001/",
          "changeOrigin": true
        }
      },
    },
  }
}
