const gulp = require('gulp');
const watch = require('gulp-watch');
const settings = require('../settings');
const sequence = require('run-sequence');

function start(done = () => {}) {
  sequence('run-razor', 'generate-reexports', done);
}

gulp.task('watch', function () {
  start(function () {
    watch(settings.razorFiles, function () {
      start();
    });
  });
});