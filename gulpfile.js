"use strict";

const browserSync = require('browser-sync');
const del = require('del');
const gulp = require('gulp');
const webpack = require('webpack');
const tslint = require('gulp-tslint');
const chalk = require('chalk');
const htmlmin = require('gulp-htmlmin');

const webpack_config = require('./webpack.config');

const browser = browserSync.create();

gulp.task('watch', () => {
  gulp.watch(['./src/web/index.html'], gulp.series('static'), () => { browser.reload(); });
  // gulp.watch(['!./src/web/index.html', './src/**/*'], gulp.series('scripts'), () => { browser.reload(); });
});

gulp.task('lint', () =>
  gulp.src('./src/**/*.ts')
    .pipe(tslint({
      formatter: "verbose"
    }))
    .pipe(tslint.report())
);

gulp.task('scripts', () => {
  const config = { mode: 'production', ...webpack_config };
  const compiler = webpack(config);
  console.log('\x1Bc');
  compiler.watch({
    aggregateTimeout: 500,
    ignored: /node_modules/,
    pool: 1000
  }, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log('\x1Bc');
      console.log(chalk.red(`${(new Date()).toISOString()} Script Build Failed`));
      console.log(chalk.red(`${err ? err : stats.toString({ all: false, errors: true, errorDetails: true })}`))
    } else {
      console.log(chalk.green(`${(new Date()).toISOString()} Script Build Done`));
      browser.reload();
    }
  });
});

// gulp.task('scripts', () => new Promise((resolve) => {
//   const config = { watch: true, mode: 'production', ...webpack_config };
//   webpack(config, (err, stats) => {
//     console.log((err) ? err : stats.toString());
//     resolve();
//   });
// }));

gulp.task('clean', () => del('./dist'));

gulp.task('static', () => {
  return gulp.src('./src/web/index.html')
    .pipe(htmlmin({ collapseWhitespace: true, minifyCSS: true, minifyJS: true }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('server', () => {
  browser.init({ server: { baseDir: './dist' } });

  return gulp.watch('./dist/**/*').on('change', () => {
    browser.reload();
  });
});

gulp.task('dev', gulp.series(
  'clean',
  gulp.parallel('static', 'scripts', 'server', 'watch')
));

gulp.task('default', gulp.series('dev'));
