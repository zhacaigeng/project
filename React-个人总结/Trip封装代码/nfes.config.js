
module.exports = {
    ///<!--Expression generation area, please do not modify-->
    // cdn-start
    cdn_fat : "//webresource.english.fws.qa.nt.ctripcorp.com/NFES/platform/1630896952013",
                    cdn_uat: "//webresource.english.uat.qa.nt.ctripcorp.com/NFES/platform/1630896952013",
                    cdn_pro: "//webresource.english.c-ctrip.com/NFES/platform/1630896952013",
                    cdn_vd :"/NFES/platform/1630896952013/",
// cdn-end
  
    // vd-start
    vd: "/webapp/platform",
// vd-end
    ///<!--Expression generation area, please do not modify-->
  
    openI18nResource: true,
    openUBTI18n: true,
    international: true,
    openPolyfillsI18n: true,
    // launch page
    main: "home.html",
    buildId: 'xxx',
    offline: true,
    // port
    port: '8080',
    // necessary item
    "htmlCache": false,
    // ? redisKey need to apply for at cd/ service market
    "redisName": "xxxxProductForBI",
    // optional item
    // ? number html cache time
    "htmlCacheTime": 3000, // ms
    // ? page do not need cached
    "excludeCache": ["index.html"],
    channel: "index",
    serverInclude: ['antd'],
    nfesBabel: {
      plugins: [
        'jsx-control-statements',
        '@babel/proposal-function-bind',
        ["import",  { "libraryName": "antd", "libraryDirectory": "lib", "style": true }, "antd"],
      ]
    },
    webpack: function (nfesConfig) {
      const projectDir = __dirname;
      const path = require("path");
      const webpack = require('webpack');
    
      return Object.assign({}, nfesConfig, {
        webpack: function (config, options) {
          config.plugins.push(new webpack.DefinePlugin({
            __CLIENT__: JSON.stringify(!options.isServer),
            __SERVER__: JSON.stringify(options.isServer)
          }));
          config.resolve.alias = Object.assign(config.resolve.alias, {
            "$src": path.join(projectDir, "src"),
            "$pages": path.join(projectDir, "pages"),
            "$api": path.join(projectDir, "src/api"),
            "$components": path.join(projectDir, "src/components"),
            "$config": path.join(projectDir, "src/config"),
            "$utils": path.join(projectDir, "src/utils")
          })
          if (typeof nfesConfig.webpack === 'function') {
            return nfesConfig.webpack(config, options);
          }
          return config
        }
      })
    }
  }
  