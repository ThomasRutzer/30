const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const path = require("path")

module.exports = (env = {}) => ({
  mode: env.production ? "production" : "development",
  devtool: env.production ? "source-map" : "eval-source-map",
  plugins: [
    new HtmlWebpackPlugin({ template: "src/index.html", inject: "head" }),
    new CopyWebpackPlugin([
      { from: "assets/", to: "assets/" },
    ])
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    publicPath: "/",
    historyApiFallback: true,
    host: "0.0.0.0"
  }
})
