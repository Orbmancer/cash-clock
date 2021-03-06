'use strict';

module.exports = {
  entry: './app.js',      // The entrypoint of your bundle, webpack will fetch all its dependencies
  output: {
    filename: 'dist/bundle.js' // The name of the file you want to generate
  },
  module: {
    loaders: [
      {
        test: /.js$/,             // Transform all .js files from our project
        loader: 'babel-loader',   // Use the loader “babel-loader” to transform those files
        exclude: /node_modules/,  // Do not fetch the packages installed by NPM
        query: {
          presets: ['es2015'] // Transform ES6 (using babel-preset-es2015) into ES5 that browsers understand
        }
      }
    ]
  },
}

