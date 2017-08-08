const gulp = require('gulp');
const settings = require('./extra/build-settings');
const removeDirRecursive = require('./extra/removeDirRecursive');

gulp.task('clean-output', function(){
    removeDirRecursive(settings.buildDir);
});