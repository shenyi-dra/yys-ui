const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

const sourceMap = "soucre-map";
const env = process.env.NODE_ENV;

const publicPath = "/";

const performance = {
  hints: "warning",
  //入口起点的最大体积
  maxEntrypointSize: 50000000,
  //生成文件的最大体积
  maxAssetSize: 30000000,
  //只给出 js 文件的性能提示
  assetFilter: assetFilename => {
    return assetFilename.endsWith(".js");
  },
};

/**
 * Plugins
 */
const plugins = [
  new HtmlWebpackPlugin({
    chunks: ["app", "vendors"],
    favicon: path.resolve(__dirname, "./src/favicon.ico"),
    filename: "index.html",
    template: path.resolve(__dirname, "./src/index.html"),
    publicPath: publicPath,
  }),
  new MiniCssExtractPlugin({
    filename: "assets/styles/[name].css",
    chunkFilename: "assets/styles/[id].css",
    ignoreOrder: false, // Enable to remove warnings about conflicting order
  }),
  new VueLoaderPlugin(),
];

if (env === "development") {
  plugins.push(new webpack.HotModuleReplacementPlugin({}));
}

const webpackConfig = {
  mode: env,
  entry: {
    index: "./packages/index.ts",
    app: "./src/main.js",
  },
  output: {
    path: path.resolve(__dirname + "/dist"),
    filename: "[name].js",
    libraryTarget: "umd",
    publicPath,
  },
  resolve: {
    extensions: [".vue", ".ts", ".tsx", ".js", ".jsx"],
    alias: {
      vue: "vue/dist/vue.min.js",
      "@packages": path.resolve(__dirname, "./packages"),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            query: { compact: false },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "ts-loader",
            options: { appendTsSuffixTo: [/\.vue$/] },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {},
          },
        ],
      },
      {
        test: /\.(css)$/,
        use: [
          "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/assets/styles/",
              hmr: process.env.NODE_ENV === "development",
            },
          },
          {
            loader: "css-loader",
            options: {},
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              publicPath: "/assets/fonts/",
              outputPath: "/assets/fonts/",
            },
          },
        ],
      },

      {
        test: /\.scss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              publicPath: "/assets/images/",
              outputPath: "/assets/images/",
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ie8: true,
        },
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          safe: true,
          discardComments: { removeAll: true },
        },
        canPrint: true,
      }),
    ],
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/$/,
          to: "/index.html",
        },
      ],
      disableDotRule: true,
    },
    host: "127.0.0.1",
    // hot: true,
    port: 8000,
    proxy: {},
    publicPath,
    contentBase: path.resolve(__dirname, "dist"),
  },
  plugins,
  performance,
};
module.exports = (env, argv) => {
  // webpackConfig.devtool = sourceMap;

  return webpackConfig;
};
