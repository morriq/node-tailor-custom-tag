const { resolve } = require('path');

module.exports = (api) => {
  const plugins = [];
  const presets = [
    [
      '@babel/preset-env',
      {
        targets: api.caller((caller) => caller && caller.target === 'node')
          ? { node: 'current' }
          : undefined,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];
  return {
    plugins,
    presets,
  };
};
