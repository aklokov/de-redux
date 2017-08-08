const gulp = require('gulp');

gulp.task('build', function(){
    return gulp.series(['clean-output', 'build-ts', 'tslint']);
})