const copyplugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './index.js',
  mode: 'production',

  experiments: {
    asyncWebAssembly: true,
    topLevelAwait: true,
    outputModule: true,
    layers: true // optional, with some bundlers/frameworks it doesn't work without
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'btc-dapp-js.js',
    libraryTarget: 'module'
  },

  plugins: [
        // Work around for Buffer is undefined:
        // https://github.com/webpack/changelog-v5/issues/10
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer']
        }),

        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1, // disable creating additional chunks
        })
  ]

};
