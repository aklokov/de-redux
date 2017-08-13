const gulp = require('gulp');
const ts = require('gulp-tsc');
const settings = require('./extra/buildSettings');
const mocha = require('gulp-mocha');
const testSrc = settings.testRunDir + '/**/*.js';
const mochaSetting = { reporter: 'spec' };

gulp.task('tests', ['full-build'], function (done) {
    return gulp.src(testSrc)
        .pipe(mocha(mochaSetting));
});
