/* config-overrides.js */
const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function override(config, env) {
  const emotionBabelOptions = {
    production: {
      hoist: true,
    },
    development: {
      sourceMap: true,
      autoLabel: true,
    },
  }[env];
  const newConfig = injectBabelPlugin(['emotion', emotionBabelOptions], config);
  return newConfig;
};
