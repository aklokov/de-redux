const gulp = require('gulp');
const ts = require('gulp-tsc');
const settings = require('./extra/build-settings');
const tsconfig = require('../../tsconfig');
const allTs = '/**/*.ts';

gulp.task('build-ts', function () {
    const options = Object.assign({}, tsconfig.compilerOptions);
    const sources = [settings.srcDir + allTs, settings.testSrcDir + allTs];
    return gulp.src(sources)
        .pipe(ts(options))
        .pipe(gulp.dest(settings.buildDir));
});
