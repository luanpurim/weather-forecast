var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');

gulp.task('browser-sync', function() {
    browserSync.init({
       server: {
            baseDir: "./app"
        }
    });
});

gulp.task('watch', ['templateConcat','browser-sync'], function () {
    gulp.watch("app/*/*/*.html", ['templateConcat']);
    gulp.watch("./*/*/*/*.js").on('change', browserSync.reload);
    gulp.watch("app/*/*/*.html").on('change', browserSync.reload);
});

gulp.task('templateConcat', function () {
  return gulp.src('app/components/*/*.html')
    .pipe(templateCache({module: 'app'}))
    .pipe(gulp.dest('./app/'));
});
