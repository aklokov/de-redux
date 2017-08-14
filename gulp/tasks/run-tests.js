const gulp = require('gulp');
const settings = require('./extra/build-settings');
const mocha = require('gulp-mocha');

const testSrc = settings.testRunDir + '/**/*.js';
const mochaSetting = { reporter: 'spec' };

gulp.task('run-tests', function () {
  return gulp.src(testSrc)
    .pipe(mocha(mochaSetting));
});
