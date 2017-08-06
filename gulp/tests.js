const gulp = require('gulp');
const ts = require('gulp-tsc');
const settings = require('./extra/buildSettings');
const cover = require('gulp-coverage');
const mocha = require('gulp-mocha');
const notifier = require('node-notifier');
const testSrc = settings.testRunDir + '/**/*.js';
const mochaSetting = { reporter: 'spec' };

gulp.task('tests', ['full-build'], function (done) {
        if (settings.coverage) {
        return gulp.src(testSrc)
            .pipe(cover.instrument({ pattern: [settings.buildSrcDir + '/**/*.js'] }))
            .pipe(mocha(mochaSetting))
            .pipe(cover.gather())
            .pipe(cover.format(['html', 'lcov']))
            .pipe(gulp.dest(settings.reportDir));
    }

    return gulp.src(testSrc)
        .pipe(mocha(mochaSetting));
});
