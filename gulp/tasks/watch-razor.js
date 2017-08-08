const gulp = require('gulp');
const watch = require('gulp-watch');
const settings = require('./extra/build-settings');

gulp.task('watch-razor', function(){
    gulp.start('run-razor');
    return gulp.watch(settings.srcDir + '/**/*.rzr', function(){
        gulp.start('run-razor');
    });
});