"use strict";

const path = require('path');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    macro: ['./src/memuMacro/index.ts', './src/ffbeMacro/index.ts', './src/macroBuilder/index.ts'],
    main: './src/web/js/main.ts'
  },
  output: { path: path.resolve(__dirname, 'dist/js'), filename: '[name].js' },
  // stats: "minimal",
  resolve: { extensions: ['.ts', '.js'] },
  module: {
    rules: [
      { test: /.html$/, use: ['raw-loader'] },
      { test: /.css$/, use: ['raw-loader'] },
      { test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/, use: ['@ngtools/webpack'] },
    ]
  },
  optimization: {
    noEmitOnErrors: true,
    mangleWasmImports: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: true,
          ecma: 6,
          mangle: true,
          output: {
            beautify: false,
            comments: false
          }
        },
        sourceMap: false
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new AngularCompilerPlugin({
      enableIvy: true,
      entryModule: './src/web/js/modules/app.module#AppModule',
      tsConfigPath: './tsconfig.json',
    }),
    new BundleAnalyzerPlugin()
  ]
};
