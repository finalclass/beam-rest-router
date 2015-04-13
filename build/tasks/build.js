var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var to5 = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var compilerOptions = require('../babel-options');

//transpiles changed es6 server files to SystemJS format
gulp.task('build-src', function () {
  return gulp.src(paths.source)
    .pipe(plumber())
    .pipe(changed(paths.dest, {extension: '.js'}))
    .pipe(sourcemaps.init())
    .pipe(to5(compilerOptions))
    .pipe(sourcemaps.write({includeContent: false, sourceRoot: '/' + paths.sourceRoot}))
    .pipe(gulp.dest(paths.dest));
});

//transpiles changed es6 server's test files to SystemJS format
gulp.task('build-test', function () {
  return gulp.src(paths.test.source)
    .pipe(plumber())
    .pipe(changed(paths.test.dest, {extension: '.js'}))
    .pipe(sourcemaps.init())
    .pipe(to5(compilerOptions))
    .pipe(sourcemaps.write({includeContent: false, sourceRoot: '/' + paths.test.sourceRoot}))
    .pipe(gulp.dest(paths.test.dest));
});

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-src', 'build-test'],
    callback
  );
});
