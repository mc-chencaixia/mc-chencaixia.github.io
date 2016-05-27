// gulp
var gulp = require('gulp'),
// plugins
	connect = require('gulp-connect'),
	uglify = require('gulp-uglify'),
	minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del');


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
			'mangle':false,					
			'banner':'ccx minifyjs start',
			'footer':'ccx miinifyjs end',				
		}))    //压缩
		.pipe(gulp.dest('build/'));  //输出
});



// default task
gulp.task('default',
  	['connect']
);