const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
    return {
        context: __dirname,
        output: {
            path: resolve(__dirname, 'dist')
        },
        plugins: [
            new HTMLWebpackPlugin()
        ]
    };
}
