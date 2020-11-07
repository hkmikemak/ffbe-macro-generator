"use strict";

const path = require("path");
const { AngularCompilerPlugin, PLATFORM } = require("@ngtools/webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    macro: [
      "./src/memuMacro/index.ts",
      "./src/ffbeMacro/index.ts",
      "./src/macroBuilder/index.ts",
    ],
    main: "./src/web/js/main.ts",
    theme: "./src/web/js/theme.js",
  },
  output: { path: path.resolve(__dirname, "dist/js"), filename: "[name].js" },
  // stats: "minimal",
  resolve: { extensions: [".ts", ".js"] },
  module: {
    rules: [
      { test: /.html$/, use: ["raw-loader"] },
      { test: /.css$/, use: ["raw-loader"] },
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: ["@ngtools/webpack"],
      },
    ],
  },
  optimization: {
    noEmitOnErrors: true,
    mangleWasmImports: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        extractComments: false,
        parallel: true,
        terserOptions: {
          compress: true,
          ecma: 2020,
          mangle: true,
          output: {
            beautify: false,
            comments: false,
          },
        },
        sourceMap: false,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new AngularCompilerPlugin({
      entryModule: "./src/web/js/modules/app.module#AppModule",
      tsConfigPath: "./tsconfig.json",
      compilerOptions: {
        enableIvy: true,
        removeComments: true,
        trace: true,
      },
    }),
    new BundleAnalyzerPlugin(),
  ],
};
