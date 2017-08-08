const gulp = require('gulp');

gulp.task('test', function(){
    return gulp.series(['build', 'run-tests']);
});
