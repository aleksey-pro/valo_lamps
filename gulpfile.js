var gulp = require('gulp'),
	browserSync  = require('browser-sync'),
	imagemin = require('gulp-imagemin'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps');
	
var config = {
	server: {
		baseDir: 'prod'
	},
	tunnel: false,  //-------------set to true!!!
	host: 'localhost',
	port: 3000,
	logPrefix: "DaveGhan prod.",
	browser: "chrome"
};	

gulp.task ('browserSync', function(){
	browserSync(config)
});

gulp.task('images', function() {
	return gulp.src('dev/img/**/*')
	.pipe(imagemin())
	.pipe(gulp.dest('prod/img'))
	.pipe(browserSync.reload({
	 stream: true
    }))
});

gulp.task('HTML', function() {
  return gulp.src('dev/**/*.html')
	.on('error', console.log)
  .pipe(gulp.dest('prod'))
	.pipe(browserSync.reload({
	 stream: true
    }))	
});

gulp.task('styles', function () {
  return gulp.src('dev/**/*.css')
	.on('error', console.log)
	.pipe(sourcemaps.init())
	.pipe(autoprefixer({ browsers: ['>1%'] }))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('prod'))
	.pipe(browserSync.reload({stream: true}))
});
	
gulp.task ('watch', function(){
	gulp.watch('dev/**/*.html', ['HTML']);
	gulp.watch('dev/img/*', ['images']);
	gulp.watch('dev/**/*.css', ['styles']);
});

gulp.task ('default', ['HTML', 'styles', 'browserSync', 'watch']);