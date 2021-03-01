/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const config = {
    mode: 'development',
    devServer: {
        host: process.env.IP,
        https: false,
        disableHostCheck: true,
        contentBase: path.resolve(__dirname, 'public'),
        historyApiFallback: {
            index: '/'
        },
        // contentBase: './dist',
        overlay: true,
        hot: true,
        inline: true,
        port: 8080,
        compress: true,
        open: true,
    },
};

module.exports = merge(common, config);
