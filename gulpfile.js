"use strict";

import * as browserSync from "browser-sync";
import {deleteAsync} from "del";
import gulp from "gulp";
import webpack from "webpack";
import tslint from "gulp-tslint";
import chalk from "chalk"
import htmlmin from "gulp-htmlmin";
import { CONFIG } from './webpack.config.js'

const browser = browserSync.create();

gulp.task('watch', () => {
  gulp.watch(['./src/web/index.html'], gulp.series('static'), () => { browser.reload(); });
});

gulp.task('lint', () =>
  gulp.src('./src/**/*.ts')
    .pipe(tslint({
      formatter: "verbose"
    }))
    .pipe(tslint.report())
);

gulp.task('scripts', () => {
  const config = { mode: 'production', ...CONFIG };
  const compiler = webpack(config);
  //console.log('\x1Bc');
  compiler.watch({
    aggregateTimeout: 500,
    ignored: /node_modules/,
    pool: 1000
  }, (err, stats) => {
    if (err || stats.hasErrors()) {
      //console.log('\x1Bc');
      console.log(chalk.red(`${(new Date()).toISOString()} Script Build Failed`));
      console.log(chalk.red(`${err ? err : stats.toString({ all: false, errors: true, errorDetails: true })}`))
    } else {
      console.log(err);
      console.log(chalk.green(`${(new Date()).toISOString()} Script Build Done`));
      browser.reload();
    }
  });
});

gulp.task('clean', () => deleteAsync('./dist'));

gulp.task('static', () => {
  return gulp.src('./src/web/index.html')
    .pipe(htmlmin({ collapseWhitespace: true, minifyCSS: true, minifyJS: true }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('server', () => {
  browser.init({ server: { baseDir: './dist' } }, () => {
    console.log(`Ready`);
  });
  return gulp.watch('./dist/**/*').on('change', () => {
    browser.reload();
  });
});

gulp.task('dev', gulp.series(
  'clean',
  'static',
  gulp.parallel('server', 'scripts', 'watch'),
));

gulp.task('default', gulp.series('dev'));
