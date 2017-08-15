const gulp = require('gulp');
const watch = require('gulp-watch');
const settings = require('./extra/build-settings');

gulp.task('run-razor.watch', function(){
    gulp.start('run-razor');
	const razor = './node_modules/razor-code-js/out/**/*.*';
    return watch([settings.srcDir + '/**/*.rzr', razor], function(){
        gulp.start('run-razor');
    });
});