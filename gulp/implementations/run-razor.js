const gulp = require('gulp');
const settings = require('../settings');
const transform = require('gulp-transform');
const rename = require('gulp-rename');

gulp.task('run-razor', function () {
  return gulp.src(settings.razorFiles)
    .pipe(transform('utf8', razorToTs))
    .pipe(rename({ extname: '.ts' }))
    .pipe(gulp.dest(settings.srcPath));
});

function razorToTs(content) {
  const razor = require('razor-code-js');
  return razor.generate(content);
}