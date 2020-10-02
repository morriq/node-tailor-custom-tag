const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = () => {
    return {
        entry: [
            'webpack-hot-middleware/client',
            resolve(__dirname, 'src/index.js')
        ],
        mode: 'production',
        context: __dirname,
        output: {
            path: resolve(__dirname, 'dist')
        },
        plugins: [
            new HTMLWebpackPlugin(),
            new webpack.HotModuleReplacementPlugin(),
        ]
    };
}
