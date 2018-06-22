var gulp          = require('gulp'),
    apidoc        = require('gulp-apidoc'),
    mocha         = require('gulp-mocha'),
    uglify        = require('gulp-uglify'),
    concat        = require('gulp-concat'),
    install       = require('gulp-install'),
    exec          = require('child_process').exec,
    annotate      = require('gulp-ng-annotate'),
    flatten       = require('gulp-flatten'),
    inject        = require('gulp-inject'),
    plumber       = require('gulp-plumber'),
    runSequence   = require('run-sequence'),
    less          = require('gulp-less'),
    fs            = require('fs'),
    bower         = require('gulp-bower'),
    es            = require('event-stream'),
    minifyCss     = require('gulp-minify-css'),
    path          = require('path'),
    child_process = require('child_process');

var root = "";

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task("test", function () {
  return gulp.src('./services/*/test/*.js', {
      read: false
    })
    .pipe(mocha({
      reporter: "spec"
    }).on("error", handleError))
    .once('end', function () {
      process.exit();
    });
});

gulp.task('apidoc', function () {
  apidoc.exec({
    src: "./services/",
    dest: "doc/",
    includeFilters: ["apiconst.js", "router.js", "history.js"]
  });
});

gulp.task('install', function (cb) {
  gulp.src(['./package.json', './public/package.json'])
    .pipe(install(cb));

});

gulp.task('watch', ['build_js', 'build_html', 'build_less', 'build_assets'], function () {
  gulp.watch('./public/app/**/*.js', ['build_js']);
  gulp.watch('./public/less/**/*.less', ['build_less']);
  gulp.watch('./public/app/**/*.html', ['build_html']);
});

gulp.task('build', function (cb) {
  exec('ng build --watch', {cwd : './public/'},function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(stderr)
  });
});

gulp.task('deploy', function () {
  return runSequence('apidoc', 'install', 'build');
});