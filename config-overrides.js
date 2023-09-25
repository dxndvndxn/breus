const StaticSiteGeneratorPlugin = require('@slorber/static-site-generator-webpack-plugin');
const { JSDOM } = require('jsdom');
const { window, document } = new JSDOM();
module.exports = (config, env) => {
    if (env === 'production') {
        config.plugins = config.plugins.concat([
            new StaticSiteGeneratorPlugin({
                paths: [
                    '/',
                    '/about'
                ],
                globalObject: {
                    window
                }
            })
        ]);
    }

    return config;
};
