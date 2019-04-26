const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const rimraf = require('rimraf');

rimraf('build', () => {console.log('@ build directory deleted @')});

module.exports = merge(common, {
  mode: 'production',
  entry: "./src/lib/index.js",
  output: {
    libraryTarget: 'commonjs2',
    library: 'DatePicker',
    path: path.join(__dirname, "/build"),
    filename: "date_picker.js",
  }
});