const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');

const srcScss = '_assets/scss/**/*.+(scss|sass)';
const outScss = '_assets/css'

gulp.task('sass', () => {
    return gulp.src(srcScss)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(gulp.dest(outScss));
});

gulp.task('watch', ['sass'], () => {
    gulp.watch(srcScss, ['sass']);
});