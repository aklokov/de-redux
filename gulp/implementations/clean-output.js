const gulp = require('gulp');
const settings = require('../settings');
const removeDirRecursive = require('./extra/removeDirRecursive');

gulp.task('clean-output', function(){
    removeDirRecursive(settings.buildPath);
});