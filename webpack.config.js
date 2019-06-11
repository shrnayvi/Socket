var path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const entry = {
  'socket': './public/src/js/socket.js',
}

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, 'public/build'),
    filename: "js/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          { 
            loader: MiniCssExtractPlugin.loader, 
            options: {
              publicPath: (resourcePath, context) => {
                return context + './public/build/css/'
                console.log(resourcePath, context, 'pathsss');
              }
            }
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.scss']
  },
  plugins: [ 
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }) 
  ],
};
