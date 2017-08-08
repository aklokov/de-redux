const gulp = require('gulp');
const settings = require('./extra/build-settings');
const transform = require('gulp-transform');
const rename = require('gulp-rename');
const razor = require('razor-code-js');

gulp.task('run-razor', function () {
    return gulp.src(settings.srcDir + '/**/*.rzr')
        .pipe(transform('utf8', razorToTs))
        .pipe(rename({ extname: '.ts' }))
        .pipe(gulp.dest(settings.srcDir));
});

function razorToTs(content) {
    return razor.generate(content);
}