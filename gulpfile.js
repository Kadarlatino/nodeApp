'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let babel = require('gulp-babel');
let clean = require('gulp-clean');
let concat = require('gulp-concat');
let browserify = require('browserify');
let uglify = require('gulp-uglify');
let pump = require('pump');
let browserSync = require('browser-sync').create();

gulp.task('sass', function () {
  gulp.src('./assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

gulp.task('sass:watch', function () {
  gulp.watch('./assets/sass/**/*.scss', ['sass']);
});

gulp.task('bs-proxy', function() {
  browserSync.init({
    //proxy: "loc.loc/ortnec"
  });
});

// process JS files and return the stream.
gulp.task('js', (cb)=>{
  gulp.src('./public/js/*.js').pipe(clean());

  pump([
    gulp.src('./assets/js/*.js'),
    babel({
      "presets": ["env"]
    }),
    concat('bundle.js'),
    uglify(),
    gulp.dest('./public/js/')
  ], cb);
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

// Static Server(Proxy to apache2) + watching scss/html files
gulp.task('serve', ['sass', 'js'], function() {

  // browserSync.init({
  //     proxy: "loc.loc/ortnec"
  // });

  gulp.start('js-watch');
  gulp.watch("./assets/sass/*.scss", ['sass']);
  gulp.watch("./assets/js/*.js", ['js-watch']);
  gulp.watch("./views/*.pug").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
