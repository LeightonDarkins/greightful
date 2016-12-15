var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './public/frontend/build');
var APP_DIR = path.resolve(__dirname, './public/frontend/app');
var INPUT_DIR = path.resolve(__dirname, './public/frontend/input');

var config = {
  entry: {
    app: APP_DIR + '/index.jsx',
    input: INPUT_DIR + '/index.jsx'
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].greightful-bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: [APP_DIR, INPUT_DIR],
        loader: 'babel'
      }
    ]
  }
};

module.exports = config;
