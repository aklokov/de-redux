const gulp = require('gulp');

gulp.task('full-build', ['build', 'tslint']);

gulp.task('full-run', ['full-build', 'tests']);
