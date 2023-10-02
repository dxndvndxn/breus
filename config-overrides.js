module.exports = function override(config, env) {
    //console.log('config', config);
    console.log('env', env);
    console.log('config.plugins', config.plugins[0]);
    //do stuff with the webpack config...
    return config;
}
