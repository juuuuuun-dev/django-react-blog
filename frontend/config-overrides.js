const { compose, injectBabelPlugin, getLoader } = require('react-app-rewired');
const { rewireWorkboxGenerate } = require('react-app-rewire-workbox');
const rewireLess = require('react-app-rewire-less');
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = function override(config, env) {
  // For Ant Design Override
  // 1. Rewire Less https://github.com/timarney/react-app-rewired/tree/master/packages/react-app-rewire-less
  // 2. Override variable https://mobile.ant.design/docs/react/customize-theme
  config = rewireLess.withLoaderOptions({
    javascriptEnabled: true,
    modifyVars: {
      'brand-primary': 'red' // Here! :)
    }
  })(config, env);

  // ... other custom config

  return config;
};
