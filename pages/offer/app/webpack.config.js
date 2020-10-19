const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const libraries = require('../server/libraries');

module.exports = () => {
    return {
        entry: {
            main: [
                'webpack-hot-middleware/client',
                resolve(__dirname, 'src/index.js')
            ],
            ...[...libraries].map(([libraryName, library]) => ({[libraryName]: library().entrypoint})).reduce((prev, curr) => ({
                ...prev,
                ...curr
            }), {})
        },
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
