"use strict";

import path from 'path';
import { fileURLToPath } from 'url';

import { AngularWebpackPlugin } from '@ngtools/webpack';

import linkerPlugin from '@angular/compiler-cli/linker/babel';


// import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import TerserPlugin from "terser-webpack-plugin"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const path = require("path");
// const { AngularCompilerPlugin, PLATFORM } = require("@ngtools/webpack");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
// const TerserPlugin = require("terser-webpack-plugin");

// module.exports = {
//   entry: {
//     macro: [
//       "./src/memuMacro/index.ts",
//       "./src/ffbeMacro/index.ts",
//       "./src/macroBuilder/index.ts",
//     ],
//     main: "./src/web/js/main.ts",
//     theme: "./src/web/js/theme.js",
//   },
//   output: { path: path.resolve(__dirname, "dist/js"), filename: "[name].js" },
//   // stats: "minimal",
//   resolve: { extensions: [".ts", ".js"] },
//   module: {
//     rules: [
//       { test: /.html$/, use: ["raw-loader"] },
//       { test: /.css$/, use: ["raw-loader"] },
//       {
//         test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
//         use: ["@ngtools/webpack"],
//       },
//     ],
//   },
//   optimization: {
//     emitOnErrors: false,
//     mangleWasmImports: true,
//     minimizer: [
//       new TerserPlugin({
//         // cache: true,
//         extractComments: false,
//         parallel: true,
//         terserOptions: {
//           compress: true,
//           ecma: 2020,
//           mangle: true,
//           output: {
//             beautify: false,
//             comments: false,
//           },
//         },
//         // sourceMap: false,
//       }),
//     ],
//     splitChunks: {
//       cacheGroups: {
//         vendor: {
//           chunks: "initial",
//           name: "vendor",
//           test: /[\\/]node_modules[\\/]/,
//           enforce: true,
//         },
//       },
//     },
//   },
//   plugins: [
//     new AngularCompilerPlugin({
//       entryModule: "./src/web/js/modules/app.module#AppModule",
//       tsConfigPath: "./tsconfig.json",
//       compilerOptions: {
//         enableIvy: true,
//         removeComments: true,
//         trace: true,
//       },
//     }),
//     new BundleAnalyzerPlugin(),
//   ],
// };


const CONFIG = {
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
      //{ test: /.html$/, use: ["raw-loader"] },
      { test: /.css$/, use: ["raw-loader"] },
      {
        test: /\.[cm]?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            compact: false,
            plugins: [linkerPlugin],
          },
        },
      },
      {
        test: /\.[jt]sx?$/,
        use: ["@ngtools/webpack"],
      },
    ],
  },
  optimization: {
    emitOnErrors: false,
    mangleWasmImports: true,
    minimizer: [
      new TerserPlugin({
        // cache: true,
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
        // sourceMap: false,
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
    new AngularWebpackPlugin({
      entryModule: "./src/web/js/modules/app.module#AppModule",
      tsConfigPath: "./tsconfig.json",
      jitMode: false,
      compilerOptions: {
        compilationMode: "full",
        alwaysStrict: true,
        enableIvy: true,
        removeComments: true,
        trace: true,
      },
    }),
    // new BundleAnalyzerPlugin(),
  ],
}

export { CONFIG }