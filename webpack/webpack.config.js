const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

module.exports = (envVars) => {
    const { env } = envVars
    const envConfig = require(`./webpack.${env}.js`)(envVars)
    const config = merge(commonConfig, envConfig)
    return config
}