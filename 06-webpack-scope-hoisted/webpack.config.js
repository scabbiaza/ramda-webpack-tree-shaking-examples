let path = require("path")
let UglifyJSPlugin = require("uglifyjs-webpack-plugin")
let webpack = require("webpack")

let env = process.env.NODE_ENV
let minifyJS = env == "production"

let basePath = __dirname

module.exports = {
  entry: {
    "index": "./src/index.js",
  },
  output: {
    path: path.join(basePath, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js(\?.*)?)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
     ...(minifyJS ? [new UglifyJSPlugin()] : [])
  ],
}
