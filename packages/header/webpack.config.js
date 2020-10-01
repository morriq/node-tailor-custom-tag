const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = () => {
  const config = {
    resolve: {
      extensions: ['.tsx', '.jsx', '.js', '.ts'],
    },
    module: {
      rules: [
        {
          test: /(ts|js)x?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
  };

  const server = {
    ...config,
    entry: [resolve(__dirname, 'src/server.tsx')],
    output: {
      filename: 'server.js',
      libraryTarget: 'commonjs2',
      libraryExport: 'default',
    },
    target: 'node',
    externals: [nodeExternals()],
  };

  const client = {
    ...config,
    entry: [resolve(__dirname, 'src/client.tsx')],
    output: {
      filename: 'client.js',
      libraryExport: 'default',
      libraryTarget: 'umd',
    },
  };

  return [server, client];
};
