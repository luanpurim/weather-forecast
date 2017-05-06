var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
       server: {
            baseDir: "./app"
        }
    });
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("./*/*/*/*.js").on('change', browserSync.reload);
    gulp.watch("app/*/*/*.html").on('change', browserSync.reload);
});
