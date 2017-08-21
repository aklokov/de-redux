const gulp = require('gulp');
const watch = require('gulp-watch');
const settings = require('../settings');

gulp.task('run-razor.watch', function () {
  gulp.start('run-razor');
  watch(settings.razorFiles, function () {
    gulp.start('run-razor');
  });
});