const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const tsImportPluginFactory = require("ts-import-plugin");

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

// 编译环境
const env = process.env.NODE_ENV;

// 判断是否为开发模式
const devMode = env === "development";

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
 * 插件
 */
const plugins = [
  new MiniCssExtractPlugin({
    filename: "assets/styles/[name].css",
    chunkFilename: "assets/styles/[id].css",
    ignoreOrder: false, // Enable to remove warnings about conflicting order
  }),
  new VueLoaderPlugin(),
];

if (devMode) {
  plugins.push(new webpack.HotModuleReplacementPlugin({}));
}

const webpackConfig = {
  mode: env,
  entry: {
    index: "./src/main.ts",
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
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [/\.vue$/],
              getCustomTransformers: () => ({
                before: [
                  tsImportPluginFactory({
                    libraryName: "element-ui",
                    style: false,
                  }),
                ],
              }),
              compilerOptions: {
                module: "es2015",
              },
            },
          },
        ],
      },
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
              hmr: devMode,
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
              publicPath: "/assets/styles/fonts/",
              outputPath: "/assets/styles/fonts/",
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
    minimize: env === "production",
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ie8: true,
          keep_fnames: true,
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
  plugins,
  performance,
};
module.exports = (env, argv) => {
  if (devMode) {
    webpackConfig.devtool = "soucre-map";
  }

  return webpackConfig;
};
