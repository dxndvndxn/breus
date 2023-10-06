module.exports = function override(config, env) {
    const isProduction = env === 'production';
    config.plugins[0].userOptions.production = isProduction;

    if (isProduction) {
      config.plugins[0].userOptions.inject = false;
    }

    return config;
}
