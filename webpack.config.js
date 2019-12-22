const path = require('path');

  module.exports = {
    entry: './app/script.js',
    output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'js'),
    publicPath: '/js'
  }
};
