const gulp = require('gulp');
const settings = require('./extra/buildSettings');
const tslint = require('gulp-tslint');
const src = settings.srcDir + '/**/*.ts';
const tests = settings.testSrcDir + '/**/*.ts';

gulp.task('tslint', ['build'], function (done) {
    return gulp.src([tests, src])
        .pipe(tslint({ formatter: "verbose" }))
        .pipe(tslint.report({ emitError: process.env.emitError }));
});