const path = require("path");
const webpack = require("webpack");
const { CheckerPlugin } = require("awesome-typescript-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
var HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// 读取配置文件
const fs = require("fs");

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

const sourceMap = process.env.NODE_ENV === "production" ? "soucre-map" : null;

const plugins = [];

const publicPath = "/";

const webpackConfig = {
  mode: process.env.NODE_ENV,
  entry: {
    app: "./src/index.ts"
  },
  output: {
    path: __dirname + "/dist",
    filename: "index.js",
    chunkFilename: "[id].js",
    libraryTarget: "commonjs2",
    path: path.resolve(__dirname, "dist"),
    publicPath
  },
  resolve: {
    extensions: [".vue", ".ts", ".tsx", ".js", ".jsx"],
    alias: {
      vue:
        process.env.NODE_ENV !== "production"
          ? "vue/dist/vue.js"
          : "vue/dist/vue.min.js",
      alias: {
        "@": resolve("src")
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              useCache: true
            }
          }
        ]
      }
    ]
  }
};
module.exports = (env, argv) => {
  if (process.env.NODE_ENV === "development") {
    webpackConfig.devtool = sourceMap;
  }

  if (process.env.NODE_ENV === "production") {
  }

  return webpackConfig;
};
