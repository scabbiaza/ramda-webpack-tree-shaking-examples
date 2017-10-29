let path = require("path")
let UglifyJSPlugin = require("uglifyjs-webpack-plugin")
let webpack = require("webpack")

let env = process.env.NODE_ENV
let minifyJS = env == "production"

let basePath = __dirname

module.exports = {
  entry: {
    "a": "./src/a.js",
    "b": "./src/b.js",
  },
  output: {
    path: path.join(basePath, "dist"),
    filename: "[name].js",
  },
  plugins: [
    new webpack.DefinePlugin({
     "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    ...(minifyJS ? [new UglifyJSPlugin()] : [])
  ],
}
