var gulp = require('gulp'),
		gulpSass = require('gulp-sass');

gulp.task('watch',function(){
	gulp.watch('scss/**/*.scss', ['styles']);


});

gulp.task('styles',function(){
	gulp.src('scss/**/*.scss')
			.pipe(gulpSass())
			.pipe(gulp.dest('css'));

});

