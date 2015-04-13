var gulp = require('gulp');
var paths = require('../paths');
var jasmine = require('gulp-jasmine');

/**
 * Run tests for the server
 */
gulp.task('test', function () {
  return gulp.src(paths.test.files)
    .pipe(jasmine({verbose: true}));
});


/**
 * watches for changes in the output directory.
 * You should run the watch-server and watch-server-test tasks with this
 */
gulp.task('tdd', function () {
  gulp.watch([paths.test.files, paths.files], ['test']);
});
