"use strict";

var gulp = require("gulp"),
    less = require("gulp-less"),
    autoprefixer = require("gulp-autoprefixer"),
    combineMq = require("gulp-combine-mq"),
    csscomb = require("gulp-csscomb"),
    csso = require("gulp-csso"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    prettify = require("gulp-prettify"),
    htmlmin = require("gulp-htmlmin"),
    fileInclude = require("gulp-file-include"),
    imagemin = require("gulp-imagemin"),
    spritesmith = require("gulp.spritesmith"),
    plumber = require("gulp-plumber"),
    rename = require("gulp-rename"),
    livereload = require("gulp-livereload"),
    del = require("del"),
    gulpSequence = require("gulp-sequence"),
    merge = require("merge-stream");

// Создание разметки
gulp.task("markup", function() {
  return gulp.src(["source/*.html", "!source/_components-lib.html"])
  // return gulp.src(["source/html/*.html", "!source/html/_components-lib.html"])
    .pipe(plumber())
    // Cборка
    // .pipe(fileInclude({
    //   prefix: "@@",
    //   basepath: "@file",
    //   indent: true,
    // }))
    // Форматирование
    // .pipe(prettify({
    //   indent_char: " ",
    //   indent_size: 2,
    //   preserve_newlines: true
    // }))
    .pipe(gulp.dest("build"))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("build"))
    .pipe(livereload());
});

// Создание стилей
gulp.task("style", function() {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer({browsers: ["last 2 versions", "ie 10"]}))
    .pipe(combineMq({beautify: true}))
    .pipe(csscomb())
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("build/css"))
    .pipe(livereload());
});

// Склеивание своих скриптов
gulp.task("script", function() {
  return gulp.src("source/js/*.js")
    .pipe(plumber())
    .pipe(concat("all.js"))
    .pipe(rename("script.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(uglify())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("build/js"))
    .pipe(livereload());
});

// Склеивание вендорных скриптов
gulp.task("vendor", function() {
  return gulp.src("source/js/vendor/*.js")
    .pipe(plumber())
    .pipe(concat("all.js"))
    // .pipe(uglify())
    .pipe(rename("vendor.min.js"))
    .pipe(gulp.dest("build/js"));
});

// Перенос шрифтов из папки source/ в папку build/
gulp.task("fonts", function() {
  return gulp.src("source/font/*")
    .pipe(gulp.dest("build/font"));
});

// Сжатие изображений
gulp.task("images", function() {
  return gulp.src("source/img/*.{png,jpg,gif,svg,ico}")
    .pipe(imagemin())
    .pipe(gulp.dest("build/img"));
});

// СБорка спрайта
gulp.task("sprite", function () {
  var spriteData = gulp.src("source/img/sprite/*.png").pipe(spritesmith({
    imgName: "sprite.png",
    imgPath: "../img/sprite.png",
    cssName: "sprite.less",
    padding: 5,
    algorithm: "binary-tree"
  }));

  var imgStream = spriteData.img
    .pipe(gulp.dest("source/img/"));

  var cssStream = spriteData.css
    .pipe(gulp.dest("source/less"));

  return merge(imgStream, cssStream);
});

// Удаление папки build/
gulp.task("clean", function() {
  return del(["build"]);
});

// Сборка проекта
gulp.task("build", function(callback) {
  gulpSequence("clean", ["markup", "style", "script", "vendor", "fonts"/*, "sprite"*/], "images", callback);
});

// Отслеживание изменений в файлах
gulp.task("watch", ["markup", "style", "script"], function() {
  livereload.listen();
  gulp.watch("source/*.html", ["markup"]);
  // gulp.watch("source/html/**/*.html", ["markup"]);
  gulp.watch("source/less/**/*.less", ["style"]);
  gulp.watch("source/js/**/*.js", ["script", "vendor"]);
});

// Сборка проекта + отслеживание изменений
gulp.task("default", function(callback) {
  gulpSequence(["markup", "style", "script", "vendor", "fonts"/*, "images"*/], "watch", callback);
});
