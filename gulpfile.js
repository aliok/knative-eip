const handlebars = require('gulp-handlebars');
const gulp = require('gulp');
const { series } = require('gulp');

gulp.task('templates', function(){
    // return gulp.src('main/modules/**/*.{adoc,yaml}')
    //     .pipe(handlebars())
    //     .pipe(wrap('Handlebars.template(<%= contents %>)'))
    //     .pipe(declare({
    //         namespace: 'MyApp.templates',
    //         noRedeclare: true, // Avoid duplicate declarations
    //     }))
    //     .pipe(gulp.dest('build/js/'));

    var replace = require('gulp-replace');

    return gulp.src('main/modules/**/*.{adoc,yaml}')
        .pipe(replace('{{namespace}}', 'foo'))
        .pipe(gulp.dest('build/'));


});

function copyAll(){
    return series(
        function(){
            return gulp.src('main/**/*.*')
                .pipe(gulp.dest('build/main/'))
        },
        function(){
            return gulp.src('*.yaml')
                .pipe(gulp.dest('build/'))
        }
    );
}

exports.copyAll = copyAll;

function loadVariables(cb){
    cb();
}

function executeImageBuilds(cb) {
    cb();
}

function replaceHandleBarsTemplates(cb) {
    cb();
}

function buildWebsite(cb) {
    cb();
}

exports.build = series(executeImageBuilds, replaceHandleBarsTemplates, buildWebsite);

var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');

gulp.task('templates', function(){
    // return gulp.src('main/modules/**/*.{adoc,yaml}')
    //     .pipe(handlebars())
    //     .pipe(wrap('Handlebars.template(<%= contents %>)'))
    //     .pipe(declare({
    //         namespace: 'MyApp.templates',
    //         noRedeclare: true, // Avoid duplicate declarations
    //     }))
    //     .pipe(gulp.dest('build/js/'));

    var replace = require('gulp-replace');

    return gulp.src('main/modules/**/*.{adoc,yaml}')
        .pipe(replace('{{namespace}}', 'foo'))
        .pipe(gulp.dest('build/'));


});
