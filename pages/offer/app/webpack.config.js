const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = () => {
    return {
        entry: [
            'webpack-hot-middleware/client',
            resolve(__dirname, 'src/index.js')
        ],
        context: __dirname,
        output: {
            path: resolve(__dirname, 'dist')
        },
        plugins: [
            new BundleAnalyzerPlugin(),
            new HTMLWebpackPlugin(),
            new webpack.HotModuleReplacementPlugin(),
        ]
    };
}
