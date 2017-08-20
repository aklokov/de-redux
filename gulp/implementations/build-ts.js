const gulp = require('gulp');
const ts = require('gulp-tsc');
const settings = require('../settings');
const tsconfig = require('../../tsconfig');

gulp.task('build-ts', function () {
    const options = Object.assign({}, tsconfig.compilerOptions);
    return gulp.src(settings.projectTsFiles)
        .pipe(ts(options))
        .pipe(gulp.dest(settings.buildPath));
});
