module.exports = function override(config, env) {
    const isProduction = env === 'production';
    config.plugins[0].userOptions.production = isProduction;
    config.plugins[0].userOptions.domain = process.env.REACT_APP_DOMAIN;

    if (isProduction) {
      config.plugins[0].userOptions.inject = false;
    }

    return config;
}
