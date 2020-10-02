const middleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');

const webpackConfig = require('../app/webpack.config.js');

const compiler = webpack({
    ...webpackConfig(),
    mode: 'development',
});

module.exports = ({ disabled }) => disabled ? (request, response, next) => next() : [
    middleware(compiler, { publicPath: '/', writeToDisk: true, serverSideRender: true }),
    hotMiddleware(compiler)
];
