const gulp = require('gulp');
const settings = require('./extra/buildSettings');
const removeDirRecursive = require('./extra/removeDirRecursive');

gulp.task('cleanup', function(){
    removeDirRecursive(settings.buildDir);
});