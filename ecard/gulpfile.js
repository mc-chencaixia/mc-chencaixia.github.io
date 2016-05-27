// gulp
var gulp = require('gulp'),
// plugins
	  connect = require('gulp-connect'),
	  uglify = require('gulp-uglify'),
	  minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    watch = require('gulp-watch');

var paths = {
    scripts: ['js/*.js'],
    images: ['img/*'], 
};

// tasks
gulp.task('connect', function () {
  	connect.server({
    	 root: '',
    	 port: 8881
  	});
});

gulp.task('connectDist', function () {
  	connect.server({
    	 root: 'dist/',
    	 port: 9991
  	});
});

gulp.task('minifyjs', function() {
	return gulp.src('js/*.js')
		.pipe(concat('index.js'))    //合并所有js到index.js
		.pipe(uglify({				
			'mangle':true,					
		}))    //压缩
		.pipe(gulp.dest('build/'));  //输出
});

gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 1}))
    .pipe(gulp.dest('build/'));
});
 
// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['minifyjs']);
  //gulp.watch(paths.images, ['images']);
});
 
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['minifyjs', 'watch']);


