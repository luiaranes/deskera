
/*** Import packages
**********************************************/
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync').create();
var changed      = require('gulp-changed');
var concat       = require('gulp-concat');
var flatten      = require('gulp-flatten');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var imagemin     = require('gulp-imagemin');
var jshint       = require('gulp-jshint');
var lazypipe     = require('lazypipe');
var less         = require('gulp-less');
var merge        = require('merge-stream');
var cssnano      = require('gulp-cssnano');
var plumber      = require('gulp-plumber');
var rev          = require('gulp-rev');
var revDel       = require('rev-del');
var collect      = require('gulp-rev-collector');
var runSequence  = require('run-sequence');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var uglify       = require('gulp-uglify');
var del          = require('del');
var rename       = require("gulp-rename");
var minify       = require('gulp-minify');
var file         = require('gulp-file');



/*** URL
**********************************************/
var url = {
    "local": "http://lui-test.lndo.site",
    "staging": "assets/images/",
    "production": "assets/fonts/"
};


/*** Source location
**********************************************/
var source = {
    "src": "assets/",
    "images": "assets/images/",
    "fonts": "assets/fonts/",
    "styles": "assets/styles/",
    "scripts": {
        "src": "assets/js/",
        "app": "assets/js/app.js",
        "jquery": "assets/js/jquery-3.2.1.js",
        "uikit": "assets/uikit/dist/js/uikit.js",
        "uikiticons": "assets/uikit/dist/js/uikit-icons.js"
    }
};



/*** Distributive location
**********************************************/
var dist = {
        "src": "dist/",
        "fonts": "dist/fonts/",
        "images": "dist/images/",
        "styles": "dist/css/",
        "scripts": "dist/js/"
};



/*** Clean destination folder of all the files
**********************************************/
gulp.task('clean', function () {
    del([dist.styles + '*', dist.scripts + '*', dist.fonts + '*', dist.images + '*', 'manifest.json'])
});



/*** Process SASS files and generate CSS
**********************************************/
gulp.task('css', function () {
    gulp.src(source.styles + 'app.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('app.css'))
        .pipe(cssnano({
            discardComments: {removeAll: true}
        }))
        .pipe(rename('app.min.css'))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(dist.styles))
});


/*** Process Fonts
**********************************************/
gulp.task('fonts', function () {
    gulp.src(source.fonts + '*')
        .pipe(plumber())
        .pipe(gulp.dest(dist.fonts))
});



/*** Process Images
**********************************************/
gulp.task('images', function () {
    gulp.src(source.images + '*')
        .pipe(plumber())
        .pipe(imagemin([
          imagemin.jpegtran({progressive: true}),
          imagemin.gifsicle({interlaced: true}),
          imagemin.svgo({plugins: [{removeUnknownsAndDefaults: false}, {cleanupIDs: false}]})
        ]))
        .pipe(gulp.dest(dist.images))
});



/*** Process Vendor JavaScript
**********************************************/
gulp.task('vendor', function () {
    gulp.src(source.scripts.jquery)
        .pipe(plumber())
        .pipe(minify({
            ext: {
                min:'.min.js'
            },
            noSource: 'true'
        }))
        .pipe(gulp.dest(dist.scripts))
});


/*** Process App JavaScript
**********************************************/
gulp.task('js', function () {
    gulp.src([
        source.scripts.uikit,
        source.scripts.uikiticons,
        source.scripts.app
    ])
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('app.js'))
        .pipe(minify({
            ext: {
                min:'.min.js'
            },
            noSource: 'true'
        }))
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest(dist.scripts))
});


/*** Watch and Process
**********************************************/
gulp.task('watch', function() {
    gulp.watch(source.scripts.src + "**", ['js']);
    gulp.watch(source.styles + "**", ['css']);
});


/*** Process And Complete Build
**********************************************/
gulp.task('default', function() {
    runSequence(
        'clean',
        ['vendor', 'fonts', 'images'],
        ['css', 'js']
    )
});


/*** Process And Complete Build
**********************************************/
gulp.task('build', function() {
    runSequence(
        'clean',
        ['vendor', 'fonts', 'images'],
        ['css', 'js']
    )
});


/*** Process a released version of css file
**********************************************/
gulp.task('release:css', function() {
  gulp.src([dist.styles+'/*.min.css'])
  .pipe(rev())
  .pipe(gulp.dest(dist.styles))
  .pipe(rev.manifest({ path: 'manifest.json', merge: true}))
  .pipe(revDel({ dest: dist.styles }))
  .pipe(gulp.dest('.'))
});


/*** Process a released version of js files
**********************************************/
gulp.task('release:js', function() {
  gulp.src([dist.scripts+'/*.min.js'])
  .pipe(rev())
  .pipe(gulp.dest(dist.scripts))
  .pipe(rev.manifest({ path: 'manifest.json', merge: true}))
  .pipe(revDel({ dest: dist.scripts }))
  .pipe(gulp.dest('.'))
});

/*** Clean manifest.json
**********************************************/
gulp.task('clean-cachebust', function() {   
    return gulp.src('manifest.json')
      .pipe(file('manifest.json',''))
      .pipe(gulp.dest('.'));
});

/*** Process a released version of css and js files
**********************************************/
gulp.task('release', ['clean-cachebust'], function() {
    runSequence(
        'release:css', 'release:js'
    )
});

/*gulp.task('release', ['release:assets'], () =>
   gulp.src(['manifest.json','templates/**'])
   .pipe(collect())
   .pipe(gulp.dest('templates'))
);*/
