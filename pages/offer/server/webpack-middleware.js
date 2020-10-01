const middleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');

const webpackConfig = require('../app/webpack.config.js');

const compiler = webpack(webpackConfig());

module.exports = [
    middleware(compiler, { publicPath: '/', writeToDisk: true, serverSideRender: true }),
    hotMiddleware(compiler)
];
