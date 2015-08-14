var path = require('path'),
  fs = require('fs'),
  webpack = require('webpack');

module.exports = {
  context: __dirname,

  entry: {
    app: './client/js/app'
  },

  output: {
    path: __dirname + '/build',
    filename: '[chunkhash].bundle.js',
    publicPath: 'http://localhost:8080/app/build/'
  },

  resolve: {
    root: path.resolve('./client/js'),
    extensions: ['', '.js', '.jsx', '.json'],
    modulesDirectories: ['node_modules']
  },

  plugins: [
    function() {
      this.plugin('done', function(stats) {
        fs.writeFileSync(
          path.join(__dirname, 'build', 'stats.json'),
          JSON.stringify(stats.toJson(), null, 2)
        );
      });
    }
    //new webpack.optimize.UglifyJsPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.(eot|png|jpg|svg|woff|woff2|ttf)(\?.*)?$/,
        loader: 'file'
      }, {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  },

  devtool: 'source-map'
};
